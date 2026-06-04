# Person entity test

require "minitest/autorun"
require "json"
require_relative "../FakeJson_sdk"
require_relative "runner"

class PersonEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FakeJsonSDK.test(nil, nil)
    ent = testsdk.Person(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = person_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "person." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FAKEJSON_TEST_PERSON_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    person_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.person")))
    person_ref01_data = nil
    if person_ref01_data_raw.length > 0
      person_ref01_data = Helpers.to_map(person_ref01_data_raw[0][1])
    end

    # LIST
    person_ref01_ent = client.Person(nil)
    person_ref01_match = {}

    person_ref01_list_result, err = person_ref01_ent.list(person_ref01_match, nil)
    assert_nil err
    assert person_ref01_list_result.is_a?(Array)

  end
end

def person_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "person", "PersonTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FakeJsonSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["person01", "person02", "person03"],
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
  entid_env_raw = ENV["FAKEJSON_TEST_PERSON_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FAKEJSON_TEST_PERSON_ENTID" => idmap,
    "FAKEJSON_TEST_LIVE" => "FALSE",
    "FAKEJSON_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FAKEJSON_TEST_PERSON_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FAKEJSON_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = FakeJsonSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FAKEJSON_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FAKEJSON_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
