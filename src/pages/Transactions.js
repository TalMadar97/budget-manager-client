// ✅ Transactions.jsx - כולל כפתור מחיקה
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8181/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete transaction");
      }

      toast.success("Transaction deleted");
      // ⬇️ עדכון הרשימה אחרי מחיקה
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

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
                <th>Amount (₪)</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th style={{ width: "100px" }}>Actions</th>
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
                      tx.type === "income"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {tx.type}
                  </td>
                  <td>₪{tx.amount}</td>
                  <td>{tx.category}</td>
                  <td>{tx.description}</td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Link
                      to={`/edit-transaction/${tx._id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      🖉
                    </Link>
                    <button
                      onClick={() => handleDelete(tx._id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
