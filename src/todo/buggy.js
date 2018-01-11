const { KiteServer } = require('kite.js')
const WebSocketServer = require('kite.js/lib/server/websocket')

let todos = {}

let id = 0
const generateId = () => id++

const server = new KiteServer({
  name: 'todo',
  auth: false,
  serverClass: WebSocketServer,
  api: {
    getTodos(done) {
      done(null, todos)
    },
    addTodo(text, done) {
      const id = generateId()
      todos = Object.assign({}, todos, {
        [id]: { id, text, completed: false },
      })
      done(null, todos)
    },
  },
})

server.listen(7780)
