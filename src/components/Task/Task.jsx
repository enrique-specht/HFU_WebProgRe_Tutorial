/* eslint-disable react/prop-types */
import "./Task.css";

export default function Task(props) {
  let moveLeft;
  let moveRight;

  if (props.completed) {
    moveLeft = (
      <div className="Task__Left" onClick={() => props.moveLeft(props.id)}>
        &#x21D0;
      </div>
    );
  } else {
    moveRight = (
      <div className="Task__Right" onClick={() => props.moveRight(props.id)}>
        &#x21D2;
      </div>
    );
  }

  return (
    <div className="Task">
      {moveLeft}
      <div className="Task__Content">
        <div className="Task__Content__Title">
          {props.task} / {props.priority}
        </div>
        <div className="Task__Buttons">
          <div>&#x270E;</div>
          <div onClick={() => props.deleteToDo(props.id)}>&#x1F5D1;</div>
        </div>
      </div>
      {moveRight}
    </div>
  );
}
