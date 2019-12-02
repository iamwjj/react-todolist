import React from 'react';
import './App.css';
import filter from './filter'

function TodoList(props) {
  const todos = props.todos
  let list = todos.map((todo, index) => {
    return <li className={todo.completed ? 'completed': ''} key={index}>
      <div className="view">
        <input id={'toggle' + index} className="toggle" type="checkbox" checked={todo.completed} onChange={(e) => { props.handleItemClick(todo, e) }} />
        <label htmlFor={'toggle' + index}>{todo.text}</label>
        <button className="destroy" onClick={() => { props.removeTodo(todo) }}></button>
      </div>
    </li>
  })
  return (
    <ul className="todo-list">{list}</ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          text: '吃饭',
          completed: false
        }
      ],
      visibility: 'all'
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange',() => {
      let hash = window.location.hash;
      let visibility = hash.replace(/#\/?/,'');
      this.setState({
        visibility
      })
      
    })
  }

  addNewTodo = (e) => {
    if(e.keyCode === 13) {  // 回车
      let todo = {
        text: e.target.value,
        completed: false
      }
      e.target.value = ''
      let todos = [...this.state.todos, todo]
      this.setState({
        todos
      })
    }
  }

  updateStatus = (todo, e) => {
    let status = e.target.checked
    let todos = this.state.todos
    let index = todos.indexOf(todo)
    todos[index].completed = status
    this.setState({
      todos: todos
    })
  }

  removeTodo = (todo) => {
    let todos = this.state.todos
    let index = todos.indexOf(todo)
    todos.splice(index, 1)
    this.setState({
      todos
    })
  }

  clearCompleted = () => {
    let todos = this.state.todos.filter(todo => {
      return !todo.completed
    })
    this.setState({
      todos
    })
  }

  get remaining() {
    return this.state.todos.filter(item => {
      return !item.completed
    }).length
  }

  render() {
    return (
      <div id="todoapp">
        <header className="header">
          <h1 className="title">todos</h1>
          <input type="text" className="new-todo" autoFocus autoComplete="false" placeholder="what needs to be done?" onKeyUp={this.addNewTodo} />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <TodoList todos={filter[this.state.visibility](this.state.todos)} handleItemClick={this.updateStatus} removeTodo={this.removeTodo}></TodoList>
        </section>
        <section className="footer">
          <span className="todo-count">
            <strong>{this.remaining}</strong> {this.remaining > 1 ? 'items' : 'item'} left
          </span>
          <ul className="filters">
            <li><a href="#/all" className={this.state.visibility === 'all' ? 'selected' : ''}>All</a></li>
            <li><a href="#/active" className={this.state.visibility === 'active' ? 'selected' : ''}>Active</a></li>
            <li><a href="#/completed" className={this.state.visibility === 'completed' ? 'selected' : ''}>Completed</a></li>
          </ul>
          <button className="clear-completed" onClick={this.clearCompleted}>
            Clear Completed
          </button>
        </section>
      </div>
    )
  }
}

export default App;
