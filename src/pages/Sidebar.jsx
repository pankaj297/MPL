import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDesign/Sidebar.module.css";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <Link to="/admin">Admin Home</Link>
            </li>
            <li>
              <Link to="/admin/allplayers">All Registered Players</Link>
            </li>
            <li>
              <Link to="/admin/liveauction">Live Auction Page</Link>
            </li>
            <li>
              <Link to="/admin/addmatches">Add Upcoming Matches</Link>
            </li>
            <li>
              <Link to="/admin/soldPlayer">Total Selected Players</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
    </>
  );
};
