import { Component } from "react";
import Task from "../task/task";
import PropTypes from "prop-types";
import "./task-list.css";

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  };

  PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const {
      todos,
      onDeleted,
      onToogleCompleted,
      onToogleEditing,
      editTaskDesc,
    } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;

      return (
        <Task
          key={id}
          id={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToogleCompleted={() => onToogleCompleted(id)}
          onToogleEditing={() => onToogleEditing(id)}
          editTaskDesc={editTaskDesc}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
