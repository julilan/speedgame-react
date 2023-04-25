import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Game Over</h2>
        <p>
          <span>{props.score}</span>
        </p>
        <button onClick={props.click}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
