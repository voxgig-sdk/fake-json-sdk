<?php
declare(strict_types=1);

// FakeJson SDK utility: result_body

class FakeJsonResultBody
{
    public static function call(FakeJsonContext $ctx): ?FakeJsonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
