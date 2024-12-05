import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(true);
  const location = useLocation();

  // Check if the user is logged in as admin and if the path is specifically /admin
  const showHeader = !(loggedInAsAdmin && location.pathname === "/admin");
  const showFooter = !(loggedInAsAdmin && location.pathname === "/admin");

  // Optional: To check if you're correctly at /admin or any sub-path of /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {showHeader && <Header />}
      <Outlet context={{ setLoggedInAsAdmin, loggedInAsAdmin }} />
      {!isAdminRoute && <Footer />}{" "}
      {/* Footer only shown if not in admin route */}
      <ToastContainer />
    </>
  );
};
