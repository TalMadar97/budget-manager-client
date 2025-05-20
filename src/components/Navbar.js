import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const closeNavbar = () => {
    const collapseEl = document.getElementById("navbarNav");
    if (collapseEl && collapseEl.classList.contains("show")) {
      const collapseInstance =
        window.bootstrap.Collapse.getInstance(collapseEl);
      if (collapseInstance) {
        collapseInstance.hide();
      } else {
        new window.bootstrap.Collapse(collapseEl).hide();
      }
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
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-white fw-bold bg-primary px-3 rounded"
                        : "nav-link text-primary"
                    }
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
