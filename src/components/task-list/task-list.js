import { Component } from 'react'
import Task from '../task/task'

import './task-list.css'

export default class TaskList extends Component {
    render() {
    const {todos, onDeleted} = this.props

    const elements = todos.map ( (item) => {
    const { id, ...itemProps } = item

        return (
            <Task key = { id }
            { ...itemProps } 
            onDeleted ={ () => onDeleted(id) } />)
    })

    return (
        <ul className="todo-list">
            { elements }
        </ul>)
    }
    
}