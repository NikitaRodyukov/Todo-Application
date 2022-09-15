import { Component } from "react";
import PropTypes from "prop-types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditTaskForm from "../edit-task-form/edit-task-form";
import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    description: "",
    completed: false,
    onDeleted: () => {},
    onToogleCompleted: () => {},
  };

  PropTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
  };

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
    } = this.props;

    let { description } = this.props;

    let classNames = "";

    if (completed) {
      classNames = " completed";
    }

    if (editing) {
      classNames = " editing";
    }

    const createdFrom = formatDistanceToNow(created, {
      includeSeconds: true,
      addSuffix: true,
    });

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToogleCompleted}
            defaultChecked={completed ? true : false}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{createdFrom}</span>
          </label>
          <button className="icon icon-edit" onClick={onToogleEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? (
          <EditTaskForm
            editTaskDesc={editTaskDesc}
            description={description}
            id={id}
          />
        ) : null}
      </li>
    );
  }
}
