"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeJsonError = void 0;
class FakeJsonError extends Error {
    isFakeJsonError = true;
    sdk = 'FakeJson';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FakeJsonError = FakeJsonError;
//# sourceMappingURL=FakeJsonError.js.map