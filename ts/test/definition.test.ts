import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "book",
    "accessor": "Book",
    "op": "create",
    "method": "POST",
    "path": "/books",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 201,
    "sample": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "publicationYear": 1925
    },
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "list",
    "method": "GET",
    "path": "/books",
    "args": [],
    "select": {
      "limit": 20
    },
    "headers": [],
    "query": [
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "isbn": "978-0-7432-7356-5",
        "publicationYear": 1925
      }
    ],
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "load",
    "method": "GET",
    "path": "/books/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 23
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "publicationYear": 1925
    },
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "remove",
    "method": "DELETE",
    "path": "/books/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 23
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "update",
    "method": "PUT",
    "path": "/books/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 23
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "publicationYear": 1925
    },
    "idField": "id"
  },
  {
    "entity": "currency",
    "accessor": "Currency",
    "op": "list",
    "method": "GET",
    "path": "/currencies",
    "args": [],
    "select": {
      "limit": "v1"
    },
    "headers": [],
    "query": [
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "code": "USD",
        "name": "United States Dollar",
        "symbol": "$"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "person",
    "accessor": "Person",
    "op": "list",
    "method": "GET",
    "path": "/peoples",
    "args": [],
    "select": {
      "limit": "v1"
    },
    "headers": [],
    "query": [
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30,
        "address": "123 Main St, Anytown, USA"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "pokemon",
    "accessor": "Pokemon",
    "op": "list",
    "method": "GET",
    "path": "/pokemons",
    "args": [],
    "select": {
      "limit": "v1"
    },
    "headers": [],
    "query": [
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "Bulbasaur",
        "type": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 45,
          "attack": 49,
          "defense": 49
        }
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
