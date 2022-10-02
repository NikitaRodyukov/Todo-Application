/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ id, description, clazz, editTaskDesc, onNewTaskAdd }) {
  const [label, setLabel] = useState(description)
  const [sec, setSec] = useState('')
  const [min, setMin] = useState('')

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (clazz === 'edit') {
        editTaskDesc(id, label)
      } else {
        onNewTaskAdd(label, min, sec)
      }

      setLabel('')
      setMin('')
      setSec('')
    }
  }

  const isEditing = clazz === 'edit'

  return (
    <form onKeyDown={onSubmit} className="new-todo-form">
      {!isEditing ? (
        <input
          className={clazz}
          placeholder="What needs to be done?"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        />
      ) : (
        <input className={clazz} onChange={(e) => setLabel(e.target.value)} defaultValue={description} />
      )}
      {!isEditing && (
        <>
          <input
            className="new-todo-form__timer min"
            placeholder="Min"
            onChange={(e) => setMin(e.target.value)}
            value={min}
          />
          <input
            className="new-todo-form__timer sec"
            placeholder="Sec"
            onChange={(e) => setSec(e.target.value)}
            value={sec}
          />
        </>
      )}
    </form>
  )
}

NewTaskForm.defaultProps = {
  id: 0,
  description: '',
  clazz: '',
  editTaskDesc: () => {},
  onNewTaskAdd: () => {},
}

NewTaskForm.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  clazz: PropTypes.string,
  editTaskDesc: PropTypes.func,
  onNewTaskAdd: PropTypes.func,
}
