<?php
declare(strict_types=1);

// FakeJson SDK utility: prepare_body

class FakeJsonPrepareBody
{
    public static function call(FakeJsonContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
