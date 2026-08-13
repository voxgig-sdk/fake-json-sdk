# FakeJson SDK feature factory

from fakejson_sdk.feature.base_feature import FakeJsonBaseFeature
from fakejson_sdk.feature.test_feature import FakeJsonTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FakeJsonBaseFeature(),
        "test": lambda: FakeJsonTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
