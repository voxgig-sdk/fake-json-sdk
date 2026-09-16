# FakeJson SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FakeJsonFeatures
  def self.make_feature(name)
    case name
    when "base"
      FakeJsonBaseFeature.new
    when "ratelimit"
      FakeJsonRatelimitFeature.new
    when "retry"
      FakeJsonRetryFeature.new
    when "test"
      FakeJsonTestFeature.new
    when "timeout"
      FakeJsonTimeoutFeature.new
    else
      FakeJsonBaseFeature.new
    end
  end
end
