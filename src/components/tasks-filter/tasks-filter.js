import { Component } from "react";
import PropTypes from "prop-types";
import "./tasks-filter.css";

export default class TasksFilter extends Component {
  static defaultProps = {
    onFilterChange: () => {},
  };

  PropTypes = {
    onFilterChange: PropTypes.func,
  };

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      return (
        <li key={name}>
          <button
            type="button"
            className={isActive ? "selected" : ""}
            onClick={() => onFilterChange(name)}
          >
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
