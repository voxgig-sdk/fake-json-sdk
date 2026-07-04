// Typed models for the FakeJson SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Book {
  author?: string
  id?: number
  isbn?: string
  publication_year?: number
  title?: string
}

export interface BookLoadMatch {
  id: number
}

export type BookListMatch = Partial<Book>

export type BookCreateData = Partial<Book>

export interface BookUpdateData {
  id: number
}

export interface BookRemoveMatch {
  id: number
}

export interface Currency {
  code?: string
  id?: number
  name?: string
  symbol?: string
}

export type CurrencyListMatch = Partial<Currency>

export interface Person {
  address?: string
  age?: number
  email?: string
  id?: number
  name?: string
}

export type PersonListMatch = Partial<Person>

export interface Pokemon {
  id?: number
  name?: string
  stat?: Record<string, any>
  type?: any[]
}

export type PokemonListMatch = Partial<Pokemon>

