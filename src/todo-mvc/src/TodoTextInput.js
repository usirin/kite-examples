import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = { text: this.props.text || '' }
  }

  onKeyDown(event) {
    const text = event.target.value.trim()
    if (event.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  onChange(event) {
    this.setState({ text: event.target.value })
  }

  onBlur(event) {
    if (!this.props.newTodo) {
      this.props.onSave(event.target.value)
    }
  }

  render() {
    return (
      <input
        className={cx({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.onBlur.bind(this)}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      />
    )
  }
}
