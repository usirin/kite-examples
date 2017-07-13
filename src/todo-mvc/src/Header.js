import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  }

  onSave(text) {
    if (text.length !== 0) {
      this.props.onAdd(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.onSave.bind(this)}
          placeholder="What needs to be done?"
        />
      </header>
    )
  }
}
