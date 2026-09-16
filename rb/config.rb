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
              "short" => "Author of the book",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the book",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "isbn",
              "short" => "ISBN of the book",
              "type" => "`$STRING`",
            },
            {
              "name" => "publicationYear",
              "short" => "Year of publication",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "short" => "Title of the book",
              "type" => "`$STRING`",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/books",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 23,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                },
              ],
            },
            "patch" => {
              "input" => "data",
              "name" => "patch",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 23,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 23,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 23,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "books",
                    "{id}",
                  ],
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
              "short" => "Currency code (ISO 4217)",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the currency",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Currency name",
              "type" => "`$STRING`",
            },
            {
              "name" => "symbol",
              "short" => "Currency symbol",
              "type" => "`$STRING`",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/currencies",
                  "segments" => [
                    {
                      "lit" => "currencies",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "currencies",
                  ],
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
              "short" => "Address of the person",
              "type" => "`$STRING`",
            },
            {
              "name" => "age",
              "short" => "Age of the person",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "email",
              "name" => "email",
              "short" => "Email address",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the person",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Full name of the person",
              "type" => "`$STRING`",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/peoples",
                  "segments" => [
                    {
                      "lit" => "peoples",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "peoples",
                  ],
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
              "short" => "Unique identifier for the pokemon",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the pokemon",
              "type" => "`$STRING`",
            },
            {
              "name" => "stats",
              "short" => "Stats of the pokemon",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "short" => "Types of the pokemon",
              "type" => "`$ARRAY`",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pokemons",
                  "segments" => [
                    {
                      "lit" => "pokemons",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "pokemons",
                  ],
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
