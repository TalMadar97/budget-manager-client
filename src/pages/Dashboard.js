import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import TransactionChart from "../components/TransactionChart";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return navigate("/login");
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);
    } catch (error) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || loading)
    return <div className="p-4 text-center">Loading dashboard...</div>;

  return (
    <div className="container mt-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">
        Welcome, {user.name}!
      </h2>

      {user.budget && user.budget > 0 ? (
        <div className="alert alert-info text-center fs-4 mt-3">
          Current Budget: <strong>{user.budget} ₪</strong>
        </div>
      ) : (
        <div className="alert alert-warning text-center fs-5 mt-3">
          You haven’t set a budget yet.{" "}
          <Link to="/settings" className="fw-bold">
            Set your budget now →
          </Link>
        </div>
      )}

      <div className="d-flex gap-3 justify-content-center mt-3">
        <Link to="/transactions" className="btn btn-primary">
          View Transactions
        </Link>
        <Link to="/add-transaction" className="btn btn-success">
          Add Transaction
        </Link>
      </div>

      <TransactionChart />
    </div>
  );
};

export default Dashboard;
