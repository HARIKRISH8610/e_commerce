import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Router;
