
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { FakeJsonSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('BookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FAKEJSON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FAKEJSON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FakeJsonSDK.test()
    const ent = testsdk.Book()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FAKE_JSON_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set FAKE_JSON_TEST_BOOK_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const book_ref01_ent = client.Book()
    let book_ref01_data = setup.data.new.book['book_ref01']

    book_ref01_data = await book_ref01_ent.create(book_ref01_data)
    assert(null != book_ref01_data.id)


    // LIST
    const book_ref01_match: any = {}

    const book_ref01_list = await book_ref01_ent.list(book_ref01_match)

    assert(!isempty(select(book_ref01_list, { id: book_ref01_data.id })))


    // UPDATE
    const book_ref01_data_up0: any = {}
    book_ref01_data_up0.id = book_ref01_data.id

    const book_ref01_markdef_up0 = { name: 'author', value: 'Mark01-book_ref01_' + setup.now }
    book_ref01_data_up0 [book_ref01_markdef_up0.name] = book_ref01_markdef_up0.value

    const book_ref01_resdata_up0 = await book_ref01_ent.update(book_ref01_data_up0)
    assert(book_ref01_resdata_up0.id === book_ref01_data_up0.id)

    assert(book_ref01_resdata_up0[book_ref01_markdef_up0.name] === book_ref01_markdef_up0.value)


    // LOAD
    const book_ref01_match_dt0: any = {}
    book_ref01_match_dt0.id = book_ref01_data.id
    const book_ref01_data_dt0 = await book_ref01_ent.load(book_ref01_match_dt0)
    assert(book_ref01_data_dt0.id === book_ref01_data.id)


    // REMOVE
    const book_ref01_match_rm0: any = { id: book_ref01_data.id }
    await book_ref01_ent.remove(book_ref01_match_rm0)
  

    // LIST
    const book_ref01_match_rt0: any = {}

    const book_ref01_list_rt0 = await book_ref01_ent.list(book_ref01_match_rt0)

    assert(isempty(select(book_ref01_list_rt0, { id: book_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/book/BookTestData.json')

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
    ['book01','book02','book03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['FAKE_JSON_TEST_BOOK_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'FAKE_JSON_TEST_BOOK_ENTID': idmap,
    'FAKE_JSON_TEST_LIVE': 'FALSE',
    'FAKE_JSON_TEST_EXPLAIN': 'FALSE',
    'FAKE_JSON_APIKEY': 'NONE',
  })

  idmap = env['FAKE_JSON_TEST_BOOK_ENTID']

  const live = 'TRUE' === env.FAKE_JSON_TEST_LIVE

  if (live) {
    client = new FakeJsonSDK(merge([
      {
        apikey: env.FAKE_JSON_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
