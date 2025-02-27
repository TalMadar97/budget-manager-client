import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState(""); // ✅ הוספת שדה שם
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ הוספת בדיקת שם
    if (!name.trim()) {
      return toast.error("Name is required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must have at least 8 characters, one uppercase letter, and one special character."
      );
    }

    try {
      const response = await fetch("http://localhost:8181/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // ✅ שליחת name
      });

      if (!response.ok) throw new Error("Registration failed");

      toast.success("Registration successful! 🎉");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="p-3 bg-light rounded shadow-sm text-center">Register</h2>
      <form onSubmit={handleRegister}>
        {/* ✅ שדה שם חדש */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
