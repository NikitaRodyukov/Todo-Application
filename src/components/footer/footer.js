import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'

export default function Footer({ activeTasksCount, completedTasks, clearCompteled, ...filterProps }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${activeTasksCount} left to do`}</span>
      <TasksFilter
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...filterProps}
      />
      <button type="button" className="clear-completed" onClick={() => clearCompteled(completedTasks)}>
        Delete completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activeTasksCount: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  completedTasks: PropTypes.arrayOf(PropTypes.object),
  clearCompteled: PropTypes.func,
}

Footer.defaultProps = {
  activeTasksCount: 0,
  completedTasks: [{}],
  clearCompteled: () => {},
}
