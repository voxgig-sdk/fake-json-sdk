package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBookEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewCurrencyEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewPersonEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewPokemonEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

