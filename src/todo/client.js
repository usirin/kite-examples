const { Kite } = require('kite.js')
const WebSocket = require('ws')

const kite = new Kite({
  url: 'ws://localhost:7780',
  autoConnect: false,
  transportClass: WebSocket,
})

kite.on('open', () => {
  global.kite = kite
  require('repl').start({})
})

kite.connect()
