# Typed models for the FakeJson SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Book:
    author: Optional[str] = None
    id: Optional[int] = None
    isbn: Optional[str] = None
    publication_year: Optional[int] = None
    title: Optional[str] = None


@dataclass
class BookLoadMatch:
    id: int


@dataclass
class BookListMatch:
    author: Optional[str] = None
    id: Optional[int] = None
    isbn: Optional[str] = None
    publication_year: Optional[int] = None
    title: Optional[str] = None


@dataclass
class BookCreateData:
    author: Optional[str] = None
    id: Optional[int] = None
    isbn: Optional[str] = None
    publication_year: Optional[int] = None
    title: Optional[str] = None


@dataclass
class BookUpdateData:
    id: int


@dataclass
class BookRemoveMatch:
    id: int


@dataclass
class Currency:
    code: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    symbol: Optional[str] = None


@dataclass
class CurrencyListMatch:
    code: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    symbol: Optional[str] = None


@dataclass
class Person:
    address: Optional[str] = None
    age: Optional[int] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class PersonListMatch:
    address: Optional[str] = None
    age: Optional[int] = None
    email: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Pokemon:
    id: Optional[int] = None
    name: Optional[str] = None
    stat: Optional[dict] = None
    type: Optional[list] = None


@dataclass
class PokemonListMatch:
    id: Optional[int] = None
    name: Optional[str] = None
    stat: Optional[dict] = None
    type: Optional[list] = None

