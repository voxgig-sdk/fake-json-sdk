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
    public ?int $publicationYear = null;
    public ?string $title = null;
}

/** Request payload for Book#load. */
class BookLoadMatch
{
    public int $id;
}

/** Request payload for Book#list. */
class BookListMatch
{
    public ?string $author = null;
    public ?int $id = null;
    public ?string $isbn = null;
    public ?int $publicationYear = null;
    public ?string $title = null;
}

/** Request payload for Book#create. */
class BookCreateData
{
    public ?string $author = null;
    public ?int $id = null;
    public ?string $isbn = null;
    public ?int $publicationYear = null;
    public ?string $title = null;
}

/** Request payload for Book#update. */
class BookUpdateData
{
    public int $id;
    public ?string $author = null;
    public ?string $isbn = null;
    public ?int $publicationYear = null;
    public ?string $title = null;
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

/** Request payload for Currency#list. */
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

/** Request payload for Person#list. */
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
    public ?array $stats = null;
    public ?array $type = null;
}

/** Request payload for Pokemon#list. */
class PokemonListMatch
{
    public ?int $id = null;
    public ?string $name = null;
    public ?array $stats = null;
    public ?array $type = null;
}

