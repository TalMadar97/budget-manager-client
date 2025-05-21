import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data);
      setFiltered(data);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete transaction");

      toast.success("Transaction deleted");
      const updated = transactions.filter((tx) => tx._id !== id);
      setTransactions(updated);
      setFiltered(updated);
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  const handleSort = (field) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filtered].sort((a, b) => {
      if (field === "amount") {
        return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      if (field === "date") {
        return order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    setSortBy(field);
    setSortOrder(order);
    setFiltered(sorted);
    setCurrentPage(1); // reset page
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setTypeFilter(value);
    const result =
      value === ""
        ? transactions
        : transactions.filter((tx) => tx.type === value);
    setFiltered(result);
    setCurrentPage(1);
  };

  const renderArrow = (field) => {
    if (sortBy !== field) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">
        Transactions
      </h2>

      <div className="mb-3 d-flex justify-content-end align-items-center">
        <label className="me-2 fw-bold">Filter by type:</label>
        <select
          className="form-select w-auto"
          value={typeFilter}
          onChange={handleFilter}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th
                    onClick={() => handleSort("type")}
                    style={{ cursor: "pointer" }}
                  >
                    Type {renderArrow("type")}
                  </th>
                  <th
                    onClick={() => handleSort("amount")}
                    style={{ cursor: "pointer" }}
                  >
                    Amount (₪) {renderArrow("amount")}
                  </th>
                  <th
                    onClick={() => handleSort("category")}
                    style={{ cursor: "pointer" }}
                  >
                    Category {renderArrow("category")}
                  </th>
                  <th>Description</th>
                  <th
                    onClick={() => handleSort("date")}
                    style={{ cursor: "pointer" }}
                  >
                    Date {renderArrow("date")}
                  </th>
                  <th style={{ width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tx, index) => (
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

          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;
