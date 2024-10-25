import React, { useState } from "react";
import "./design/AdminLogin.css";

// Sample admin data
const adminUsers = [
  { username: "pankaj1807", password: "pankaj0718", image: "./images/pankaj.jpeg" },
  { username: "admin2", password: "password2", image: "/path/to/image2.png" },
  { username: "admin3", password: "password3", image: "/path/to/image3.png" },
  { username: "admin4", password: "password4", image: "/path/to/image4.png" },
  { username: "admin5", password: "password5", image: "/path/to/image5.png" },
];

// The main AdminLogin component
export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = adminUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (admin) {
      setLoggedInAdmin(admin);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-container">
      {loggedInAdmin ? (
        <WelcomeAdmin admin={loggedInAdmin} />
      ) : (
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="login-button">
              Login
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

// The WelcomeAdmin component displays after a successful login
const WelcomeAdmin = ({ admin }) => {
  return (
    <div className="welcome-container">
      <h2 className="welcome-msg">Welcome, {admin.username}!</h2>
      <img src={admin.image} alt="Profile" className="profile-img" />

      {/* Placeholders for additional components */}
      <div className="additional-content">
        <h3>Admin Dashboard</h3>
        <p>This is where you can manage your website’s content and settings.</p>
        {/* You can add more components here */}
      </div>
    </div>
  );
};
