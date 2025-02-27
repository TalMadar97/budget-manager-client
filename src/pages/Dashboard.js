import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">Dashboard</h2>
      <div className="d-flex gap-3">
        <Link to="/transactions" className="btn btn-primary">
          View Transactions
        </Link>
        <Link to="/add-transaction" className="btn btn-success">
          Add Transaction
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
