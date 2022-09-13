import { Component } from 'react'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component{
    state = {
        todoData : [
            {
                description: 'Completed Task', 
                created: 'created 17 seconds ago', 
                id: 24,
            },
            {
                description: 'Editing Task', 
                created: 'created 5 minutes ago', 
                id: 14,
            },
            {
                description: 'Active Task', 
                created: 'created 5 minutes ago', 
                id: 34,
            },
        ]
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

    render () {
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList 
                    todos = { this.state.todoData}
                    onDeleted= { this.deleteItem }/>
                    <Footer />
                </section>
            </div>
        )
    }
}