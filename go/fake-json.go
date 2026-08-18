package voxgigfakejsonsdk

import (
	"github.com/voxgig-sdk/fake-json-sdk/go/core"
	"github.com/voxgig-sdk/fake-json-sdk/go/entity"
	"github.com/voxgig-sdk/fake-json-sdk/go/feature"
	_ "github.com/voxgig-sdk/fake-json-sdk/go/utility"
)

// Type aliases preserve external API.
type FakeJsonSDK = core.FakeJsonSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FakeJsonEntity = core.FakeJsonEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FakeJsonError = core.FakeJsonError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBookEntityFunc = func(client *core.FakeJsonSDK, entopts map[string]any) core.FakeJsonEntity {
		return entity.NewBookEntity(client, entopts)
	}
	core.NewCurrencyEntityFunc = func(client *core.FakeJsonSDK, entopts map[string]any) core.FakeJsonEntity {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewPersonEntityFunc = func(client *core.FakeJsonSDK, entopts map[string]any) core.FakeJsonEntity {
		return entity.NewPersonEntity(client, entopts)
	}
	core.NewPokemonEntityFunc = func(client *core.FakeJsonSDK, entopts map[string]any) core.FakeJsonEntity {
		return entity.NewPokemonEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFakeJsonSDK = core.NewFakeJsonSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFakeJsonSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FakeJsonSDK  { return NewFakeJsonSDK(nil) }
func Test() *FakeJsonSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
