import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  onDoubleClick() {
    this.setState({ editing: true })
  }

  onSave(id, text) {
    if (text.length === 0) {
      this.props.onDelete(id)
    } else {
      this.props.onEdit(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, onToggle, onDelete } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.onSave.bind(this, todo.id)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label onDoubleClick={this.onDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => onDelete(todo.id)} />
        </div>
      )
    }

    return (
      <li
        className={cx({
          completed: todo.completed,
          editing: this.state.editing,
        })}>
        {element}
      </li>
    )
  }
}
