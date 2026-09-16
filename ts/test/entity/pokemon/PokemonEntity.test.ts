

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


describe('PokemonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FAKE_JSON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FAKE_JSON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FakeJsonSDK.test()
    const ent = testsdk.Pokemon()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FAKE_JSON_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pokemon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Unique identifier for the pokemon","type":"`$INTEGER`","index$":0},{"active":true,"name":"name","req":false,"short":"Name of the pokemon","type":"`$STRING`","index$":1},{"active":true,"name":"stats","req":false,"short":"Stats of the pokemon","type":"`$OBJECT`","index$":2},{"active":true,"name":"type","req":false,"short":"Types of the pokemon","type":"`$ARRAY`","index$":3}],"id":{"field":"id","name":"id"},"name":"pokemon","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /pokemons","json":"{\"operationId\":\"getPokemons\",\"parameters\":[{\"description\":\"Maximum number of pokemons to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the pokemon\",\"example\":1,\"type\":\"integer\"},\"name\":{\"description\":\"Name of the pokemon\",\"example\":\"Bulbasaur\",\"type\":\"string\"},\"stats\":{\"description\":\"Stats of the pokemon\",\"properties\":{\"attack\":{\"example\":49,\"type\":\"integer\"},\"defense\":{\"example\":49,\"type\":\"integer\"},\"hp\":{\"example\":45,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":{\"description\":\"Types of the pokemon\",\"example\":[\"Grass\",\"Poison\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/pokemons","segments":[{"lit":"pokemons"}],"select":{"exist":["limit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"pokemon","name__orig":"pokemon","Name":"Pokemon","name_":"pokemon","name-":"pokemon","NAME":"POKEMON","index$":3}, {"active":true,"entity":"pokemon","key$":"BasicPokemonFlow","kind":"basic","name":"BasicPokemonFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pokemon_ref01"}}],"index$":0}]}, 'Pokemon')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pokemon_ref01_data = Object.values(setup.data.existing.pokemon)[0] as any

    // LIST
    const pokemon_ref01_ent = client.Pokemon()
    const pokemon_ref01_match: any = {}

    const pokemon_ref01_list = (await pokemon_ref01_ent.list(pokemon_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pokemon/PokemonTestData.json')

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
    ['pokemon01','pokemon02','pokemon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FAKE_JSON_TEST_POKEMON_ENTID': idmap,
    'FAKE_JSON_TEST_LIVE': 'FALSE',
    'FAKE_JSON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FAKE_JSON_TEST_POKEMON_ENTID']

  const live = 'TRUE' === env.FAKE_JSON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FAKE_JSON_TEST_POKEMON_ENTID']
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
  
