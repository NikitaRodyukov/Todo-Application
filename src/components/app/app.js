import { Component } from 'react'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component{
    maxId = 100
    state = {
        todoData : [
            this.createTodoItem('Анджумания: 25'),
            this.createTodoItem('Присундания: 69'),
            this.createTodoItem('А дальше сам думай'),
        ],
        filter: 'all',
    }

    createTodoItem(description) {
        return {
          description,
          created: 'только что брат ago',
          completed: false,
          id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState( ({ todoData }) => {
          const idx = todoData.findIndex( (el) => id === el.id)
    
          const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
          ]
    
          return {
            todoData: newArray
          }
        })
    }

    newTask = (text) => {
        this.setState ( ({todoData}) => {
          const newItem = this.createTodoItem(text)
    
          return {
            todoData: [ ...todoData, newItem]
          }
        })
    }
    
    toggleProperty( arr, id, propName ) {
    const idx = arr.findIndex( (el) => id === el.id)

      const oldItem = arr[idx]
      const newItem = { ...oldItem, [propName]: !oldItem[propName] }

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
    }

    onToogleCompleted = (id) =>  {
    this.setState( ({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed')
      }
    })
    }

    clearCompteled = (tasks) => {
        tasks.forEach( (element) => this.deleteItem(element.id)) 
    }

    filter = (items, filter) => {
        switch(filter){
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

    onFilterChange = (filter) => {
        this.setState({ filter })
    }


    render () {
        const { todoData, filter } = this.state
        const completedTasks  = todoData.filter ( (el) => el.completed ? el : false)
        const activeTasksCount = todoData.length - completedTasks.length
        const visibleItems = this.filter(todoData, filter)
        
        return (
            <div>
                <header className="header">
                    <h1>План по захвату мира:</h1>
                    <NewTaskForm 
                    onNewTaskAdd = { this.newTask } />
                </header>
                <section className="main">
                    <TaskList 
                    todos = { visibleItems }
                    onDeleted= { this.deleteItem }
                    onToogleCompleted= { this.onToogleCompleted }/>
                    <Footer 
                    filter={ filter }
                    onFilterChange={ this.onFilterChange }
                    activeTasksCount={ activeTasksCount }
                    completedTasks={ completedTasks }
                    clearCompteled= { this.clearCompteled }/>
                </section>
            </div>
        )
    }
}