import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./asset/style.css";

let container = null;
document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("app");
    // const root = ReactDOM.createRoot(container);

    ReactDOM.render(<App />, container);
  }
});
