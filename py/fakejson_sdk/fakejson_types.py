# Typed models for the FakeJson SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Book(TypedDict, total=False):
    author: str
    id: int
    isbn: str
    publicationYear: int
    title: str


class BookLoadMatch(TypedDict):
    id: int


class BookListMatch(TypedDict, total=False):
    limit: int


class BookCreateData(TypedDict, total=False):
    author: str
    id: int
    isbn: str
    publicationYear: int
    title: str


class BookUpdateDataRequired(TypedDict):
    id: int


class BookUpdateData(BookUpdateDataRequired, total=False):
    author: str
    isbn: str
    publicationYear: int
    title: str


class BookRemoveMatch(TypedDict):
    id: int


class Currency(TypedDict, total=False):
    code: str
    id: int
    name: str
    symbol: str


class CurrencyListMatch(TypedDict, total=False):
    limit: int


class Person(TypedDict, total=False):
    address: str
    age: int
    email: str
    id: int
    name: str


class PersonListMatch(TypedDict, total=False):
    limit: int


class Pokemon(TypedDict, total=False):
    id: int
    name: str
    stats: dict
    type: list


class PokemonListMatch(TypedDict, total=False):
    limit: int
