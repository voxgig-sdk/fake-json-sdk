# Book entity test

import json
import os
import time

import pytest

from fakejson_sdk.utility.voxgig_struct import voxgig_struct as vs
from fakejson_sdk import FakeJsonSDK
from fakejson_sdk.core import helpers
from fakejson_sdk.config import shared_config
from fakejson_sdk.feature.base_feature import FakeJsonBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(FakeJsonBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("book hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBookEntity:

    def test_should_create_instance(self):
        testsdk = FakeJsonSDK.test(None, None)
        ent = testsdk.Book(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "book": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = FakeJsonSDK.test(seed, None)
        seen = list(base.Book(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from fakejson_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = FakeJsonSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Book(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(FakeJsonSDK.test(offline, None).Book(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(FakeJsonSDK.test(offline, None).Book(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = FakeJsonSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.Book(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(FakeJsonSDK.test(None, None).Book(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = FakeJsonSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.Book(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.Book(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = FakeJsonSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Book(None).list({"limit": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _book_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "book." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        book_ref01_ent = client.Book(None)
        book_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.book"), "book_ref01"))

        book_ref01_data = helpers.to_map(runner.entity_data(book_ref01_ent.create(book_ref01_data, None)))
        assert book_ref01_data is not None
        assert book_ref01_data["id"] is not None

        # LIST
        book_ref01_match = {}

        book_ref01_list_result = book_ref01_ent.list(book_ref01_match, None)
        assert isinstance(book_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(book_ref01_list_result),
            {"id": book_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        book_ref01_data_up0_up = {
            "id": book_ref01_data["id"],
        }

        book_ref01_markdef_up0_name = "author"
        book_ref01_markdef_up0_value = "Mark01-book_ref01_" + str(setup["now"])
        book_ref01_data_up0_up[book_ref01_markdef_up0_name] = book_ref01_markdef_up0_value

        book_ref01_resdata_up0 = helpers.to_map(runner.entity_data(book_ref01_ent.update(book_ref01_data_up0_up, None)))
        assert book_ref01_resdata_up0 is not None
        assert book_ref01_resdata_up0["id"] == book_ref01_data_up0_up["id"]
        assert book_ref01_resdata_up0[book_ref01_markdef_up0_name] == book_ref01_markdef_up0_value

        # LOAD
        book_ref01_match_dt0 = {
            "id": book_ref01_data["id"],
        }
        book_ref01_data_dt0_loaded = book_ref01_ent.load(book_ref01_match_dt0, None)
        book_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(book_ref01_data_dt0_loaded))
        assert book_ref01_data_dt0_load_result is not None
        assert book_ref01_data_dt0_load_result["id"] == book_ref01_data["id"]

        # REMOVE
        book_ref01_match_rm0 = {
            "id": book_ref01_data["id"],
        }
        book_ref01_ent.remove(book_ref01_match_rm0, None)

        # LIST
        book_ref01_match_rt0 = {}

        book_ref01_list_rt0_result = book_ref01_ent.list(book_ref01_match_rt0, None)
        assert isinstance(book_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(book_ref01_list_rt0_result),
            {"id": book_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _book_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/book/BookTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FakeJsonSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["book01", "book02", "book03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "FAKE_JSON_TEST_BOOK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FAKE_JSON_TEST_BOOK_ENTID": idmap,
        "FAKE_JSON_TEST_LIVE": "FALSE",
        "FAKE_JSON_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("FAKE_JSON_TEST_BOOK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FAKE_JSON_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = FakeJsonSDK(helpers.to_map(merged_opts))

    _live = env.get("FAKE_JSON_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FAKE_JSON_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
