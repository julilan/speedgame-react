import React from "react";
import "./Circle.css";

const Circle = (props) => {
  //console.log(props);
  return (
    <div
      className={props.class}
      onClick={props.click}
      style={{
        pointerEvents: props.clicksActive,
      }}
    ></div>
  );
};

export default Circle;
