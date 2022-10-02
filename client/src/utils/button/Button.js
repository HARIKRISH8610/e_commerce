import React from "react";
import "./style.css";

function Button(props) {
  return (
    <div>
      <button
        className={`button ${props.className}`}
        value={props.value}
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </div>
  );
}

export default Button;
