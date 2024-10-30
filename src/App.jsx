import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css"

export const App = () => {
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(true);
  const location = useLocation();

  // Only show the Header if not on /admin and not logged in as admin
  const showHeader = !(loggedInAsAdmin && location.pathname === "/admin");
  const showFooter = !(loggedInAsAdmin && location.pathname === "/admin");


  return (
    <>
     
      {showHeader && <Header />}
      <Outlet context={{ setLoggedInAsAdmin, loggedInAsAdmin }} />
      {showFooter && <Footer />}
    </>
  );
};
