import "./AddToDo.css";
import { useState, useEffect } from "react";
import axios from "../../axiosURL";

export default function AddToDo() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [allPriorities, setAllPriorities] = useState([]);
  const [newPriority, setNewPriority] = useState("");

  useEffect(() => {
    getAllPriorities();
  }, []);

  const getAllPriorities = () => {
    axios
      .get("/priorities", { withCredentials: true })
      .then((res) => {
        setAllPriorities(res.data);
        setPriority(res.data[0]?._id);
      })
      .catch((err) => console.error(err));
  };

  const onNewPriorityChange = (e) => {
    setNewPriority(e.target.value);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const onSave = () => {
    const taskObj = {
      task: title,
      priority,
      completed: false,
    };

    axios
      .post("/task", taskObj, { withCredentials: true })
      .catch((err) => console.error(err));
  };

  const onSavePriority = () => {
    const priorityObj = {
      name: newPriority,
    };

    axios
      .post("/priority", priorityObj, { withCredentials: true })
      .then(() => getAllPriorities())
      .catch((err) => console.error(err));
  };

  const priorities = allPriorities.map((v) => {
    return (
      <option key={v._id} value={v._id}>
        {v.name}
      </option>
    );
  });

  return (
    <div className="AddToDo">
      <div className="AddToDo__Wrapper">
        <div className="AddToDo__Title">
          <h3>Add Task</h3>
        </div>
        <div className="AddToDo__Inputs">
          <div>
            <label htmlFor="inputTitle">Title:</label>
            <input
              name="inputTitle"
              type="text"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div>
            <label htmlFor="inputPriority">Priority</label>
            <select
              name="inputPriority"
              value={priority}
              onChange={onPriorityChange}
            >
              {priorities}
            </select>
          </div>
        </div>
        <div className="AddToDo__Buttons">
          <button className="AddToDo__Button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
      <div className="AddToDo__Wrapper">
        <div className="AddToDo__Title">
          <h3>Add Priority</h3>
        </div>
        <div className="AddToDo__Inputs">
          <div>
            <label htmlFor="inputNewPriority">Priority:</label>
            <input
              name="inputNewPriority"
              type="text"
              value={newPriority}
              onChange={onNewPriorityChange}
            />
          </div>
        </div>
        <div className="AddToDo__Buttons">
          <button className="AddToDo__Button" onClick={onSavePriority}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
