import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed,
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onCompleteAll: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: 'SHOW_ALL',
    }
  }

  renderToggleAll(completedCount) {
    const { todos, onCompleteAll } = this.props
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={onCompleteAll}
        />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.props.onClearCompleted}
          onShow={filter => this.setState({ filter })}
        />
      )
    }
  }

  render() {
    const { todos, onEdit, onDelete, onToggle } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count
    }, 0)

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
