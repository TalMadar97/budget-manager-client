import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const TransactionChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8181/api/transactions/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setChartData(data);
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchStats();
  }, []);

  if (!chartData)
    return <div className="text-center mt-4">Loading chart...</div>;

  const incomeCategories = chartData.incomeBreakdown || [];
  const expenseCategories = chartData.expenseBreakdown || [];

  const incomePie = {
    labels: incomeCategories.map((c) => c.category),
    datasets: [
      {
        label: "Income",
        data: incomeCategories.map((c) => c.amount),
        backgroundColor: [
          "#6f42c1",
          "#20c997",
          "#0d6efd",
          "#ffc107",
          "#198754",
        ],
      },
    ],
  };

  const expensePie = {
    labels: expenseCategories.map((c) => c.category),
    datasets: [
      {
        label: "Expenses",
        data: expenseCategories.map((c) => c.amount),
        backgroundColor: [
          "#dc3545",
          "#fd7e14",
          "#6610f2",
          "#e83e8c",
          "#0dcaf0",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "₪ Total",
        data: [chartData.totalIncome, chartData.totalExpenses],
        backgroundColor: ["#0d6efd", "#dc3545"],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center">Statistics Overview</h4>
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <h5 className="text-center text-success">💰 Income Breakdown</h5>
          <p className="text-center fw-bold">
            Total Income: ₪{chartData.totalIncome}
          </p>
          <Pie data={incomePie} />
        </div>
        <div className="col-md-6 mb-4">
          <h5 className="text-center text-danger">🧾 Expense Breakdown</h5>
          <p className="text-center fw-bold">
            Total Expenses: ₪{chartData.totalExpenses}
          </p>
          <Pie data={expensePie} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <h5 className="text-center">Total Summary</h5>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
