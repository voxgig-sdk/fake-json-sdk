

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


describe('BookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FAKE_JSON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FAKE_JSON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FakeJsonSDK.test()
    const ent = testsdk.Book()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FAKE_JSON_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":false,"sh":"Author of the book","t":"`$STRING`","key$":"author","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the book","t":"`$INTEGER`","key$":"id","index$":1},"isbn":{"a":true,"h":"Isbn","n":"isbn","r":false,"sh":"ISBN of the book","t":"`$STRING`","key$":"isbn","index$":2},"publicationYear":{"a":true,"h":"Publication Year","n":"publicationYear","r":false,"sh":"Year of publication","t":"`$INTEGER`","key$":"publicationYear","index$":3},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the book","t":"`$STRING`","key$":"title","index$":4}},"id":{"field":"id","name":"id"},"name":"book","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /books","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/books","q":{},"r":{},"s":[{"lit":"books"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /books","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/books","q":{"exist":["limit"]},"r":{},"s":[{"lit":"books"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /books/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":23,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/books/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"books"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /books/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":23,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/books/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"books"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /books/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":23,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/books/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"books"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /books/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":23,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/books/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"books"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"book","name__orig":"book","Name":"Book","name_":"book","name-":"book","NAME":"BOOK","index$":0}, {"active":true,"entity":"book","key$":"BasicBookFlow","kind":"basic","name":"BasicBookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"book_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"book_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"book_ref01","srcdatavar":"book_ref01_data","suffix":"_up0","textfield":"author"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-book_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"book_ref01","srcdatavar":"book_ref01_data","suffix":"_dt0"},"m":{"id":"book01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-book_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"book_ref01","suffix":"_rm0"},"m":{"id":"book01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"book_ref01"}}],"index$":5}]}, 'Book', {"POST /books":{"protocol":"http","operationId":"createBook","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/BookInput","index$":1}}}},"responses":{"201":{"description":"Book created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the book","example":1,"key$":"id"},"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/Book"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /books":{"protocol":"http","operationId":"getBooks","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the book","example":1,"key$":"id"},"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/Book","index$":0}}}}}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of books to return","required":false,"schema":{"type":"integer","example":20},"index$":0}],"securitySource":"unspecified"},"GET /books/{id}":{"protocol":"http","operationId":"getBookById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the book","example":1,"key$":"id"},"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/Book","index$":0}}}},"404":{"description":"Book not found"}},"parameters":[{"name":"id","in":"path","description":"ID of the book to retrieve","required":true,"schema":{"type":"integer","example":23},"index$":0}],"securitySource":"unspecified"},"PATCH /books/{id}":{"protocol":"http","operationId":"patchBook","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/BookInput","index$":1}}}},"responses":{"200":{"description":"Book updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the book","example":1,"key$":"id"},"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/Book","index$":0}}}},"404":{"description":"Book not found"}},"parameters":[{"name":"id","in":"path","description":"ID of the book to update","required":true,"schema":{"type":"integer","example":23},"index$":0}],"securitySource":"unspecified"},"DELETE /books/{id}":{"protocol":"http","operationId":"deleteBook","responses":{"200":{"description":"Book deleted successfully"},"404":{"description":"Book not found"}},"parameters":[{"name":"id","in":"path","description":"ID of the book to delete","required":true,"schema":{"type":"integer","example":23},"index$":0}],"securitySource":"unspecified"},"PUT /books/{id}":{"protocol":"http","operationId":"updateBook","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/BookInput","index$":1}}}},"responses":{"200":{"description":"Book updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the book","example":1,"key$":"id"},"title":{"type":"string","description":"Title of the book","example":"The Great Gatsby","key$":"title"},"author":{"type":"string","description":"Author of the book","example":"F. Scott Fitzgerald","key$":"author"},"isbn":{"type":"string","description":"ISBN of the book","example":"978-0-7432-7356-5","key$":"isbn"},"publicationYear":{"type":"integer","description":"Year of publication","example":1925,"key$":"publicationYear"}},"x-ref":"#/components/schemas/Book","index$":0}}}},"404":{"description":"Book not found"}},"parameters":[{"name":"id","in":"path","description":"ID of the book to update","required":true,"schema":{"type":"integer","example":23},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const book_ref01_ent = client.Book()
    let book_ref01_data = setup.data.new.book['book_ref01']

    book_ref01_data = (await book_ref01_ent.create(book_ref01_data)).data()
    assert(null != book_ref01_data.id)


    // LIST
    const book_ref01_match: any = {}

    const book_ref01_list = (await book_ref01_ent.list(book_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(book_ref01_list, { id: book_ref01_data.id })))


    // UPDATE
    const book_ref01_data_up0: any = {}
    book_ref01_data_up0.id = book_ref01_data.id

    const book_ref01_markdef_up0 = { name: 'author', value: 'Mark01-book_ref01_' + setup.now }
    ;(book_ref01_data_up0 as any)[book_ref01_markdef_up0.name] = book_ref01_markdef_up0.value

    const book_ref01_resdata_up0 = (await book_ref01_ent.update(book_ref01_data_up0)).data()
    assert(book_ref01_resdata_up0.id === book_ref01_data_up0.id)

    assert((book_ref01_resdata_up0 as any)[book_ref01_markdef_up0.name] === book_ref01_markdef_up0.value)


    // LOAD
    const book_ref01_match_dt0: any = {}
    book_ref01_match_dt0.id = book_ref01_data.id
    const book_ref01_data_dt0 = (await book_ref01_ent.load(book_ref01_match_dt0)).data()
    assert(book_ref01_data_dt0.id === book_ref01_data.id)


    // REMOVE
    const book_ref01_match_rm0: any = { id: book_ref01_data.id }
    await book_ref01_ent.remove(book_ref01_match_rm0)
  

    // LIST
    const book_ref01_match_rt0: any = {}

    const book_ref01_list_rt0 = (await book_ref01_ent.list(book_ref01_match_rt0)).map((e: any) => e.data())

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

  const env = envOverride({
    'FAKE_JSON_TEST_BOOK_ENTID': idmap,
    'FAKE_JSON_TEST_LIVE': 'FALSE',
    'FAKE_JSON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FAKE_JSON_TEST_BOOK_ENTID']

  const live = 'TRUE' === env.FAKE_JSON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FAKE_JSON_TEST_BOOK_ENTID']
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
  
