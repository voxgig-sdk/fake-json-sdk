-- Typed models for the FakeJson SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Book
---@field author? string
---@field id? number
---@field isbn? string
---@field publicationYear? number
---@field title? string

---@class BookLoadMatch
---@field id number

---@class BookListMatch
---@field limit? number

---@class BookCreateData
---@field author? string
---@field id? number
---@field isbn? string
---@field publicationYear? number
---@field title? string

---@class BookUpdateData
---@field id number
---@field author? string
---@field isbn? string
---@field publicationYear? number
---@field title? string

---@class BookRemoveMatch
---@field id number

---@class Currency
---@field code? string
---@field id? number
---@field name? string
---@field symbol? string

---@class CurrencyListMatch
---@field limit? number

---@class Person
---@field address? string
---@field age? number
---@field email? string
---@field id? number
---@field name? string

---@class PersonListMatch
---@field limit? number

---@class Pokemon
---@field id? number
---@field name? string
---@field stats? table
---@field type? table

---@class PokemonListMatch
---@field limit? number

local M = {}

return M
