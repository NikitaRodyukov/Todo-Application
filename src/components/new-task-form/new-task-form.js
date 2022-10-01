/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: this.props.description,
    min: '',
    sec: '',
  }

  updateLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  updateMin = (e) => {
    if (isNaN(parseInt(e.target.value, 10))) return
    this.setState({ min: parseInt(e.target.value, 10) })
  }

  updateSec = (e) => {
    if (isNaN(parseInt(e.target.value, 10))) return
    this.setState({ sec: e.target.value })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      const { clazz, onNewTaskAdd } = this.props
      const { label, min, sec } = this.state

      e.preventDefault()
      if (clazz === 'edit') {
        const { id, editTaskDesc } = this.props
        editTaskDesc(id, label)
      } else {
        onNewTaskAdd(label, min, sec)
      }

      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { clazz, description } = this.props
    const { label, min, sec } = this.state
    const isEditing = clazz === 'edit'

    return (
      <form onKeyDown={this.onSubmit} className="new-todo-form">
        {!isEditing ? (
          <input className={clazz} placeholder="What needs to be done?" onChange={this.updateLabel} value={label} />
        ) : (
          <input className={clazz} onChange={this.updateLabel} defaultValue={description} />
        )}
        {!isEditing && (
          <>
            <input className="new-todo-form__timer min" placeholder="Min" onChange={this.updateMin} value={min} />
            <input className="new-todo-form__timer sec" placeholder="Sec" onChange={this.updateSec} value={sec} />
          </>
        )}
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  description: '',
  clazz: '',
}

NewTaskForm.propTypes = {
  description: PropTypes.string,
  clazz: PropTypes.string,
}
