import { Component } from 'react'
import './edit-task-form.css'

export default class EditTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { id, label, editTaskDesc } = this.props
    e.preventDefault()
    editTaskDesc(id, label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { description } = this.props
    const { label } = this.state

    return (
      <form action="" onSubmit={this.onSubmit}>
        <input className="edit" onChange={this.onLabelChange} defaultValue={description} placeholder={label} />
      </form>
    )
  }
}
