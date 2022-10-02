/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { useMemo } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'

export default function Task({
  onDeleted,
  onToogleCompleted,
  created,
  completed,
  onToogleEditing,
  editTaskDesc,
  editing,
  id,
  description,
  onPlay,
  onPause,
  sec,
  min,
}) {
  const formatTime = (time) => time.toString().padStart(2, '0')

  const createdFrom = formatDistanceToNowStrict(created, {
    includeSeconds: true,
  })

  const currentTime = `${formatTime(min)}:${formatTime(sec)}`
  let classNames = ''

  if (editing) {
    classNames = 'editing'
  }

  if (completed) {
    classNames = 'completed'
  }
  return useMemo(
    () => (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToogleCompleted} defaultChecked={completed} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={onPlay} />
              <button type="button" className="icon icon-pause" onClick={onPause} />
              {currentTime}
            </span>
            <span className="description">{createdFrom}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onToogleEditing} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? <NewTaskForm clazz="edit" editTaskDesc={editTaskDesc} description={description} id={id} /> : null}
      </li>
    ),
    [completed, editing, description, sec, min]
  )
}

Task.defaultProps = {
  onDeleted: () => {},
  onToogleCompleted: () => {},
  completed: false,
  onToogleEditing: () => {},
  editTaskDesc: () => {},
  editing: false,
  id: 0,
  description: '',
  onPlay: () => {},
  onPause: () => {},
  sec: 0,
  min: 0,
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToogleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  onToogleEditing: PropTypes.func,
  editTaskDesc: PropTypes.func,
  editing: PropTypes.bool,
  id: PropTypes.number,
  description: PropTypes.string,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  sec: PropTypes.number,
  min: PropTypes.number,
}
