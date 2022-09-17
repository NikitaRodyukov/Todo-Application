import { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { label } = this.props

    e.preventDefault()
    this.onNewTaskAdd(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { clazz } = this.props
    const { label } = this.state

    return (
      <form action="" onSubmit={this.onSubmit}>
        <input
          className={clazz}
          placeholder="Здесь пишем название задачи"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    )
  }
}
