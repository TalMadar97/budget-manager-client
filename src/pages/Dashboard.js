import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized. Please login.");
      return navigate("/login");
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8181/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div className="p-4 text-center">Loading dashboard...</div>;

  return (
    <div className="container mt-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">
        Welcome, {user.name}!
      </h2>

      <div className="alert alert-info text-center fs-4">
        Current Budget: <strong>{user.budget} ₪</strong>
      </div>

      <div className="d-flex gap-3 justify-content-center mt-3">
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
