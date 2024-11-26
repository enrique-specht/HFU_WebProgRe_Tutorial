import { useState } from "react";
import "./ToDoContainer.css";
import Task from "../Task/Task";

export default function ToDoContainer() {
  const [todos, setToDos] = useState([
    { id: 1, task: "Putzen", priority: "high", user: "2123", completed: false },
    { id: 2, task: "Lernen", priority: "low", user: "2123", completed: true },
    {
      id: 3,
      task: "Einkaufen",
      priority: "medium",
      user: "2123",
      completed: true,
    },
  ]);

  const moveRight = (taskId) => {
    const taskIndex = todos.findIndex((v) => v.id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = true;
    const copyToDos = [...todos];
    copyToDos[taskIndex] = task;
    setToDos(copyToDos);
  };

  const moveLeft = (taskId) => {
    const taskIndex = todos.findIndex((v) => v.id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = false;
    const copyToDos = [...todos];
    copyToDos[taskIndex] = task;
    setToDos(copyToDos);
  };

  const deleteToDo = (taskId) => {
    const taskIndex = todos.findIndex((v) => v.id == taskId);
    const copyToDos = [...todos];
    copyToDos.splice(taskIndex, 1);
    setToDos(copyToDos);
  };

  const openTaskMap = todos
    .filter((v) => !v.completed)
    .map((value) => (
      <Task
        key={value.id}
        id={value.id}
        task={value.task}
        priority={value.priority}
        completed={value.completed}
        moveRight={moveRight}
        moveLeft={moveLeft}
        deleteToDo={deleteToDo}
      />
    ));

  const completedTaskMap = todos
    .filter((v) => v.completed)
    .map((value) => (
      <Task
        key={value.id}
        id={value.id}
        task={value.task}
        priority={value.priority}
        completed={value.completed}
        moveRight={moveRight}
        moveLeft={moveLeft}
        deleteToDo={deleteToDo}
      />
    ));

  return (
    <div className="ToDoContainer">
      <div className="ToDoContainer__Column">
        <div className="ToDoContainer__Column__Title">ToDo</div>
        <div className="ToDoContainer__Column__Content">{openTaskMap}</div>
      </div>
      <div className="ToDoContainer__Column">
        <div className="ToDoContainer__Column__Title">Done</div>
        <div className="ToDoContainer__Column__Content">{completedTaskMap}</div>
      </div>
    </div>
  );
}
