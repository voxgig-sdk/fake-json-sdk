<?php
declare(strict_types=1);

// Book entity test

require_once __DIR__ . '/../fakejson_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BookEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = FakeJsonSDK::test(null, null);
        $ent = $testsdk->Book(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "book" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = FakeJsonSDK::test($seed, null);
        $seen = iterator_to_array($base->Book(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = FakeJsonConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = FakeJsonSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Book(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = book_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "book." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FAKE_JSON_TEST_BOOK_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $book_ref01_ent = $client->Book(null);
        $book_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.book"), "book_ref01"));

        $book_ref01_data_result = $book_ref01_ent->create($book_ref01_data, null);
        $book_ref01_data = Helpers::to_map(is_object($book_ref01_data_result) && method_exists($book_ref01_data_result, 'data_get') ? $book_ref01_data_result->data_get() : $book_ref01_data_result);
        $this->assertNotNull($book_ref01_data);
        $this->assertNotNull($book_ref01_data["id"]);

        // LIST
        $book_ref01_match = [];

        $book_ref01_list_result = $book_ref01_ent->list($book_ref01_match, null);
        $this->assertIsArray($book_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($book_ref01_list_result),
            ["id" => $book_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $book_ref01_data_up0_up = [
            "id" => $book_ref01_data["id"],
        ];

        $book_ref01_markdef_up0_name = "author";
        $book_ref01_markdef_up0_value = "Mark01-book_ref01_" . $setup["now"];
        $book_ref01_data_up0_up[$book_ref01_markdef_up0_name] = $book_ref01_markdef_up0_value;

        $book_ref01_resdata_up0_result = $book_ref01_ent->update($book_ref01_data_up0_up, null);
        $book_ref01_resdata_up0 = Helpers::to_map(is_object($book_ref01_resdata_up0_result) && method_exists($book_ref01_resdata_up0_result, 'data_get') ? $book_ref01_resdata_up0_result->data_get() : $book_ref01_resdata_up0_result);
        $this->assertNotNull($book_ref01_resdata_up0);
        $this->assertEquals($book_ref01_resdata_up0["id"], $book_ref01_data_up0_up["id"]);
        $this->assertEquals($book_ref01_resdata_up0[$book_ref01_markdef_up0_name], $book_ref01_markdef_up0_value);

        // LOAD
        $book_ref01_match_dt0 = [
            "id" => $book_ref01_data["id"],
        ];
        $book_ref01_data_dt0_loaded = $book_ref01_ent->load($book_ref01_match_dt0, null);
        $book_ref01_data_dt0_load_result = Helpers::to_map(is_object($book_ref01_data_dt0_loaded) && method_exists($book_ref01_data_dt0_loaded, 'data_get') ? $book_ref01_data_dt0_loaded->data_get() : $book_ref01_data_dt0_loaded);
        $this->assertNotNull($book_ref01_data_dt0_load_result);
        $this->assertEquals($book_ref01_data_dt0_load_result["id"], $book_ref01_data["id"]);

        // REMOVE
        $book_ref01_match_rm0 = [
            "id" => $book_ref01_data["id"],
        ];
        $book_ref01_ent->remove($book_ref01_match_rm0, null);

        // LIST
        $book_ref01_match_rt0 = [];

        $book_ref01_list_rt0_result = $book_ref01_ent->list($book_ref01_match_rt0, null);
        $this->assertIsArray($book_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($book_ref01_list_rt0_result),
            ["id" => $book_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function book_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/book/BookTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = FakeJsonSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["book01", "book02", "book03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("FAKE_JSON_TEST_BOOK_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FAKE_JSON_TEST_BOOK_ENTID" => $idmap,
        "FAKE_JSON_TEST_LIVE" => "FALSE",
        "FAKE_JSON_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FAKE_JSON_TEST_BOOK_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FAKE_JSON_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new FakeJsonSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FAKE_JSON_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FAKE_JSON_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
