import { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Отчислиться'),
      this.createTodoItem('Устроиться на работу'),
      this.createTodoItem('Уволиться'),
      this.createTodoItem('Вернуться в уник'),
    ],
    filter: 'all',
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  editTaskDesc = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      const newItem = this.createTodoItem(text)

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  newTask = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text)

      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  onToogleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }))
  }

  onToogleEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }))
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompteled = (tasks) => {
    tasks.forEach((element) => this.deleteItem(element.id))
  }

  filter = (items, filter) => {
    switch (filter) {
    case 'all':
      return items
    case 'active':
      return items.filter((item) => !item.completed)
    case 'completed':
      return items.filter((item) => item.completed)
    default:
      return items
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => id === el.id)

    const oldItem = arr[idx]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  createTodoItem(description) {
    return {
      description,
      completed: false,
      editing: false,
      created: Date.now(),
      id: this.maxId++,
    }
  }

  render() {
    const { todoData, filter } = this.state
    const completedTasks = todoData.filter((el) => (el.completed ? el : false))
    const activeTasksCount = todoData.length - completedTasks.length
    const visibleItems = this.filter(todoData, filter)

    return (
      <div>
        <header className="header">
          <h1>План по захвату мира:</h1>
          <NewTaskForm class="new-todo" onNewTaskAdd={this.newTask} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToogleCompleted={this.onToogleCompleted}
            onToogleEditing={this.onToogleEditing}
            editTaskDesc={this.editTaskDesc}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            activeTasksCount={activeTasksCount}
            completedTasks={completedTasks}
            clearCompteled={this.clearCompteled}
          />
        </section>
      </div>
    )
  }
}
