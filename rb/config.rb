# FakeJson SDK configuration

module FakeJsonConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "FakeJson",
        "slug" => "fake-json",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://softwium.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "book" => {},
          "currency" => {},
          "person" => {},
          "pokemon" => {},
        },
      },
      "entity" => {
        "book" => {
          "fields" => [
            {
              "name" => "author",
              "title" => "Author",
              "type" => "`$STRING`",
              "short" => "Author of the book",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Unique identifier for the book",
            },
            {
              "name" => "isbn",
              "title" => "Isbn",
              "type" => "`$STRING`",
              "short" => "ISBN of the book",
            },
            {
              "name" => "publicationYear",
              "title" => "Publication Year",
              "type" => "`$INTEGER`",
              "short" => "Year of publication",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "Title of the book",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "book",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/books",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                  ],
                  "parts" => [
                    "books",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                  ],
                  "parts" => [
                    "books",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 20,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books/{id}",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 23,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
            "patch" => {
              "input" => "data",
              "name" => "patch",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/books/{id}",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 23,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/books/{id}",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 23,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/books/{id}",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 23,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "currency" => {
          "fields" => [
            {
              "name" => "code",
              "title" => "Code",
              "type" => "`$STRING`",
              "short" => "Currency code (ISO 4217)",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Unique identifier for the currency",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Currency name",
            },
            {
              "name" => "symbol",
              "title" => "Symbol",
              "type" => "`$STRING`",
              "short" => "Currency symbol",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "currency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/currencies",
                  "segments" => [
                    {
                      "lit" => "currencies",
                    },
                  ],
                  "parts" => [
                    "currencies",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "person" => {
          "fields" => [
            {
              "name" => "address",
              "title" => "Address",
              "type" => "`$STRING`",
              "short" => "Address of the person",
            },
            {
              "name" => "age",
              "title" => "Age",
              "type" => "`$INTEGER`",
              "short" => "Age of the person",
            },
            {
              "name" => "email",
              "title" => "Email",
              "type" => "`$STRING`",
              "short" => "Email address",
              "format" => "email",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Unique identifier for the person",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Full name of the person",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "person",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/peoples",
                  "segments" => [
                    {
                      "lit" => "peoples",
                    },
                  ],
                  "parts" => [
                    "peoples",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "pokemon" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Unique identifier for the pokemon",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the pokemon",
            },
            {
              "name" => "stats",
              "title" => "Stats",
              "type" => "`$OBJECT`",
              "short" => "Stats of the pokemon",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$ARRAY`",
              "short" => "Types of the pokemon",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "pokemon",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pokemons",
                  "segments" => [
                    {
                      "lit" => "pokemons",
                    },
                  ],
                  "parts" => [
                    "pokemons",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FakeJsonFeatures.make_feature(name)
  end
end
