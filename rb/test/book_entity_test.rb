# Book entity test

require "minitest/autorun"
require "json"
require_relative "../FakeJson_sdk"
require_relative "runner"

class BookEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FakeJsonSDK.test(nil, nil)
    ent = testsdk.Book(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "book" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = FakeJsonSDK.test(seed, nil)
    seen = base.Book(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = FakeJsonConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = FakeJsonSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Book(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = book_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "book." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FAKE_JSON_TEST_BOOK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    book_ref01_ent = client.Book(nil)
    book_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.book"), "book_ref01"))

    book_ref01_data_result = book_ref01_ent.create(book_ref01_data, nil)
    book_ref01_data = Helpers.to_map(book_ref01_data_result.respond_to?(:data_get) ? book_ref01_data_result.data_get : book_ref01_data_result)
    assert !book_ref01_data.nil?
    assert !book_ref01_data["id"].nil?

    # LIST
    book_ref01_match = {}

    book_ref01_list_result = book_ref01_ent.list(book_ref01_match, nil)
    assert book_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(book_ref01_list_result),
      { "id" => book_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    book_ref01_data_up0_up = {
      "id" => book_ref01_data["id"],
    }

    book_ref01_markdef_up0_name = "author"
    book_ref01_markdef_up0_value = "Mark01-book_ref01_#{setup[:now]}"
    book_ref01_data_up0_up[book_ref01_markdef_up0_name] = book_ref01_markdef_up0_value

    book_ref01_resdata_up0_result = book_ref01_ent.update(book_ref01_data_up0_up, nil)
    book_ref01_resdata_up0 = Helpers.to_map(book_ref01_resdata_up0_result.respond_to?(:data_get) ? book_ref01_resdata_up0_result.data_get : book_ref01_resdata_up0_result)
    assert !book_ref01_resdata_up0.nil?
    assert_equal book_ref01_resdata_up0["id"], book_ref01_data_up0_up["id"]
    assert_equal book_ref01_resdata_up0[book_ref01_markdef_up0_name], book_ref01_markdef_up0_value

    # LOAD
    book_ref01_match_dt0 = {
      "id" => book_ref01_data["id"],
    }
    book_ref01_data_dt0_loaded = book_ref01_ent.load(book_ref01_match_dt0, nil)
    book_ref01_data_dt0_load_result = Helpers.to_map(book_ref01_data_dt0_loaded.respond_to?(:data_get) ? book_ref01_data_dt0_loaded.data_get : book_ref01_data_dt0_loaded)
    assert !book_ref01_data_dt0_load_result.nil?
    assert_equal book_ref01_data_dt0_load_result["id"], book_ref01_data["id"]

    # REMOVE
    book_ref01_match_rm0 = {
      "id" => book_ref01_data["id"],
    }
    book_ref01_ent.remove(book_ref01_match_rm0, nil)

    # LIST
    book_ref01_match_rt0 = {}

    book_ref01_list_rt0_result = book_ref01_ent.list(book_ref01_match_rt0, nil)
    assert book_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(book_ref01_list_rt0_result),
      { "id" => book_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def book_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "book", "BookTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FakeJsonSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["book01", "book02", "book03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FAKE_JSON_TEST_BOOK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FAKE_JSON_TEST_BOOK_ENTID" => idmap,
    "FAKE_JSON_TEST_LIVE" => "FALSE",
    "FAKE_JSON_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FAKE_JSON_TEST_BOOK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FAKE_JSON_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = FakeJsonSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FAKE_JSON_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FAKE_JSON_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
