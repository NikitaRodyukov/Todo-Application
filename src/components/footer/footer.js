import TasksFilter from '../tasks-filter/tasks-filter'

import './footer.css'

const Footer = ({ activeTasksCount, completedTasks, clearCompteled, ...filterProps }) => {
  
    return (
        <footer className="footer">
          <span className="todo-count">{`${activeTasksCount} items left`}</span>
          <TasksFilter 
          {...filterProps}/>
          <button className="clear-completed"
                  onClick={ () => clearCompteled(completedTasks) }>Clear completed</button>
        </footer>
    )
}

export default Footer