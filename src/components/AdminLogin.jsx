import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./design/AdminLogin.module.css";

// Sample admin data
const adminUsers = [
  { username: "pankaj1807", password: "pankaj0718" },
  { username: "1807", password: "0718" },
];

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const admin = adminUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (admin) {
        localStorage.setItem(
          "adminUser",
          JSON.stringify({ username: admin.username })
        );
        navigate("/admin");
      } else {
        setError("Invalid username or password.");
      }

      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgOverlay} />

      <div className={styles.cardWrap}>
        <div className={styles.card}>
          {/* TITLE ONLY (NO IMAGE) */}
          <div className={styles.brand}>
            <h2 className={styles.title}>Admin Login</h2>
          </div>

          <form
            className={styles.form}
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <label className={styles.field}>
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <span className={styles.placeholder}>Username</span>
              <span className={styles.underline} />
            </label>

            <label className={styles.field}>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <span className={styles.placeholder}>Password</span>
              <span className={styles.underline} />
            </label>

            <button
              type="submit"
              className={`${styles.btn} ${isSubmitting ? styles.loading : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Checking..." : "Login"}
              <span className={styles.ripple} />
            </button>

            {error && <p className={styles.error}>{error}</p>}
          </form>

          {/* <div className={styles.hint}>
            Demo credentials: <strong>pankaj1807 / pankaj0718</strong>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
