import TasksFilter from "../tasks-filter/tasks-filter";
import PropTypes from "prop-types";
import "./footer.css";

const Footer = ({
  activeTasksCount,
  completedTasks,
  clearCompteled,
  ...filterProps
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${activeTasksCount} осталось сделать`}</span>
      <TasksFilter {...filterProps} />
      <button
        className="clear-completed"
        onClick={() => clearCompteled(completedTasks)}
      >
        Удалить выполненные
      </button>
    </footer>
  );
};

Footer.propTypes = {
  activeTasksCount: PropTypes.number,
  completedTasks: PropTypes.arrayOf(PropTypes.object),
  clearCompteled: PropTypes.func,
};

export default Footer;
