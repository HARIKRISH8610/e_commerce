import React from "react";
import "./style.css";
import Input from "../../utils/input/Input";
import Label from "../../utils/label/label";
import Button from "../../utils/button/Button";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card-inner">
          <Label name="Username :" />
          <Input type="text" />
          <Label name="Password :" />
          <Input type="password" />
          <div className="d-flex">
            <Button name="Login" className="primary mt-10 mr-10" />
            <Button name="Forgot password" className="secondary mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
