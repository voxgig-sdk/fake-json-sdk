<?php
declare(strict_types=1);

// FakeJson SDK utility: clean

class FakeJsonClean
{
    public static function call(FakeJsonContext $ctx, mixed $val): mixed
    {
        return $val;
    }
}
