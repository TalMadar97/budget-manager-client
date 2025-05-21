import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [newBudget, setNewBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const profileRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await profileRes.json();
        setUser(userData);
        setNewBudget(userData.budget);

        const statsRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/transactions/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const stats = await statsRes.json();
        setTotalExpenses(stats.totalExpenses || 0);
      } catch (err) {
        toast.error("Error loading settings.");
      }
    };

    fetchData();
  }, []);

  const handleBudgetChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/budget`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ budget: newBudget }),
        }
      );

      if (!res.ok) throw new Error("Failed to update budget");
      const data = await res.json();
      toast.success("Budget updated successfully!");
      setUser((prev) => ({ ...prev, budget: data.budget }));
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  const handleResetBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/budget`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ budget: 0 }),
        }
      );

      if (!res.ok) throw new Error("Failed to reset budget");

      toast.success("Budget reset to 0");
      setNewBudget(0);
      setUser((prev) => ({ ...prev, budget: 0 }));
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  if (!user) return <div className="p-4 text-center">Loading settings...</div>;

  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">Settings</h2>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">👤 User Profile</h5>
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <h5 className="mt-4">💰 Budget Settings</h5>
        <div className="mb-3">
          <label className="form-label">Set Monthly Budget (₪):</label>
          <input
            type="number"
            className="form-control"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            min="0"
          />
        </div>

        {totalExpenses > newBudget && (
          <div className="alert alert-danger">
            ⚠️ Your current expenses (₪{totalExpenses.toLocaleString()}) exceed
            your budget!
          </div>
        )}

        <div className="d-flex gap-3 mt-3">
          <button onClick={handleBudgetChange} className="btn btn-primary">
            Save Budget
          </button>
          <button
            onClick={handleResetBudget}
            className="btn btn-outline-danger"
          >
            Reset Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
