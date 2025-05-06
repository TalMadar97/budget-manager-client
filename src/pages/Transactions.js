import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8181/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">
        Transactions
      </h2>
      {transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-light"}
                >
                  <td
                    className={
                      tx.type === "income" ? "text-success" : "text-danger"
                    }
                  >
                    {tx.type}
                  </td>
                  <td>
                    {tx.amount} <span className="text-muted">₪</span>
                  </td>
                  <td>{tx.category}</td>
                  <td>{tx.description}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={`/edit-transaction/${tx._id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Edit"
                    >
                      🖉
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
