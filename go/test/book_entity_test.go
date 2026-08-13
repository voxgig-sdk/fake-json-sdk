package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/fake-json-sdk/go"
	"github.com/voxgig-sdk/fake-json-sdk/go/core"

	vs "github.com/voxgig-sdk/fake-json-sdk/go/utility/struct"
)

func TestBookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Book(nil)
		if ent == nil {
			t.Fatal("expected non-nil BookEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"book": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Book(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Book(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "book." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FAKE_JSON_TEST_BOOK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		bookRef01Ent := client.Book(nil)
		bookRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "book"}, setup.data), "book_ref01"))

		bookRef01DataResult, err := bookRef01Ent.Create(bookRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		bookRef01Data = core.ToMapAny(entityData(bookRef01DataResult))
		if bookRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if bookRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		bookRef01Match := map[string]any{}

		bookRef01ListResult, err := bookRef01Ent.List(bookRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		bookRef01List, bookRef01ListOk := bookRef01ListResult.([]any)
		if !bookRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bookRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(bookRef01List), map[string]any{"id": bookRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		bookRef01DataUp0Up := map[string]any{
			"id": bookRef01Data["id"],
		}

		bookRef01MarkdefUp0Name := "author"
		bookRef01MarkdefUp0Value := fmt.Sprintf("Mark01-book_ref01_%d", setup.now)
		bookRef01DataUp0Up[bookRef01MarkdefUp0Name] = bookRef01MarkdefUp0Value

		bookRef01ResdataUp0Result, err := bookRef01Ent.Update(bookRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		bookRef01ResdataUp0 := core.ToMapAny(entityData(bookRef01ResdataUp0Result))
		if bookRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if bookRef01ResdataUp0["id"] != bookRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if bookRef01ResdataUp0[bookRef01MarkdefUp0Name] != bookRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", bookRef01MarkdefUp0Name, bookRef01ResdataUp0[bookRef01MarkdefUp0Name])
		}

		// LOAD
		bookRef01MatchDt0 := map[string]any{
			"id": bookRef01Data["id"],
		}
		bookRef01DataDt0Loaded, err := bookRef01Ent.Load(bookRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bookRef01DataDt0LoadResult := core.ToMapAny(entityData(bookRef01DataDt0Loaded))
		if bookRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if bookRef01DataDt0LoadResult["id"] != bookRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		bookRef01MatchRm0 := map[string]any{
			"id": bookRef01Data["id"],
		}
		_, err = bookRef01Ent.Remove(bookRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		bookRef01MatchRt0 := map[string]any{}

		bookRef01ListRt0Result, err := bookRef01Ent.List(bookRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		bookRef01ListRt0, bookRef01ListRt0Ok := bookRef01ListRt0Result.([]any)
		if !bookRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", bookRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(bookRef01ListRt0), map[string]any{"id": bookRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func bookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "book", "BookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read book test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse book test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"book01", "book02", "book03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FAKE_JSON_TEST_BOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FAKE_JSON_TEST_BOOK_ENTID": idmap,
		"FAKE_JSON_TEST_LIVE":      "FALSE",
		"FAKE_JSON_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FAKE_JSON_TEST_BOOK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FAKE_JSON_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFakeJsonSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FAKE_JSON_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FAKE_JSON_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
