const { Kite } = require('kite.js')
const WebSocket = require('ws')

const kite = new Kite({
  url: 'ws://localhost:7780',
  autoConnect: false,
  transportClass: WebSocket,
})

kite.on('open', () => {
  Promise.resolve()
    .then(() => kite.tell('getTodos', []))
    .then(res => console.log({ res }))
    .then(() => kite.tell('addTodo', 'add todo-mvc kite server'))
    .then(res => console.log({ res }))
    .catch(err => console.error({ err }))
  // .finally(() => kite.disconnect())
})

kite.connect()
