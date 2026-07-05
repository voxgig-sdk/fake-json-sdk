// Typed models for the FakeJson SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Book is the typed data model for the book entity.
type Book struct {
	Author *string `json:"author,omitempty"`
	Id *int `json:"id,omitempty"`
	Isbn *string `json:"isbn,omitempty"`
	PublicationYear *int `json:"publication_year,omitempty"`
	Title *string `json:"title,omitempty"`
}

// BookLoadMatch is the typed request payload for Book.LoadTyped.
type BookLoadMatch struct {
	Id int `json:"id"`
}

// BookListMatch is the typed request payload for Book.ListTyped.
type BookListMatch struct {
	Author *string `json:"author,omitempty"`
	Id *int `json:"id,omitempty"`
	Isbn *string `json:"isbn,omitempty"`
	PublicationYear *int `json:"publication_year,omitempty"`
	Title *string `json:"title,omitempty"`
}

// BookCreateData is the typed request payload for Book.CreateTyped.
type BookCreateData struct {
	Author *string `json:"author,omitempty"`
	Id *int `json:"id,omitempty"`
	Isbn *string `json:"isbn,omitempty"`
	PublicationYear *int `json:"publication_year,omitempty"`
	Title *string `json:"title,omitempty"`
}

// BookUpdateData is the typed request payload for Book.UpdateTyped.
type BookUpdateData struct {
	Id int `json:"id"`
}

// BookRemoveMatch is the typed request payload for Book.RemoveTyped.
type BookRemoveMatch struct {
	Id int `json:"id"`
}

// Currency is the typed data model for the currency entity.
type Currency struct {
	Code *string `json:"code,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
}

// CurrencyListMatch is the typed request payload for Currency.ListTyped.
type CurrencyListMatch struct {
	Code *string `json:"code,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
}

// Person is the typed data model for the person entity.
type Person struct {
	Address *string `json:"address,omitempty"`
	Age *int `json:"age,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// PersonListMatch is the typed request payload for Person.ListTyped.
type PersonListMatch struct {
	Address *string `json:"address,omitempty"`
	Age *int `json:"age,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Pokemon is the typed data model for the pokemon entity.
type Pokemon struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// PokemonListMatch is the typed request payload for Pokemon.ListTyped.
type PokemonListMatch struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Stat *map[string]any `json:"stat,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
