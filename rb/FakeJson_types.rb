# frozen_string_literal: true

# Typed models for the FakeJson SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Book entity data model.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] isbn
#   @return [String, nil]
#
# @!attribute [rw] publicationYear
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Book = Struct.new(
  :author,
  :id,
  :isbn,
  :publicationYear,
  :title,
  keyword_init: true
)

# Request payload for Book#load.
#
# @!attribute [rw] id
#   @return [Integer]
BookLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Book#list.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] isbn
#   @return [String, nil]
#
# @!attribute [rw] publicationYear
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
BookListMatch = Struct.new(
  :author,
  :id,
  :isbn,
  :publicationYear,
  :title,
  keyword_init: true
)

# Request payload for Book#create.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] isbn
#   @return [String, nil]
#
# @!attribute [rw] publicationYear
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
BookCreateData = Struct.new(
  :author,
  :id,
  :isbn,
  :publicationYear,
  :title,
  keyword_init: true
)

# Request payload for Book#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] isbn
#   @return [String, nil]
#
# @!attribute [rw] publicationYear
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
BookUpdateData = Struct.new(
  :id,
  :author,
  :isbn,
  :publicationYear,
  :title,
  keyword_init: true
)

# Request payload for Book#remove.
#
# @!attribute [rw] id
#   @return [Integer]
BookRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Currency entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
Currency = Struct.new(
  :code,
  :id,
  :name,
  :symbol,
  keyword_init: true
)

# Request payload for Currency#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
CurrencyListMatch = Struct.new(
  :code,
  :id,
  :name,
  :symbol,
  keyword_init: true
)

# Person entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Person = Struct.new(
  :address,
  :age,
  :email,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Person#list.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
PersonListMatch = Struct.new(
  :address,
  :age,
  :email,
  :id,
  :name,
  keyword_init: true
)

# Pokemon entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stats
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
Pokemon = Struct.new(
  :id,
  :name,
  :stats,
  :type,
  keyword_init: true
)

# Request payload for Pokemon#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stats
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
PokemonListMatch = Struct.new(
  :id,
  :name,
  :stats,
  :type,
  keyword_init: true
)

