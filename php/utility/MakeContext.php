<?php
declare(strict_types=1);

// FakeJson SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FakeJsonMakeContext
{
    public static function call(array $ctxmap, ?FakeJsonContext $basectx): FakeJsonContext
    {
        return new FakeJsonContext($ctxmap, $basectx);
    }
}
