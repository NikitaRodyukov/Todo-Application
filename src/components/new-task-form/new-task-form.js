import { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onKeyDown = (e) => {
    this.setState({
      label: e.target.value,
    })
    if (e.key === 'Enter'){
      e.target.value = ''
    }
  }

  onSubmit = (e) => {
    const { clazz, onNewTaskAdd } = this.props
    const { label } = this.state

    e.preventDefault()
    if (clazz === 'edit') {
      const { id, editTaskDesc } = this.props
      editTaskDesc(id, label)
    } else {
      onNewTaskAdd(label)
    }

    this.setState({
      label: '',
    })
  }

  render() {
    const { clazz, description } = this.props
    const { label } = this.state
    const isEditing = (clazz === 'edit')

    return (
      <form action="" onSubmit={this.onSubmit}>
        <input
          className={clazz}
          placeholder={!isEditing ? 'What needs to be done?' : null}
          onKeyDown={this.onKeyDown}
          defaultValue={isEditing ? description : label }
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  description: '',
  id: NaN,
  clazz: '',
}

NewTaskForm.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number,
  clazz: PropTypes.string,
}