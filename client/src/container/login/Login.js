import React, { useEffect, useState } from "react";
import "./style.css";
import Input from "../../utils/input/Input";
import Label from "../../utils/label/label";
import Button from "../../utils/button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const fnLogin = () => {
    axios
      .post(`http://localhost:5000/api/v1/users/login/`, loginData)
      .then((res) => {
        localStorage.setItem("userId", res.data._id);
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/dashboard");
  //   }
  // }, [localStorage.getItem("token")]);

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card-inner">
          <Label name="Email :" />
          <Input
            type="text"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <Label name="Password :" />
          <Input
            type="password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <div className="d-flex">
            <Button
              name="Login"
              className="primary mt-10 mr-10"
              onClick={() => fnLogin()}
            />
            <Button name="Forgot password" className="secondary mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
