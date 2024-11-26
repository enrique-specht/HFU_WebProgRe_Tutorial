import "./AddToDo.css";
import { useState } from "react";

export default function AddToDo() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const onSave = () => {
    console.log("Task:", title);
    console.log("Priority:", priority);
  };

  return (
    <div className="AddToDo">
      <div className="AddToDo__Wrapper">
        <div className="AddToDo__Title">
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
                name="inputPriotiy"
                value={priority}
                onChange={onPriorityChange}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="AddToDo__Buttons">
            <button className="AddToDo__Button" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
