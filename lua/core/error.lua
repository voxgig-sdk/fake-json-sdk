-- FakeJson SDK error

local FakeJsonError = {}
FakeJsonError.__index = FakeJsonError


function FakeJsonError.new(code, msg, ctx)
  local self = setmetatable({}, FakeJsonError)
  self.is_sdk_error = true
  self.sdk = "FakeJson"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FakeJsonError:error()
  return self.msg
end


function FakeJsonError:__tostring()
  return self.msg
end


return FakeJsonError
