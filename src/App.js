import { Component } from "react";
import Task from "./components/Task.js";
import "./App.scss";


export default class App extends Component {

  state = {
    tasks: [],
    inputName: ""
  };

  changeInputName(value) {
    this.setState({
      inputName: value
    });
  }

  addTask() {
    const newTask = {
      id: Date.now(),
      name: this.state.inputName
    }
    const copyTasks = [...this.state.tasks];
    copyTasks.push(newTask);

    this.setState({
      tasks: copyTasks,
      inputName: ""
    })
  }

  deleteTask(index) {
    const selectedTask = { ...this.state.tasks};
    selectedTask.splice(index,1)

    this.setState({
      selectedTask
  });

  }

  render() {
    const listTasks = this.state.tasks.map((task) => {
      return (
        <Task name={task.name} key={task.id} />
      )
    });

    return (
      <div className="container">
        <div className="main"><h1>Taskinator</h1>
          <input type="text" value={this.state.inputName} onChange={(e) => this.changeInputName(e.target.value)} />
          <button onClick={() => this.addTask()}>Ajouter</button>
          <h2>Mes tâches</h2>
          <ul>
            {listTasks}<input type="button" value="Supprimer" />
          </ul>
        </div></div>
    )


  }
}