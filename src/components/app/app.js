/* eslint-disable indent */
import { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('First Task', 5),
      this.createTodoItem('Second Task', 5),
      this.createTodoItem('Third Task', 5),
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
      const { min, sec } = todoData[idx]
      const newItem = this.createTodoItem(text, min, sec)

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  newTask = (text, min, sec) => {
    let newSec = !(sec === '') ? parseInt(sec, 10) : 0
    let newMin = !(min === '') ? parseInt(min, 10) : 0

    if (newSec >= 60) {
      newMin = min + Math.floor(newSec / 60)
      newSec -= Math.floor(newSec / 60) * 60
    }

    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text, newMin, newSec)
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

  createTodoItem(description, min = 0, sec = 0) {
    return {
      description,
      completed: false,
      editing: false,
      created: Date.now(),
      id: this.maxId++,
      isTimerActive: false,
      min,
      sec,
    }
  }

  render() {
    const { todoData, filter } = this.state
    const completedTasks = todoData.filter((el) => (el.completed ? el : false))
    const activeTasksCount = todoData.length - completedTasks.length
    const visibleItems = this.filter(todoData, filter)

    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm clazz="new-todo" onNewTaskAdd={this.newTask} />
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
      </>
    )
  }
}
