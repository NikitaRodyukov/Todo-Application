import PropTypes from 'prop-types'

import Task from '../task/task'

function TaskList({ todos, onDeleted, onToogleCompleted, onToogleEditing, editTaskDesc }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={id}
        id={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToogleCompleted={() => onToogleCompleted(id)}
        onToogleEditing={() => onToogleEditing(id)}
        editTaskDesc={editTaskDesc}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToogleCompleted: () => {},
  onToogleEditing: () => {},
  editTaskDesc: () => {},
}

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToogleCompleted: PropTypes.func,
  onToogleEditing: PropTypes.func,
  editTaskDesc: PropTypes.func,
}
