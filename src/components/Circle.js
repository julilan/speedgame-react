import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return <div className={props.class} onClick={props.click}></div>;
};

export default Circle;
