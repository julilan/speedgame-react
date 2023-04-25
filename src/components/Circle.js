import React from "react";
import "./Circle.css";

const Circle = (props) => {
  //console.log(props);
  // let style = {
  //   backgroundColor: props.backgroundColor,
  // };
  // if (props.class === "circle active") {
  //   style = {
  //     backgroundColor: "#bf1363",
  //   };
  // }
  return <div className={props.class} onClick={props.click}></div>;
};

export default Circle;
