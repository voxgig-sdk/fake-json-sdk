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
  publicationYear?: number
  title?: string
}

export interface BookLoadMatch {
  id: number
}

export interface BookListMatch {
  limit?: number
}

export interface BookCreateData {
  author?: string
  id?: number
  isbn?: string
  publicationYear?: number
  title?: string
}

export interface BookUpdateData {
  id: number
  author?: string
  isbn?: string
  publicationYear?: number
  title?: string
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

export interface CurrencyListMatch {
  limit?: number
}

export interface Person {
  address?: string
  age?: number
  email?: string
  id?: number
  name?: string
}

export interface PersonListMatch {
  limit?: number
}

export interface Pokemon {
  id?: number
  name?: string
  stats?: Record<string, any>
  type?: any[]
}

export interface PokemonListMatch {
  limit?: number
}

