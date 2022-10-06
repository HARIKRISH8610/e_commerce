import React from "react";
import Navbar from "./container/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Router from "./container/router/Router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
