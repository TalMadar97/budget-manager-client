import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to Budget Manager</h1>
      <p>
        This application helps you track your income, expenses, and manage your
        budget efficiently.
      </p>
      <p>
        Get started by <Link to="/register">creating an account</Link> or{" "}
        <Link to="/login">logging in</Link> to manage your transactions.
      </p>
    </div>
  );
};

export default Home;
