# FakeJson Python SDK Reference

Complete API reference for the FakeJson Python SDK.


## FakeJsonSDK

### Constructor

```python
from fakejson_sdk import FakeJsonSDK

client = FakeJsonSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FakeJsonSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FakeJsonSDK.test()
```


### Instance Methods

#### `Book(data=None)`

Create a new `BookEntity` instance. Pass `None` for no initial data.

#### `Currency(data=None)`

Create a new `CurrencyEntity` instance. Pass `None` for no initial data.

#### `Person(data=None)`

Create a new `PersonEntity` instance. Pass `None` for no initial data.

#### `Pokemon(data=None)`

Create a new `PokemonEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BookEntity

```python
book = client.Book()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `str` | No | Author of the book |
| `id` | `int` | No | Unique identifier for the book |
| `isbn` | `str` | No | ISBN of the book |
| `publicationYear` | `int` | No | Year of publication |
| `title` | `str` | No | Title of the book |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Book().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Book().list()
for book in results:
    print(book)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Book().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Book().remove({"id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Book().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyEntity

```python
currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | Currency code (ISO 4217) |
| `id` | `int` | No | Unique identifier for the currency |
| `name` | `str` | No | Currency name |
| `symbol` | `str` | No | Currency symbol |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Currency().list()
for currency in results:
    print(currency)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PersonEntity

```python
person = client.Person()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No | Address of the person |
| `age` | `int` | No | Age of the person |
| `email` | `str` | No | Email address |
| `id` | `int` | No | Unique identifier for the person |
| `name` | `str` | No | Full name of the person |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Person().list()
for person in results:
    print(person)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PokemonEntity

```python
pokemon = client.Pokemon()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Unique identifier for the pokemon |
| `name` | `str` | No | Name of the pokemon |
| `stats` | `dict` | No | Stats of the pokemon |
| `type` | `list` | No | Types of the pokemon |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pokemon().list()
for pokemon in results:
    print(pokemon)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PokemonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FakeJsonSDK({
    "feature": {
        "test": {"active": True},
    },
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

