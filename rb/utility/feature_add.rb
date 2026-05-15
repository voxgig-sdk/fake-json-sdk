# FakeJson SDK utility: feature_add
module FakeJsonUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
