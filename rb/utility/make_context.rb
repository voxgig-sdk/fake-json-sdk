# FakeJson SDK utility: make_context
require_relative '../core/context'
module FakeJsonUtilities
  MakeContext = ->(ctxmap, basectx) {
    FakeJsonContext.new(ctxmap, basectx)
  }
end
