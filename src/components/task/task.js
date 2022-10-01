/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types'
import { Component } from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import NewTaskForm from '../new-task-form/new-task-form'

export default class Task extends Component {
  state = {
    sec: this.props.sec,
    min: this.props.min,
  }

  shouldComponentUpdate(nextProps) {
    const { sec, min } = this.state

    if (sec !== nextProps.sec || min !== nextProps.min) {
      return true
    }

    return false
  }

  formatTime = (time) => time.toString().padStart(2, '0')

  render() {
    const {
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
    } = this.props

    const createdFrom = formatDistanceToNowStrict(created, {
      includeSeconds: true,
    })

    const currentTime = `${this.formatTime(min)}:${this.formatTime(sec)}`
    let classNames = ''

    if (editing) {
      classNames = 'editing'
    }

    if (completed) {
      classNames = 'completed'
    }

    return (
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
    )
  }
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
