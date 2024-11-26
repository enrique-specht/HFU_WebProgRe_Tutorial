import { useState, useEffect } from "react";
import "./ToDoContainer.css";
import Task from "../Task/Task";
import axios from "../../axiosURL";

export default function ToDoContainer() {
  const [todos, setToDos] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    axios
      .get("/tasks", { withCredentials: true })
      .then((res) => setToDos(res.data))
      .catch((err) => console.error(err));
  };

  const moveRight = (taskId) => {
    const taskIndex = todos.findIndex((v) => v._id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = true;

    axios
      .put("/task", { ...task }, { withCredentials: true })
      .then(() => getAllTasks())
      .catch((err) => console.error(err));
  };

  const moveLeft = (taskId) => {
    const taskIndex = todos.findIndex((v) => v._id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = false;

    axios
      .put("/task", { ...task }, { withCredentials: true })
      .then(() => getAllTasks())
      .catch((err) => console.error(err));
  };

  const deleteToDo = (taskId) => {
    axios
      .delete("/task/" + taskId, { withCredentials: true })
      .then(() => getAllTasks())
      .catch((err) => console.error(err));
  };

  const openTaskMap = todos
    ?.filter((v) => !v.completed)
    .map((value) => (
      <Task
        key={value._id}
        id={value._id}
        task={value.task}
        priority={value.priority.name}
        completed={value.completed}
        moveRight={moveRight}
        moveLeft={moveLeft}
        deleteToDo={deleteToDo}
      />
    ));

  const completedTaskMap = todos
    ?.filter((v) => v.completed)
    .map((value) => (
      <Task
        key={value._id}
        id={value._id}
        task={value.task}
        priority={value.priority.name}
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
