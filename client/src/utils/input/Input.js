import React from "react";
import "./style.css";

function Input(props) {
  return (
    <div>
      <input
        className={`input ${props.className}`}
        value={props.value}
        type={props.type || "text"}
        onChange={props.onChange}
        id={props.id}
      />
    </div>
  );
}

export default Input;
