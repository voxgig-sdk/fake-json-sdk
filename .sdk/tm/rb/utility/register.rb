# FakeJson SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FakeJsonUtility.registrar = ->(u) {
  u.clean = FakeJsonUtilities::Clean
  u.done = FakeJsonUtilities::Done
  u.make_error = FakeJsonUtilities::MakeError
  u.feature_add = FakeJsonUtilities::FeatureAdd
  u.feature_hook = FakeJsonUtilities::FeatureHook
  u.feature_init = FakeJsonUtilities::FeatureInit
  u.fetcher = FakeJsonUtilities::Fetcher
  u.make_fetch_def = FakeJsonUtilities::MakeFetchDef
  u.make_context = FakeJsonUtilities::MakeContext
  u.make_options = FakeJsonUtilities::MakeOptions
  u.make_request = FakeJsonUtilities::MakeRequest
  u.make_response = FakeJsonUtilities::MakeResponse
  u.make_result = FakeJsonUtilities::MakeResult
  u.make_point = FakeJsonUtilities::MakePoint
  u.make_spec = FakeJsonUtilities::MakeSpec
  u.make_url = FakeJsonUtilities::MakeUrl
  u.param = FakeJsonUtilities::Param
  u.prepare_auth = FakeJsonUtilities::PrepareAuth
  u.prepare_body = FakeJsonUtilities::PrepareBody
  u.prepare_headers = FakeJsonUtilities::PrepareHeaders
  u.prepare_method = FakeJsonUtilities::PrepareMethod
  u.prepare_params = FakeJsonUtilities::PrepareParams
  u.prepare_path = FakeJsonUtilities::PreparePath
  u.prepare_query = FakeJsonUtilities::PrepareQuery
  u.result_basic = FakeJsonUtilities::ResultBasic
  u.result_body = FakeJsonUtilities::ResultBody
  u.result_headers = FakeJsonUtilities::ResultHeaders
  u.transform_request = FakeJsonUtilities::TransformRequest
  u.transform_response = FakeJsonUtilities::TransformResponse
}
