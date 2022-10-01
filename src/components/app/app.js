/* eslint-disable consistent-return */
import { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('First Task'),
      this.createTodoItem('Second Task'),
      this.createTodoItem('Third Task'),
    ],
    filter: 'all',
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      clearInterval(todoData[idx].interval)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  editTaskDesc = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      const updatedItem = { ...todoData[idx], description: text, editing: false }

      return {
        todoData: [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)],
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
    this.onPause(id)
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

  onPlay = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      const { isTimerActive, sec, min, completed } = todoData[idx]

      if (isTimerActive || completed) return { todoData }

      let { interval } = this.state

      if (!sec && !min) {
        const updatedItem = {
          ...todoData[idx],
          interval: clearInterval(interval),
        }

        return {
          todoData: [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)],
        }
      }

      interval = setInterval(() => this.timeRender(id), 1000)
      const updatedItem = {
        ...todoData[idx],
        isTimerActive: true,
        interval,
      }

      return {
        todoData: [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  onPause = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      const { isTimerActive, interval } = todoData[idx]
      if (!isTimerActive) return { todoData }

      const updatedItem = {
        ...todoData[idx],
        isTimerActive: false,
        interval: clearInterval(interval),
      }

      return {
        todoData: [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  timeRender = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)

      const { sec, min } = todoData[idx]

      if (!sec && !min) {
        this.onPause(id)
        return { todoData }
      }

      let updatedItem = {
        ...todoData[idx],
        sec: sec - 1,
      }

      if (!sec) {
        updatedItem = {
          ...todoData[idx],
          sec: sec + 59,
          min: min - 1,
        }
      }

      return { todoData: [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)] }
    })
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

  createTodoItem(description, min = 5, sec = 0) {
    return {
      description,
      completed: false,
      editing: false,
      created: Date.now(),
      id: this.maxId++,
      min,
      sec,
      isTimerActive: false,
      interval: undefined,
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
            onPlay={this.onPlay}
            onPause={this.onPause}
            timeRender={this.timeRender}
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
