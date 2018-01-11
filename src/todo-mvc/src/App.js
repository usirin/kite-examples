import React, { Component } from 'react'
import Header from './Header'
import MainSection from './MainSection'
// import { Kite } from 'kite.js'

const toArray = thing => Object.keys(thing).map(key => thing[key])

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }

    this.kite = new global.Kite({
      url: 'ws://localhost:7780',
      autoConnect: false,
    })
  }

  componentDidMount() {
    this.kite.on('open', () => {
      this.kite.tell('getTodos', []).then(todos => {
        console.log({ todos: toArray(todos) })
        this.setState({ todos: toArray(todos) })
      })
    })

    this.kite.connect()
  }

  onAdd(text) {
    this.kite.tell('addTodo', [text]).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  onDelete(id) {
    this.kite.tell('deleteTodo', [id]).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  onEdit(id, text) {
    this.kite.tell('editTodo', [id, text]).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  onToggle(id) {
    this.kite.tell('toggleTodo', [id]).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  onCompleteAll() {
    this.kite.tell('completeAll', []).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  onClearCompleted() {
    this.kite.tell('clearCompleted', []).then(todos => {
      this.setState({ todos: toArray(todos) })
    })
  }

  render() {
    return (
      <div className="todoapp">
        <Header onAdd={this.onAdd.bind(this)} />
        <MainSection
          todos={this.state.todos}
          onDelete={this.onDelete.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onToggle={this.onToggle.bind(this)}
          onCompleteAll={this.onCompleteAll.bind(this)}
          onClearCompleted={this.onClearCompleted.bind(this)}
        />
      </div>
    )
  }
}
