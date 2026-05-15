package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBookEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewCurrencyEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewPersonEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

var NewPokemonEntityFunc func(client *FakeJsonSDK, entopts map[string]any) FakeJsonEntity

