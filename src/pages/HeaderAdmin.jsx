import React, { useState } from "react";
import styles from "./AdminDesign/HeaderAdmin.module.css";

export const HeaderAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className={styles.navSection}>
      <div className={styles.headerLeft}>
        <img
          src="../images/logo1.png"
          alt="Logo"
          className={styles.adminLogo}
        />
        <span className={styles.mplText}>MPL Admin</span>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.adminInfo} onClick={toggleDropdown}>
          <img
            src="../images/pankaj1.jpeg"
            alt="Admin"
            className={styles.adminImage}
          />
          <span className={styles.adminName}>pankaj1807</span>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>Profile</button>
              <button className={styles.dropdownItem}>Settings</button>
              <button className={styles.dropdownItem}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
