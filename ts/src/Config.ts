
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FakeJson',
        slug: "fake-json",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://softwium.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      book: {
      },

      currency: {
      },

      person: {
      },

      pokemon: {
      },

    }
  }


  entity = {
    "book": {
      "fields": [
        {
          "name": "author",
          "short": "Author of the book",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the book",
          "type": "`$INTEGER`"
        },
        {
          "name": "isbn",
          "short": "ISBN of the book",
          "type": "`$STRING`"
        },
        {
          "name": "publicationYear",
          "short": "Year of publication",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "short": "Title of the book",
          "type": "`$STRING`"
        }
      ],
      "name": "book",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/books",
              "parts": [
                "books"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/books",
              "parts": [
                "books"
              ],
              "select": {
                "exist": [
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 23,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/books/{id}",
              "parts": [
                "books",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 23,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/books/{id}",
              "parts": [
                "books",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 23,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/books/{id}",
              "parts": [
                "books",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 23,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/books/{id}",
              "parts": [
                "books",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "currency": {
      "fields": [
        {
          "name": "code",
          "short": "Currency code (ISO 4217)",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the currency",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Currency name",
          "type": "`$STRING`"
        },
        {
          "name": "symbol",
          "short": "Currency symbol",
          "type": "`$STRING`"
        }
      ],
      "name": "currency",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/currencies",
              "parts": [
                "currencies"
              ],
              "select": {
                "exist": [
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "person": {
      "fields": [
        {
          "name": "address",
          "short": "Address of the person",
          "type": "`$STRING`"
        },
        {
          "name": "age",
          "short": "Age of the person",
          "type": "`$INTEGER`"
        },
        {
          "name": "email",
          "short": "Email address",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the person",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Full name of the person",
          "type": "`$STRING`"
        }
      ],
      "name": "person",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/peoples",
              "parts": [
                "peoples"
              ],
              "select": {
                "exist": [
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pokemon": {
      "fields": [
        {
          "name": "id",
          "short": "Unique identifier for the pokemon",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Name of the pokemon",
          "type": "`$STRING`"
        },
        {
          "name": "stats",
          "short": "Stats of the pokemon",
          "type": "`$OBJECT`"
        },
        {
          "name": "type",
          "short": "Types of the pokemon",
          "type": "`$ARRAY`"
        }
      ],
      "name": "pokemon",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/pokemons",
              "parts": [
                "pokemons"
              ],
              "select": {
                "exist": [
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

