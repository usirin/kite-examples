const { Kite } = require('kite.js')
const WebSocket = require('ws')

const kite = new Kite({
  url: 'ws://localhost:7780',
  autoConnect: false,
  transportClass: WebSocket,
})

kite.on('open', () => {
  kite
    .tell('square', 5)
    .then(res => console.log(`5 * 5 = ${res}`))
    .then(() => kite.tell('square', 9))
    .then(res => console.log(`9 * 9 = ${res}`))
    .then(() => kite.disconnect())
})

kite.connect()
