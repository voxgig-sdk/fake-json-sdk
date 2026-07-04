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
---@field publication_year? number
---@field title? string

---@class BookLoadMatch
---@field id number

---@class BookListMatch

---@class BookCreateData

---@class BookUpdateData
---@field id number

---@class BookRemoveMatch
---@field id number

---@class Currency
---@field code? string
---@field id? number
---@field name? string
---@field symbol? string

---@class CurrencyListMatch

---@class Person
---@field address? string
---@field age? number
---@field email? string
---@field id? number
---@field name? string

---@class PersonListMatch

---@class Pokemon
---@field id? number
---@field name? string
---@field stat? table
---@field type? table

---@class PokemonListMatch

local M = {}

return M
