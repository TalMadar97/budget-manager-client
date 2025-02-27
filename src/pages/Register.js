import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regular Expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate fields
    if (e.target.name === "email") {
      setErrors({
        ...errors,
        email: emailRegex.test(e.target.value) ? "" : "Invalid email format",
      });
    }
    if (e.target.name === "password") {
      setErrors({
        ...errors,
        password: passwordRegex.test(e.target.value)
          ? ""
          : "Password must be at least 8 characters, contain one uppercase letter, and one special character (!@#$%^&*)",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters, contain one uppercase letter, and one special character (!@#$%^&*)",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8181/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
