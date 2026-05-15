<?php
declare(strict_types=1);

// FakeJson SDK utility: feature_add

class FakeJsonFeatureAdd
{
    public static function call(FakeJsonContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
