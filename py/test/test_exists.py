# ProjectName SDK exists test

import pytest
from fakejson_sdk import FakeJsonSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FakeJsonSDK.test(None, None)
        assert testsdk is not None
