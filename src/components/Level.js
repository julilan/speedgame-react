import React from "react";
import "./Level.css";

const Level = (props) => {
  return (
    <button className="level" name={props.name} onClick={props.click}>
      {props.name}
    </button>
  );
};

export default Level;
