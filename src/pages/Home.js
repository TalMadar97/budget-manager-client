import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      {!user ? (
        <>
          <h1>Welcome to Budget Manager</h1>
          <p>
            This application helps you track your income, expenses, and manage
            your budget efficiently.
          </p>
          <p>
            Get started by <Link to="/register">creating an account</Link> or{" "}
            <Link to="/login">logging in</Link> to manage your transactions.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-center mb-4">Welcome, {user.name}!</h1>
          <p className="lead text-center">
            This app helps you track your income and expenses, manage your
            budget, and gain insights into your financial habits.
          </p>

          <hr />

          <h3>Getting Started</h3>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Dashboard</strong> – Overview of your current budget and
              statistics.
              <Link to="/dashboard" className="ms-2">
                Go to Dashboard
              </Link>
            </li>
            <li className="list-group-item">
              <strong>Transactions</strong> – View, sort, and filter all your
              income and expenses.
              <Link to="/transactions" className="ms-2">
                View Transactions
              </Link>
            </li>
            <li className="list-group-item">
              <strong>Add Transaction</strong> – Quickly add income or expense
              entries.
              <Link to="/add-transaction" className="ms-2">
                Add New
              </Link>
            </li>
            <li className="list-group-item">
              <strong>Settings</strong> – Adjust your budget, reset data, or
              manage account.
              <Link to="/settings" className="ms-2">
                Open Settings
              </Link>
            </li>
          </ul>

          <h5 className="text-muted">💡 Tip:</h5>
          <p className="text-muted">
            You can always check your current balance and budget from the
            dashboard. Don’t forget to categorize your transactions to get
            better insights!
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
