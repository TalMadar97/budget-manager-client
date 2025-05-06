import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Transactions() {
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
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={
                    tx.type === "income" ? "table-success" : "table-danger"
                  }
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td className="text-capitalize">{tx.type}</td>
                  <td>₪{tx.amount.toLocaleString()}</td>
                  <td>{tx.category}</td>
                  <td>{tx.description}</td>
                  <td>{new Date(tx.date).toLocaleDateString("he-IL")}</td>
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
