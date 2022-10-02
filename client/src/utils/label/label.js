import React from "react";
import "./style.css";

function label(props) {
  return (
    <div>
      <label className={`label ${props.className}`} htmlFor={props.htmlFor}>
        {props.name}
      </label>
    </div>
  );
}

export default label;
