"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BookEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FAKE_JSON_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FAKE_JSON_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FakeJsonSDK.test();
        const ent = testsdk.Book();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FAKE_JSON_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'book.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "author", "req": false, "short": "Author of the book", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the book", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "isbn", "req": false, "short": "ISBN of the book", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "publicationYear", "req": false, "short": "Year of publication", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "title", "req": false, "short": "Title of the book", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "book", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /books", "json": "{\"operationId\":\"createBook\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the book\",\"example\":1,\"type\":\"integer\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Book created successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/books", "segments": [{ "lit": "books" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /books", "json": "{\"operationId\":\"getBooks\",\"parameters\":[{\"description\":\"Maximum number of books to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"example\":20,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the book\",\"example\":1,\"type\":\"integer\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/books", "segments": [{ "lit": "books" }], "select": { "exist": ["limit"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 23, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /books/{id}", "json": "{\"operationId\":\"getBookById\",\"parameters\":[{\"description\":\"ID of the book to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":23,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the book\",\"example\":1,\"type\":\"integer\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Book not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/books/{id}", "segments": [{ "lit": "books" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 23, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`" }] }, "contract": { "id": "PATCH /books/{id}", "json": "{\"operationId\":\"patchBook\",\"parameters\":[{\"description\":\"ID of the book to update\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":23,\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the book\",\"example\":1,\"type\":\"integer\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Book updated successfully\"},\"404\":{\"description\":\"Book not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/books/{id}", "segments": [{ "lit": "books" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 23, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /books/{id}", "json": "{\"operationId\":\"deleteBook\",\"parameters\":[{\"description\":\"ID of the book to delete\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":23,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Book deleted successfully\"},\"404\":{\"description\":\"Book not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/books/{id}", "segments": [{ "lit": "books" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 23, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "PUT /books/{id}", "json": "{\"operationId\":\"updateBook\",\"parameters\":[{\"description\":\"ID of the book to update\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":23,\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"Author of the book\",\"example\":\"F. Scott Fitzgerald\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the book\",\"example\":1,\"type\":\"integer\"},\"isbn\":{\"description\":\"ISBN of the book\",\"example\":\"978-0-7432-7356-5\",\"type\":\"string\"},\"publicationYear\":{\"description\":\"Year of publication\",\"example\":1925,\"type\":\"integer\"},\"title\":{\"description\":\"Title of the book\",\"example\":\"The Great Gatsby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Book updated successfully\"},\"404\":{\"description\":\"Book not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/books/{id}", "segments": [{ "lit": "books" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "book", "name__orig": "book", "Name": "Book", "name_": "book", "name-": "book", "NAME": "BOOK", "index$": 0 }, { "active": true, "entity": "book", "key$": "BasicBookFlow", "kind": "basic", "name": "BasicBookFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "book_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "book_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "book_ref01", "srcdatavar": "book_ref01_data", "suffix": "_up0", "textfield": "author" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-book_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "book_ref01", "srcdatavar": "book_ref01_data", "suffix": "_dt0" }, "match": { "id": "book01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-book_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "book_ref01", "suffix": "_rm0" }, "match": { "id": "book01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "book_ref01" } }], "index$": 5 }] }, 'Book');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const book_ref01_ent = client.Book();
        let book_ref01_data = setup.data.new.book['book_ref01'];
        book_ref01_data = (await book_ref01_ent.create(book_ref01_data)).data();
        (0, node_assert_1.default)(null != book_ref01_data.id);
        // LIST
        const book_ref01_match = {};
        const book_ref01_list = (await book_ref01_ent.list(book_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(book_ref01_list, { id: book_ref01_data.id })));
        // UPDATE
        const book_ref01_data_up0 = {};
        book_ref01_data_up0.id = book_ref01_data.id;
        const book_ref01_markdef_up0 = { name: 'author', value: 'Mark01-book_ref01_' + setup.now };
        book_ref01_data_up0[book_ref01_markdef_up0.name] = book_ref01_markdef_up0.value;
        const book_ref01_resdata_up0 = (await book_ref01_ent.update(book_ref01_data_up0)).data();
        (0, node_assert_1.default)(book_ref01_resdata_up0.id === book_ref01_data_up0.id);
        (0, node_assert_1.default)(book_ref01_resdata_up0[book_ref01_markdef_up0.name] === book_ref01_markdef_up0.value);
        // LOAD
        const book_ref01_match_dt0 = {};
        book_ref01_match_dt0.id = book_ref01_data.id;
        const book_ref01_data_dt0 = (await book_ref01_ent.load(book_ref01_match_dt0)).data();
        (0, node_assert_1.default)(book_ref01_data_dt0.id === book_ref01_data.id);
        // REMOVE
        const book_ref01_match_rm0 = { id: book_ref01_data.id };
        await book_ref01_ent.remove(book_ref01_match_rm0);
        // LIST
        const book_ref01_match_rt0 = {};
        const book_ref01_list_rt0 = (await book_ref01_ent.list(book_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(book_ref01_list_rt0, { id: book_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/book/BookTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FakeJsonSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['book01', 'book02', 'book03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FAKE_JSON_TEST_BOOK_ENTID': idmap,
        'FAKE_JSON_TEST_LIVE': 'FALSE',
        'FAKE_JSON_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FAKE_JSON_TEST_BOOK_ENTID'];
    const live = 'TRUE' === env.FAKE_JSON_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FAKE_JSON_TEST_BOOK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FakeJsonSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FAKE_JSON_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BookEntity.test.js.map