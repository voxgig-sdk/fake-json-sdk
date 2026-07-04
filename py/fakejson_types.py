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
    publication_year: int
    title: str


class BookLoadMatch(TypedDict):
    id: int


class BookListMatch(TypedDict, total=False):
    author: str
    id: int
    isbn: str
    publication_year: int
    title: str


class BookCreateData(TypedDict, total=False):
    author: str
    id: int
    isbn: str
    publication_year: int
    title: str


class BookUpdateData(TypedDict):
    id: int


class BookRemoveMatch(TypedDict):
    id: int


class Currency(TypedDict, total=False):
    code: str
    id: int
    name: str
    symbol: str


class CurrencyListMatch(TypedDict, total=False):
    code: str
    id: int
    name: str
    symbol: str


class Person(TypedDict, total=False):
    address: str
    age: int
    email: str
    id: int
    name: str


class PersonListMatch(TypedDict, total=False):
    address: str
    age: int
    email: str
    id: int
    name: str


class Pokemon(TypedDict, total=False):
    id: int
    name: str
    stat: dict
    type: list


class PokemonListMatch(TypedDict, total=False):
    id: int
    name: str
    stat: dict
    type: list
