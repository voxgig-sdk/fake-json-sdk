<?php
declare(strict_types=1);

// FakeJson SDK utility: result_headers

class FakeJsonResultHeaders
{
    public static function call(FakeJsonContext $ctx): ?FakeJsonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
