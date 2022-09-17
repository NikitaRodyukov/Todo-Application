/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import EditTaskForm from '../edit-task-form/edit-task-form'
import './task.css'

function Task({
  onDeleted,
  onToogleCompleted,
  created,
  completed,
  onToogleEditing,
  editTaskDesc,
  editing,
  id,
  description,
}) {
  let classNames = ''

  if (completed) {
    classNames = ' completed'
  }

  if (editing) {
    classNames = ' editing'
  }

  const createdFrom = formatDistanceToNow(created, {
    includeSeconds: true,
    addSuffix: true,
  })

  return (
    <li className={classNames}>
      <div className="view">
        <label>
          <input className="toggle" type="checkbox" onClick={onToogleCompleted} defaultChecked={completed} />
          <span className="description">{description}</span>
        </label>
        <span className="created">{createdFrom}</span>
        <button type="button" className="icon icon-edit" onClick={onToogleEditing} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {editing ? <EditTaskForm editTaskDesc={editTaskDesc} description={description} id={id} /> : null}
    </li>
  )
}

Task.defaultProps = {
  description: '',
  completed: false,
  onDeleted: () => {},
  onToogleCompleted: () => {},
}

Task.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToogleCompleted: PropTypes.func,
}

export default Task
