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

  //Ajout d'une tâche (avec nbre de carac min de 5, max de 75)

  addTask() {
    const minlength = 5;
    const maxlength = 75;
    const { inputName } = this.state;

    if (this.state.inputName.length >= minlength && this.state.inputName.length <= maxlength) {
      const newTask = {
        id: Date.now(),
        name: this.state.inputName
      };

      const copyTasks = [...this.state.tasks];
      copyTasks.push(newTask);

      this.setState({
        tasks: copyTasks,
        inputName: ""
      });
    } else if (inputName.length < minlength) {
      alert(`Merci d'entrer au minimum 5 caractères.`);
    } else {
      alert(`Vous ne pouvez pas entrer plus de 75 caractère.`);
    }
  }

  // suppression d'une tâche (nécessite un état checked, voir plus bas checkbox)
  deleteTask() {
    const copyTasks = [...this.state.tasks];
    const tasksToDelete = copyTasks.filter(task => task.checked);

    if(tasksToDelete.length > 0) {
        const updatedTasks = copyTasks.filter(task => !task.checked);

        this.setState({
          tasks: updatedTasks
        });
    } else {
      alert("Veuillez cocher au moins une case afin de valider la suppression.");
    }
  }

  // tout supprimer 
  deleteAll() {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches?");
    if (confirmDelete) {
      this.setState({
        tasks: []
      });
    }
  }

// checkbox à valider afin de supprimer individuellement les tâches
  checkBoxDelete(index) {
    const copyTasks = [...this.state.tasks];
    copyTasks[index].checked = !copyTasks[index].checked;

    this.setState({
      tasks: copyTasks
    });
  }

  // Permet d'indiquer la limite du nbre de caractères
  charactersCounter() {
    const MeterValue = document.getElementById("myMeter");
    const myInput = document.getElementById("mainInput");
    const counterPlace = document.getElementById("counterPlace");
    const maxCharacters = 75;

    let remainingCharacters = maxCharacters - myInput.value.length;

    remainingCharacters = Math.max(0, remainingCharacters);

    MeterValue.setAttribute("value", myInput.value.length);
    counterPlace.innerHTML = `Limite de caractères: ${remainingCharacters}`;
  }

  render() {
    const listTasks = this.state.tasks.map((task, index) => {
      return (
        <Task
          name={task.name}
          key={task.id}
          checked={task.checked}
          action={() => this.checkBoxDelete(index)}
          deleteAction={() => this.deleteTask(index)}
        />
      );
    });


    return (
      <div class="container">
        <div class="title"><img id="brain" src="/brain.png" alt="brain" /><h1>Taskinator</h1><img id="robot" src="/robot.png" alt="brain" /><div class="hr"></div></div>
        <div class="form">
          <div id="counter"><meter id="myMeter" min="0" max="75" low="25" high="66" optimum="80"></meter>
            <h3 id="counterPlace"></h3></div>
          <input
            id="mainInput"
            type="text"
            value={this.state.inputName}
            onChange={(e) => {
              this.changeInputName(e.target.value);
              this.charactersCounter();
            }}
            //Permet d'entrer la tâche en appuyant sur entrée
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.addTask();
              }
            }}
          />
          <button id="add" onClick={() => this.addTask()}>Ajouter</button>
          <button id="deleteAll" onClick={() => this.deleteAll()}>Supprimer toutes les tâches</button></div>
        <div class="render">
          <h2>Mes tâches</h2></div>
        <ul class="list">
          {listTasks}
        </ul>
      </div>
    )


  }
}