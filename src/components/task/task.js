/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types'
import { Component } from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import NewTaskForm from '../new-task-form/new-task-form'

export default class Task extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    isTimerActive: this.props.isTimerActive,
    interval: undefined,
  }

  componentWillUnmount() {
    const { interval } = this.state

    this.setState({
      interval: clearInterval(interval),
    })
  }

  onPlay = () => {
    if (this.state.isTimerActive) return
    this.setState({ isTimerActive: true })

    const { sec, min } = this.state
    let { interval } = this.state

    if (!sec && !min) {
      this.setState({
        interval: clearInterval(interval),
      })
    }

    interval = setInterval(this.timeRender, 1000)
    this.setState({
      interval,
    })
  }

  onPause = () => {
    const { isTimerActive, interval } = this.state

    if (!isTimerActive) return
    this.setState({ isTimerActive: false })

    this.setState({
      interval: clearInterval(interval),
    })
  }

  timeRender = () => {
    const { sec, min } = this.state

    if (!sec && !min) {
      this.onPause()
      return
    }

    this.setState(() => {
      let newSec = sec - 1

      if (!sec) {
        const newMin = min - 1
        newSec += 60
        return { sec: newSec, min: newMin }
      }

      return { sec: newSec, min }
    })
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
    } = this.props

    const { min, sec } = this.state
    const createdFrom = formatDistanceToNowStrict(created, {
      includeSeconds: true,
    })

    const currentTime = `${this.formatTime(min)}:${this.formatTime(sec)}`
    let classNames = ''

    if (editing) {
      classNames = ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToogleCompleted} defaultChecked={completed} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.onPlay} />
              <button type="button" className="icon icon-pause" onClick={this.onPause} />
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
