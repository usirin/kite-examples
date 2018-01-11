const expect = require('expect')
const { Kite, KiteServer } = require('kite.js')
const { DebugLevel } = require('kite.js/lib/constants')

const api = require('./memory-api')

const logLevel = DebugLevel.CRITICAL

describe('storage memory api', () => {
  let server = null
  let kite = null

  before(done => {
    server = new KiteServer({
      name: 'storage/memory',
      auth: false,
      api,
      logLevel,
    })
    server.listen(9999)

    kite = new Kite({
      url: 'ws://localhost:9999',
      autoConnect: false,
      logLevel,
    })

    kite.on('open', () => {
      done()
    })

    kite.connect()
  })

  after(() => {
    server.close()
    server = null

    kite.disconnect()
    kite = null
  })

  it('sets', done => {
    kite
      .tell('set', ['foo', 'bar'])
      .then(res => expect(res).toEqual({ foo: 'bar' }))
      .then(() => kite.tell('set', ['baz', 'qux']))
      .then(res => expect(res).toEqual({ foo: 'bar', baz: 'qux' }))
      .then(() => done())
      .catch(err => done(err))
  })

  it('gets', done => {
    kite
      .tell('get', ['foo'])
      .then(res => expect(res).toEqual('bar'))
      .then(() => done())
      .catch(err => done(err))
  })

  it('checks if it has', done => {
    kite
      .tell('has', ['foo'])
      .then(res => expect(res).toEqual(true))
      .then(() => kite.tell('has', ['bar']))
      .then(res => expect(res).toEqual(false))
      .then(() => done())
      .catch(err => done(err))
  })

  it('returns entries', done => {
    kite
      .tell('entries', [])
      .then(res => expect(res).toEqual([['foo', 'bar'], ['baz', 'qux']]))
      .then(() => done())
      .catch(err => done(err))
  })

  it('deletes', done => {
    kite
      .tell('delete', ['foo'])
      .then(res => expect(res).toEqual({ baz: 'qux' }))
      .then(() => done())
      .catch(err => done(err))
  })

  it('clears', done => {
    kite
      .tell('clear', [])
      .then(res => expect(res).toEqual({}))
      .then(() => done())
      .catch(err => done(err))
  })
})
