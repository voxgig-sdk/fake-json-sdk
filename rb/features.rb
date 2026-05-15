# FakeJson SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FakeJsonFeatures
  def self.make_feature(name)
    case name
    when "base"
      FakeJsonBaseFeature.new
    when "test"
      FakeJsonTestFeature.new
    else
      FakeJsonBaseFeature.new
    end
  end
end
