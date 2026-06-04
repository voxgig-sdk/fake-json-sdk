# FakeJson SDK

Free public API for fake JSON data — books, currencies, people, and pokemon — for testing and development

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Fake JSON API

The Fake JSON API is a free public service from [Softwium](https://softwium.com/fake-api/) that serves ready-made JSON datasets so developers can prototype clients, demos, and tests without standing up a backend. It is hosted at `https://softwium.com/api` and requires no registration or API key.

What you get from the API:

- `GET /books` — 80 book records, with `?limit=` pagination and `/{id}` single-record lookup.
- `GET /currencies` — 170 currency records.
- `GET /peoples` — 1000 people records.
- `GET /pokemons` — 394 pokemon records.
- `POST`, `PUT`, `PATCH`, and `DELETE` are accepted on `/books` (and return realistic status codes such as 201 on create and 404 on unknown IDs) but changes are not persisted.

Operational notes: CORS is enabled, so the endpoints work directly from browser apps. Invalid IDs return HTTP 404 and unsupported method/route combinations return HTTP 405. The service is intended for prototyping and endpoint validation, not for production traffic.

## Try it

**TypeScript**
```bash
npm install fake-json
```

**Python**
```bash
pip install fake-json-sdk
```

**PHP**
```bash
composer require voxgig/fake-json-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/fake-json-sdk/go
```

**Ruby**
```bash
gem install fake-json-sdk
```

**Lua**
```bash
luarocks install fake-json-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FakeJsonSDK } from 'fake-json'

const client = new FakeJsonSDK({})

// List all books
const books = await client.Book().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o fake-json-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "fake-json": {
      "command": "/abs/path/to/fake-json-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Book** | Book records suitable for catalogue or library demos, served from `GET /books` (with `?limit=` and `GET /books/{id}`); mock writes are accepted on the same path. | `/books` |
| **Currency** | Currency reference records (around 170 entries) for populating selectors and FX demos, served from `GET /currencies`. | `/currencies` |
| **Person** | People records (around 1000 entries) for user, contact, or directory mock-ups, served from `GET /peoples`. | `/peoples` |
| **Pokemon** | Pokemon records (around 394 entries) sourced from the Pokemon JSON Pokedex dataset, served from `GET /pokemons`. | `/pokemons` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from fakejson_sdk import FakeJsonSDK

client = FakeJsonSDK({})

# List all books
books, err = client.Book(None).list(None, None)

# Load a specific book
book, err = client.Book(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'fakejson_sdk.php';

$client = new FakeJsonSDK([]);

// List all books
[$books, $err] = $client->Book(null)->list(null, null);

// Load a specific book
[$book, $err] = $client->Book(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/fake-json-sdk/go"

client := sdk.NewFakeJsonSDK(map[string]any{})

// List all books
books, err := client.Book(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FakeJson_sdk"

client = FakeJsonSDK.new({})

# List all books
books, err = client.Book(nil).list(nil, nil)

# Load a specific book
book, err = client.Book(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("fake-json_sdk")

local client = sdk.new({})

-- List all books
local books, err = client:Book(nil):list(nil, nil)

-- Load a specific book
local book, err = client:Book(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FakeJsonSDK.test()
const result = await client.Book().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FakeJsonSDK.test(None, None)
result, err = client.Book(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FakeJsonSDK::test(null, null);
[$result, $err] = $client->Book(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Book(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FakeJsonSDK.test(nil, nil)
result, err = client.Book(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Book(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Fake JSON API

- Upstream: [https://softwium.com/fake-api/](https://softwium.com/fake-api/)

- Free to use for testing and development; no registration, tokens, or authentication required.
- Underlying sample data is sourced from public GitHub repositories (e.g. json-datasets, Pokemon JSON Pokedex, MongoDB JSON files, random-name datasets) under their original licences (Apache, MIT, and others).
- Write operations (POST/PUT/PATCH/DELETE) are accepted but do not persist — useful for prototyping clients only.
- Check the upstream dataset licences before redistributing the data.

---

Generated from the Fake JSON API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
