const { KiteServer } = require('kite.js')
const WebSocketServer = require('kite.js/lib/server/websocket')

let todos = {}

let id = 0
const generateId = () => id++

const server = new KiteServer({
  name: 'todo-mvc',
  auth: false,
  serverClass: WebSocketServer,
  api: {
    getTodos(done) {
      done(null, todos)
    },
    addTodo(text, done) {
      const id = generateId()
      todos[id] = {
        id,
        text,
        completed: false,
      }
      done(null, todos) // no error
    },
    deleteTodo(id, done) {
      delete todos[id]
      done(null, todos)
    },
    editTodo(id, text, done) {
      console.log({ id, text })
      todos[id] = Object.assign({}, todos[id], { text })
      done(null, todos)
    },
    toggleTodo(id, done) {
      const todo = todos[id]
      todos[id] = Object.assign({}, todo, { completed: !todo.completed })
      done(null, todos)
    },
    // completeTodo(id, done) {
    //   todos[id] = Object.assign({}, todos[id], { completed: true })
    //   done(null, todos)
    // },
    completeAll(done) {
      todos = Object.keys(todos).reduce((acc, key) => {
        const todo = todos[key]
        return Object.assign({}, acc, {
          [todo.id]: Object.assign({}, todo, {
            completed: true,
          }),
        })
      }, {})

      done(null, todos)
    },
    clearCompleted(done) {
      todos = Object.keys(todos).reduce((acc, key) => {
        const todo = todos[key]
        if (todo.completed) {
          return acc
        }

        return Object.assign({}, acc, {
          [todo.id]: todo,
        })
      }, {})

      done(null, todos)
    },
  },
})

server.listen(7780)
