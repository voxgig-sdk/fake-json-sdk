<?php
declare(strict_types=1);

// FakeJson SDK base feature

class FakeJsonBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FakeJsonContext $ctx, array $options): void {}
    public function PostConstruct(FakeJsonContext $ctx): void {}
    public function PostConstructEntity(FakeJsonContext $ctx): void {}
    public function SetData(FakeJsonContext $ctx): void {}
    public function GetData(FakeJsonContext $ctx): void {}
    public function GetMatch(FakeJsonContext $ctx): void {}
    public function SetMatch(FakeJsonContext $ctx): void {}
    public function PrePoint(FakeJsonContext $ctx): void {}
    public function PreSpec(FakeJsonContext $ctx): void {}
    public function PreRequest(FakeJsonContext $ctx): void {}
    public function PreResponse(FakeJsonContext $ctx): void {}
    public function PreResult(FakeJsonContext $ctx): void {}
    public function PreDone(FakeJsonContext $ctx): void {}
    public function PreUnexpected(FakeJsonContext $ctx): void {}
}
