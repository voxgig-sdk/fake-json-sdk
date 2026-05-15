
import { Context } from './Context'


class FakeJsonError extends Error {

  isFakeJsonError = true

  sdk = 'FakeJson'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FakeJsonError
}

