import React from "react";
import { NavLink } from "react-router-dom";

const NavbarPart = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between sticky-top ms-2"
        style={{
          border: "1px solid",
          paddingTop: "0.3rem",
          paddingBottom: "0.2rem",
        }}
      >
        <NavLink className="navbar-brand" to="/" style={{ marginLeft: "3%" }}>
          <img
            src="./images/protivaLogo.jpg"
            width={150}
            height={30}
            alt="Logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              className="nav-item nav-link fs-5"
              activeClassName="active"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="nav-item nav-link fs-5"
              activeClassName="active"
              to="/teachers"
            >
              Teachers
            </NavLink>
            <NavLink
              className="nav-item nav-link fs-5"
              activeClassName="active"
              to="/managements"
            >
              Managements
            </NavLink>
            <a
              className="nav-item nav-link fs-5"
              href="https://www.facebook.com/protivauttara"
              target="_blank"
              rel="noopener noreferrer"
            >
              Social
            </a>
          </div>
          <div className="navbar-nav ms-auto me-3">
            <NavLink
              className="nav-item nav-link fs-5"
              activeClassName="active"
              to="/login"
            >
              <i className="bi bi-box-arrow-in-right me-2"></i> Admin
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPart;
