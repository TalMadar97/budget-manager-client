import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ חשוב למחוק גם את user
    setIsLoggedIn(false);
    navigate("/login");
  };

  const closeNavbar = () => {
    const collapse = document.querySelector(".navbar-collapse");
    if (collapse && collapse.classList.contains("show")) {
      new window.bootstrap.Collapse(collapse).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          Budget Manager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink onClick={closeNavbar} className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={closeNavbar}
                className="nav-link"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={closeNavbar}
                className="nav-link"
                to="/transactions"
              >
                Transactions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={closeNavbar}
                className="nav-link"
                to="/add-transaction"
              >
                Add Transaction
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={closeNavbar}
                className="nav-link"
                to="/settings"
              >
                Settings
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    onClick={closeNavbar}
                    className="nav-link text-success fw-bold"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={closeNavbar}
                    className="nav-link text-primary"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger ms-2">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
