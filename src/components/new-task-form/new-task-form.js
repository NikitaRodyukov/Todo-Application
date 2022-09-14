import { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component{
    state = {
        label: ''
    }
    onLabelChange = (e) => {
        this.setState ( {
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onNewTaskAdd(this.state.label)
        this.setState( {
            label: ''
        })
    }

    render() {
        return (
            <form action=""
                  onSubmit={ this.onSubmit }>
                <input  className="new-todo" 
                        placeholder="What needs to be done?" 
                        onChange={ this.onLabelChange }
                        value= { this.state.label }
                        autoFocus />
            </form>
        )
    }
}