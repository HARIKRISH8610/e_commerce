import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./style.css";

function Navbar() {
  return (
    <div className="navbar_sidebar_container">
      <Sidebar />
      <div className="navbar_container">
        <nav className="navbar navbar-expand-lg navbar-css">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" href="#">
                  Account
                </a>
                <a className="nav-link" href="#">
                  WishList
                </a>
                <a className="nav-link" href="#">
                  Checkout
                </a>
                <a className="nav-link" href="#">
                  Cart
                </a>
                <a className="nav-link" href="#">
                  Login
                </a>
              </div>
            </div>
          </div>
        </nav>
        <hr style={{ marginTop: "0" }} />
      </div>
    </div>
  );
}

export default Navbar;
