

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FakeJsonSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CurrencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FAKE_JSON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FAKE_JSON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FakeJsonSDK.test()
    const ent = testsdk.Currency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FAKE_JSON_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'currency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"Currency code (ISO 4217)","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the currency","type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"short":"Currency name","type":"`$STRING`","index$":2},{"active":true,"name":"symbol","req":false,"short":"Currency symbol","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"currency","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /currencies","json":"{\"operationId\":\"getCurrencies\",\"parameters\":[{\"description\":\"Maximum number of currencies to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"code\":{\"description\":\"Currency code (ISO 4217)\",\"example\":\"USD\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the currency\",\"example\":1,\"type\":\"integer\"},\"name\":{\"description\":\"Currency name\",\"example\":\"United States Dollar\",\"type\":\"string\"},\"symbol\":{\"description\":\"Currency symbol\",\"example\":\"$\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/currencies","segments":[{"lit":"currencies"}],"select":{"exist":["limit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"currency","name__orig":"currency","Name":"Currency","name_":"currency","name-":"currency","NAME":"CURRENCY","index$":1}, {"active":true,"entity":"currency","key$":"BasicCurrencyFlow","kind":"basic","name":"BasicCurrencyFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"currency_ref01"}}],"index$":0}]}, 'Currency')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let currency_ref01_data = Object.values(setup.data.existing.currency)[0] as any

    // LIST
    const currency_ref01_ent = client.Currency()
    const currency_ref01_match: any = {}

    const currency_ref01_list = (await currency_ref01_ent.list(currency_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/currency/CurrencyTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FakeJsonSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['currency01','currency02','currency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FAKE_JSON_TEST_CURRENCY_ENTID': idmap,
    'FAKE_JSON_TEST_LIVE': 'FALSE',
    'FAKE_JSON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FAKE_JSON_TEST_CURRENCY_ENTID']

  const live = 'TRUE' === env.FAKE_JSON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FAKE_JSON_TEST_CURRENCY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FakeJsonSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FAKE_JSON_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
