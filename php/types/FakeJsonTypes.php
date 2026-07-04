<?php
declare(strict_types=1);

// Typed models for the FakeJson SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Book entity data model. */
class Book
{
    public ?string $author = null;
    public ?int $id = null;
    public ?string $isbn = null;
    public ?int $publication_year = null;
    public ?string $title = null;
}

/** Request payload for Book#load. */
class BookLoadMatch
{
    public int $id;
}

/** Match filter for Book#list (any subset of Book fields). */
class BookListMatch
{
    public ?string $author = null;
    public ?int $id = null;
    public ?string $isbn = null;
    public ?int $publication_year = null;
    public ?string $title = null;
}

/** Match filter for Book#create (any subset of Book fields). */
class BookCreateData
{
    public ?string $author = null;
    public ?int $id = null;
    public ?string $isbn = null;
    public ?int $publication_year = null;
    public ?string $title = null;
}

/** Request payload for Book#update. */
class BookUpdateData
{
    public int $id;
}

/** Request payload for Book#remove. */
class BookRemoveMatch
{
    public int $id;
}

/** Currency entity data model. */
class Currency
{
    public ?string $code = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $symbol = null;
}

/** Match filter for Currency#list (any subset of Currency fields). */
class CurrencyListMatch
{
    public ?string $code = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $symbol = null;
}

/** Person entity data model. */
class Person
{
    public ?string $address = null;
    public ?int $age = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Match filter for Person#list (any subset of Person fields). */
class PersonListMatch
{
    public ?string $address = null;
    public ?int $age = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Pokemon entity data model. */
class Pokemon
{
    public ?int $id = null;
    public ?string $name = null;
    public ?array $stat = null;
    public ?array $type = null;
}

/** Match filter for Pokemon#list (any subset of Pokemon fields). */
class PokemonListMatch
{
    public ?int $id = null;
    public ?string $name = null;
    public ?array $stat = null;
    public ?array $type = null;
}

