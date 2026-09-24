

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the pokemon","t":"`$INTEGER`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the pokemon","t":"`$STRING`","key$":"name","index$":1},"stats":{"a":true,"h":"Stats","n":"stats","r":false,"sh":"Stats of the pokemon","t":"`$OBJECT`","key$":"stats","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Types of the pokemon","t":"`$ARRAY`","key$":"type","index$":3}},"id":{"field":"id","name":"id"},"name":"pokemon","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /pokemons","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/pokemons","q":{"exist":["limit"]},"r":{},"s":[{"lit":"pokemons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"pokemon","name__orig":"pokemon","Name":"Pokemon","name_":"pokemon","name-":"pokemon","NAME":"POKEMON","index$":3}, {"active":true,"entity":"pokemon","key$":"BasicPokemonFlow","kind":"basic","name":"BasicPokemonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pokemon_ref01"}}],"index$":0}]}, 'Pokemon', {"GET /pokemons":{"protocol":"http","operationId":"getPokemons","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the pokemon","example":1,"key$":"id"},"name":{"type":"string","description":"Name of the pokemon","example":"Bulbasaur","key$":"name"},"type":{"type":"array","items":{"type":"string"},"description":"Types of the pokemon","example":["Grass","Poison"],"key$":"type"},"stats":{"type":"object","description":"Stats of the pokemon","properties":{"hp":{"type":"integer","example":45},"attack":{"type":"integer","example":49},"defense":{"type":"integer","example":49}},"key$":"stats"}},"x-ref":"#/components/schemas/Pokemon","index$":0}}}}}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of pokemons to return","required":false,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
