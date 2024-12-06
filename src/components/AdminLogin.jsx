import React, { useState } from "react";
import "./design/AdminLogin.css";
import { useNavigate } from "react-router-dom";

// Sample admin data
const adminUsers = [
  {
    username: "pankaj1807",
    password: "pankaj0718",
    image: "./images/pankaj.jpeg",
  },
  { username: "admin", password: "admin", image: "/path/to/image2.png" },
  { username: "admin3", password: "password3", image: "/path/to/image3.png" },
  { username: "admin4", password: "password4", image: "/path/to/image4.png" },
  { username: "admin5", password: "password5", image: "/path/to/image5.png" },
];

// The main AdminLogin component
export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = adminUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (admin) {
      setError("");
      // Redirect to the admin page after successful login
      navigate("/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-form1">
        <h2>Admin Login</h2>
        <form className="" onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="login-button" target="_blank">
            Login
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};
