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
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FAKEJSON_TEST_BOOK_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $book_ref01_ent = $client->Book(null);
        $book_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.book"), "book_ref01"));

        [$book_ref01_data_result, $err] = $book_ref01_ent->create($book_ref01_data, null);
        $this->assertNull($err);
        $book_ref01_data = Helpers::to_map($book_ref01_data_result);
        $this->assertNotNull($book_ref01_data);
        $this->assertNotNull($book_ref01_data["id"]);

        // LIST
        $book_ref01_match = [];

        [$book_ref01_list_result, $err] = $book_ref01_ent->list($book_ref01_match, null);
        $this->assertNull($err);
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

        [$book_ref01_resdata_up0_result, $err] = $book_ref01_ent->update($book_ref01_data_up0_up, null);
        $this->assertNull($err);
        $book_ref01_resdata_up0 = Helpers::to_map($book_ref01_resdata_up0_result);
        $this->assertNotNull($book_ref01_resdata_up0);
        $this->assertEquals($book_ref01_resdata_up0["id"], $book_ref01_data_up0_up["id"]);
        $this->assertEquals($book_ref01_resdata_up0[$book_ref01_markdef_up0_name], $book_ref01_markdef_up0_value);

        // LOAD
        $book_ref01_match_dt0 = [
            "id" => $book_ref01_data["id"],
        ];
        [$book_ref01_data_dt0_loaded, $err] = $book_ref01_ent->load($book_ref01_match_dt0, null);
        $this->assertNull($err);
        $book_ref01_data_dt0_load_result = Helpers::to_map($book_ref01_data_dt0_loaded);
        $this->assertNotNull($book_ref01_data_dt0_load_result);
        $this->assertEquals($book_ref01_data_dt0_load_result["id"], $book_ref01_data["id"]);

        // REMOVE
        $book_ref01_match_rm0 = [
            "id" => $book_ref01_data["id"],
        ];
        [$_, $err] = $book_ref01_ent->remove($book_ref01_match_rm0, null);
        $this->assertNull($err);

        // LIST
        $book_ref01_match_rt0 = [];

        [$book_ref01_list_rt0_result, $err] = $book_ref01_ent->list($book_ref01_match_rt0, null);
        $this->assertNull($err);
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
    $entid_env_raw = getenv("FAKEJSON_TEST_BOOK_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FAKEJSON_TEST_BOOK_ENTID" => $idmap,
        "FAKEJSON_TEST_LIVE" => "FALSE",
        "FAKEJSON_TEST_EXPLAIN" => "FALSE",
        "FAKEJSON_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FAKEJSON_TEST_BOOK_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FAKEJSON_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["FAKEJSON_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new FakeJsonSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FAKEJSON_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FAKEJSON_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
