const { Kite } = require('kite.js')
const WebSocket = require('ws')
const SockJs = require('sockjs-client')

let argv = require('minimist')(process.argv.slice(2), {
  default: {
    transport: 'ws', // 'sockjs' for sockjs-client
    hostname: 'localhost',
    port: '7780',
  },
})

console.log({ argv })

const Transport = argv.transport === 'ws'
  ? WebSocket
  : argv.transport === 'sockjs' ? SockJs : null

const scheme = argv.transport === 'ws'
  ? 'ws'
  : argv.transport === 'sockjs' ? 'http' : null

const kite = new Kite({
  url: `${scheme}://${argv.hostname}:${argv.port}`,
  autoConnect: false,
  transportClass: Transport,
})

kite.on('open', () => {
  global.kite = kite
  global.log = console.log.bind(console)
  global.error = console.error.bind(console)

  global.tell = (...args) => kite.tell(...args).then(log).catch(error)

  require('repl').start({})
})

kite.connect()
