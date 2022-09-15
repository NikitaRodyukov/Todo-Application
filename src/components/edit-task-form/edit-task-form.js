import { Component } from "react";
import "./edit-task-form";

export default class EditTaskForm extends Component {
  state = {
    label: this.props.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editTaskDesc(this.props.id, this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form action="" onSubmit={this.onSubmit}>
        <input
          className="edit"
          onChange={this.onLabelChange}
          defaultValue={this.props.description}
          autoFocus
        />
      </form>
    );
  }
}
