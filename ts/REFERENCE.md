# FakeJson TypeScript SDK Reference

Complete API reference for the FakeJson TypeScript SDK.


## FakeJsonSDK

### Constructor

```ts
new FakeJsonSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FakeJsonSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FakeJsonSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FakeJsonSDK` instance in test mode.


### Instance Methods

#### `Book(data?: object)`

Create a new `Book` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BookEntity` instance.

#### `Currency(data?: object)`

Create a new `Currency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CurrencyEntity` instance.

#### `Person(data?: object)`

Create a new `Person` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PersonEntity` instance.

#### `Pokemon(data?: object)`

Create a new `Pokemon` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PokemonEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FakeJsonSDK.test()`.

**Returns:** `FakeJsonSDK` instance in test mode.


---

## BookEntity

```ts
const book = client.Book()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No | Author of the book |
| `id` | `number` | No | Unique identifier for the book |
| `isbn` | `string` | No | ISBN of the book |
| `publicationYear` | `number` | No | Year of publication |
| `title` | `string` | No | Title of the book |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Book().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Book().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Book().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Book().remove({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Book().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BookEntity` instance with the same client and
options.

#### `client()`

Return the parent `FakeJsonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CurrencyEntity

```ts
const currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Currency code (ISO 4217) |
| `id` | `number` | No | Unique identifier for the currency |
| `name` | `string` | No | Currency name |
| `symbol` | `string` | No | Currency symbol |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Currency().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `FakeJsonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PersonEntity

```ts
const person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Address of the person |
| `age` | `number` | No | Age of the person |
| `email` | `string` | No | Email address |
| `id` | `number` | No | Unique identifier for the person |
| `name` | `string` | No | Full name of the person |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Person().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PersonEntity` instance with the same client and
options.

#### `client()`

Return the parent `FakeJsonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PokemonEntity

```ts
const pokemon = client.Pokemon()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No | Unique identifier for the pokemon |
| `name` | `string` | No | Name of the pokemon |
| `stats` | `Record<string, any>` | No | Stats of the pokemon |
| `type` | `any[]` | No | Types of the pokemon |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pokemon().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PokemonEntity` instance with the same client and
options.

#### `client()`

Return the parent `FakeJsonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FakeJsonSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

