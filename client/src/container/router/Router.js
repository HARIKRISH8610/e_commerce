import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Login from "../login/Login";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Router;
