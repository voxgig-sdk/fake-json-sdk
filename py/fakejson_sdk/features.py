# FakeJson SDK feature factory

from fakejson_sdk.feature.base_feature import FakeJsonBaseFeature
from fakejson_sdk.feature.ratelimit_feature import FakeJsonRatelimitFeature
from fakejson_sdk.feature.retry_feature import FakeJsonRetryFeature
from fakejson_sdk.feature.test_feature import FakeJsonTestFeature
from fakejson_sdk.feature.timeout_feature import FakeJsonTimeoutFeature


_FEATURES = {
    "base": lambda: FakeJsonBaseFeature(),
    "ratelimit": lambda: FakeJsonRatelimitFeature(),
    "retry": lambda: FakeJsonRetryFeature(),
    "test": lambda: FakeJsonTestFeature(),
    "timeout": lambda: FakeJsonTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
