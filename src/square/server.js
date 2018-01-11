const { KiteServer } = require('kite.js')
const WebSocketServer = require('kite.js/lib/server/websocket')

const server = new KiteServer({
  name: 'math',
  auth: false,
  serverClass: WebSocketServer,
  api: {
    square: function(x, callback) {
      callback(null, x * x)
    },
  },
})

server.listen(7780)
