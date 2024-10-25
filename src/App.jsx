import React from "react";
import { UserShow } from "./userShow";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <UserShow /> */}
    </>
  );
};
