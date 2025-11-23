import React from "react";
import styles from "./AdminDesign/HomeAdmin.module.css";
import { HeaderAdmin } from "./HeaderAdmin";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const HomeAdmin = () => {
  return (
    <div className={styles.dashboard}>
      <HeaderAdmin />
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
