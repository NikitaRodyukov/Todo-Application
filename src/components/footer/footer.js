/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

function Footer({ activeTasksCount, completedTasks, clearCompteled, ...filterProps }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${activeTasksCount} осталось сделать`}</span>
      <TasksFilter {...filterProps} />
      <button type="button" className="clear-completed" onClick={() => clearCompteled(completedTasks)}>
        Удалить выполненные
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

export default Footer
