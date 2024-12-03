import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTasks, updateTasks } from "../../reducer/reducer";
import "./ToDoContainer.css";
import Task from "../Task/Task";
import axios from "../../axiosURL";

export default function ToDoContainer() {
  const todos = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  });

  const moveRight = (taskId) => {
    const taskIndex = todos.findIndex((v) => v._id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = true;

    axios
      .put("/task", { ...task }, { withCredentials: true })
      .then(() => dispatch(updateTasks({ completed: true, _id: taskId })))
      .catch((err) => console.error(err));
  };

  const moveLeft = (taskId) => {
    const taskIndex = todos.findIndex((v) => v._id == taskId);
    const task = { ...todos[taskIndex] };
    task.completed = false;

    axios
      .put("/task", { ...task }, { withCredentials: true })
      .then(() => dispatch(updateTasks({ completed: false, _id: taskId })))
      .catch((err) => console.error(err));
  };

  const deleteToDo = (taskId) => {
    axios
      .delete("/task/" + taskId, { withCredentials: true })
      .then(() => dispatch(loadTasks()))
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
