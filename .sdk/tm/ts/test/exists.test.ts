
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FakeJsonSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FakeJsonSDK.test()
    equal(testsdk instanceof FakeJsonSDK, true,
      'FakeJsonSDK.test() must return a client synchronously')
  })

})
