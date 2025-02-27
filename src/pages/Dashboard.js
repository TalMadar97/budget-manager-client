import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <nav className="mt-4">
        <Link to="/transactions" className="text-blue-500 mr-4">
          View Transactions
        </Link>
        <Link to="/add-transaction" className="text-blue-500">
          Add Transaction
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
