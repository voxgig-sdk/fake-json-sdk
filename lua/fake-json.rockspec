package = "voxgig-sdk-fake-json"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/fake-json-sdk.git"
}
description = {
  summary = "FakeJson SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["fake-json_sdk"] = "fake-json_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
