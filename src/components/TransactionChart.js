import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TransactionChart = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8181/api/transactions/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="text-center">Loading chart...</div>;

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount (₪)",
        data: [stats.totalIncome, stats.totalExpenses],
        backgroundColor: ["#198754", "#dc3545"], 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="my-5">
      <h4 className="text-center mb-3">Income vs Expenses</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
