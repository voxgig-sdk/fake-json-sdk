# FakeJson TypeScript SDK



The TypeScript SDK for the FakeJson API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Book()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/fake-json-sdk/releases](https://github.com/voxgig-sdk/fake-json-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FakeJsonSDK } from '@voxgig-sdk/fake-json'

const client = new FakeJsonSDK()
```

### 2. List book records

`list()` resolves to an array of Book ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const books = await client.Book().list()

for (const book of books) {
  console.log(book)
}
```

### 3. Load a book

`load()` returns the entity directly and throws on failure:

```ts
try {
  const book = await client.Book().load({ id: 1 })
  console.log(book)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Book ENTITY (.data() for the record)
const created = await client.Book().create({
  author: 'example_author',
  isbn: 'example_isbn',
})

// Update — the id comes off the returned entity's data()
const updated = await client.Book().update({
  id: created.data().id!,
  author: 'example_author',
  isbn: 'example_isbn',
})

// Remove
await client.Book().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const persons = await client.Person().list()
  console.log(persons)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FakeJsonSDK.test()

const person = await client.Person().list()
// person is the entity, populated with mock response data
// — call person.data() for the record itself
console.log(person)
```

You can also use the instance method:

```ts
const client = new FakeJsonSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Person()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FakeJsonSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FAKE_JSON_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### FakeJsonSDK

#### Constructor

```ts
new FakeJsonSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Book(data?)` | `BookEntity` | Create a Book entity instance. |
| `Currency(data?)` | `CurrencyEntity` | Create a Currency entity instance. |
| `Person(data?)` | `PersonEntity` | Create a Person entity instance. |
| `Pokemon(data?)` | `PokemonEntity` | Create a Pokemon entity instance. |
| `tester(testopts?, sdkopts?)` | `FakeJsonSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FakeJsonSDK.test(testopts?, sdkopts?)` | `FakeJsonSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FakeJsonSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Book

| Field | Description |
| --- | --- |
| `author` | Author of the book |
| `id` | Unique identifier for the book |
| `isbn` | ISBN of the book |
| `publicationYear` | Year of publication |
| `title` | Title of the book |

Operations: create, list, load, patch, remove, update.

API path: `/books`

#### Currency

| Field | Description |
| --- | --- |
| `code` | Currency code (ISO 4217) |
| `id` | Unique identifier for the currency |
| `name` | Currency name |
| `symbol` | Currency symbol |

Operations: list.

API path: `/currencies`

#### Person

| Field | Description |
| --- | --- |
| `address` | Address of the person |
| `age` | Age of the person |
| `email` | Email address |
| `id` | Unique identifier for the person |
| `name` | Full name of the person |

Operations: list.

API path: `/peoples`

#### Pokemon

| Field | Description |
| --- | --- |
| `id` | Unique identifier for the pokemon |
| `name` | Name of the pokemon |
| `stats` | Stats of the pokemon |
| `type` | Types of the pokemon |

Operations: list.

API path: `/pokemons`



## Entities


### Book

Create an instance: `const book = client.Book()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` | Author of the book |
| `id` | `number` | Unique identifier for the book |
| `isbn` | `string` | ISBN of the book |
| `publicationYear` | `number` | Year of publication |
| `title` | `string` | Title of the book |

#### Example: Load

```ts
const book = await client.Book().load({ id: 1 })
```

#### Example: List

```ts
const books = await client.Book().list()
```

#### Example: Create

```ts
const book = await client.Book().create({
})
```


### Currency

Create an instance: `const currency = client.Currency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Currency code (ISO 4217) |
| `id` | `number` | Unique identifier for the currency |
| `name` | `string` | Currency name |
| `symbol` | `string` | Currency symbol |

#### Example: List

```ts
const currencys = await client.Currency().list()
```


### Person

Create an instance: `const person = client.Person()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Address of the person |
| `age` | `number` | Age of the person |
| `email` | `string` | Email address |
| `id` | `number` | Unique identifier for the person |
| `name` | `string` | Full name of the person |

#### Example: List

```ts
const persons = await client.Person().list()
```


### Pokemon

Create an instance: `const pokemon = client.Pokemon()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Unique identifier for the pokemon |
| `name` | `string` | Name of the pokemon |
| `stats` | `Record<string, any>` | Stats of the pokemon |
| `type` | `any[]` | Types of the pokemon |

#### Example: List

```ts
const pokemons = await client.Pokemon().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
fake-json/
├── src/
│   ├── FakeJsonSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FakeJsonSDK } from '@voxgig-sdk/fake-json'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const person = client.Person()
await person.list()

// person.data() now returns the person data from the last `list`
// person.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
