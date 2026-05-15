<?php
declare(strict_types=1);

// FakeJson SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FakeJsonFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FakeJsonBaseFeature();
            case "test":
                return new FakeJsonTestFeature();
            default:
                return new FakeJsonBaseFeature();
        }
    }
}
