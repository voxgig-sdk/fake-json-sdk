
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FakeJsonSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FakeJsonSDK.test()
    equal(null !== testsdk, true)
  })

})
