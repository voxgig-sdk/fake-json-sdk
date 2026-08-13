# FakeJson SDK utility: make_context

from projectname_sdk.core.context import FakeJsonContext


def make_context_util(ctxmap, basectx):
    return FakeJsonContext(ctxmap, basectx)
