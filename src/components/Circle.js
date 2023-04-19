import React from "react";
import "./Circle.css";

const Circle = (props) => {
  const style = {
    backgroundColor: props.backgroundColor,
  };
  return (
    <div className="circle" onClick={props.click} style={style}>
      <p>
        <span>{props.name}</span>
      </p>
    </div>
  );
};

export default Circle;
