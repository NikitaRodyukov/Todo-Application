import { useState } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

export default function App() {
  const createTodoItem = (description, min = 3, sec = 0) => ({
    description,
    isCompleted: false,
    isEditing: false,
    created: Date.now(),
    id: Math.floor(Math.random() * 1000),
    min,
    sec,
    isTimerActive: false,
    interval: undefined,
  })

  const initialTodos = [createTodoItem('First Task'), createTodoItem('Second Task'), createTodoItem('Third Task')]

  const [todoData, setTodoData] = useState(initialTodos)
  const [filter, setFilter] = useState('all')

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => id === el.id)
    const oldItem = arr[idx]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onPause = (id) =>
    setTodoData((oldTodoData) => {
      const idx = oldTodoData.findIndex((el) => id === el.id)
      const { isTimerActive, interval } = oldTodoData[idx]
      if (!isTimerActive) return oldTodoData

      const updatedItem = {
        ...oldTodoData[idx],
        isTimerActive: false,
        interval: clearInterval(interval),
      }

      return [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)]
    })

  const deleteItem = (id) =>
    setTodoData((oldTodoData) => {
      const idx = oldTodoData.findIndex((el) => id === el.id)
      clearInterval(oldTodoData[idx].interval)

      return [...oldTodoData.slice(0, idx), ...oldTodoData.slice(idx + 1)]
    })

  const editTaskDesc = (id, text) =>
    setTodoData((oldTodoData) => {
      const idx = oldTodoData.findIndex((el) => id === el.id)
      const updatedItem = { ...oldTodoData[idx], description: text, isEditing: false }

      return [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)]
    })

  const newTask = (text, min = 5, sec = 0) => {
    let newMin = Number.isNaN(Number(min)) ? 5 : parseInt(min, 10)
    let newSec = Number.isNaN(Number(sec)) ? 0 : parseInt(sec, 10)

    if (newSec >= 60) {
      newMin = min + Math.floor(newSec / 60)
      newSec -= Math.floor(newSec / 60) * 60
    }

    setTodoData((oldTodoData) => {
      const newItem = createTodoItem(text, newMin, newSec)
      return [...oldTodoData, newItem]
    })
  }

  const onToogleCompleted = (id) => {
    setTodoData((oldTodoData) => toggleProperty(oldTodoData, id, 'isCompleted'))
    onPause(id)
  }

  const onToogleEditing = (id) => {
    setTodoData((oldTodoData) => toggleProperty(oldTodoData, id, 'isEditing'))
  }

  const onFilterChange = (newFilterValue) => {
    setFilter(newFilterValue)
  }

  const clearCompteled = (tasks) => {
    tasks.forEach((element) => deleteItem(element.id))
  }

  const filterItems = (items, filterValue) => {
    switch (filterValue) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.isCompleted)
      case 'isCompleted':
        return items.filter((item) => item.isCompleted)
      default:
        return items
    }
  }

  const timeRender = (id) =>
    setTodoData((oldTodoData) => {
      const idx = oldTodoData.findIndex((el) => id === el.id)
      const { sec, min } = oldTodoData[idx]

      if (!sec && !min) {
        onPause(id)
        return oldTodoData
      }

      let updatedItem = {
        ...oldTodoData[idx],
        sec: sec - 1,
      }

      if (!sec) {
        updatedItem = {
          ...oldTodoData[idx],
          sec: sec + 59,
          min: min - 1,
        }
      }

      return [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)]
    })

  const onPlay = (id) =>
    setTodoData((oldTodoData) => {
      const idx = oldTodoData.findIndex((el) => id === el.id)
      const { isTimerActive, sec, min, isCompleted } = oldTodoData[idx]
      let { interval } = oldTodoData[idx]

      if (isTimerActive || isCompleted) return oldTodoData

      if (!sec && !min) {
        const updatedItem = {
          ...oldTodoData[idx],
          interval: clearInterval(interval),
        }

        return [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)]
      }

      interval = setInterval(() => timeRender(id), 1000)
      const updatedItem = {
        ...oldTodoData[idx],
        isTimerActive: true,
        interval,
      }

      return [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)]
    })

  const completedTasks = todoData.filter((el) => (el.isCompleted ? el : false))
  const activeTasksCount = todoData.length - completedTasks.length
  const visibleItems = filterItems(todoData, filter)

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm clazz="new-todo" onNewTaskAdd={newTask} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToogleCompleted={onToogleCompleted}
          onToogleEditing={onToogleEditing}
          editTaskDesc={editTaskDesc}
          onPlay={onPlay}
          onPause={onPause}
        />
        <Footer
          filter={filter}
          onFilterChange={onFilterChange}
          activeTasksCount={activeTasksCount}
          completedTasks={completedTasks}
          clearCompteled={clearCompteled}
        />
      </section>
    </>
  )
}
