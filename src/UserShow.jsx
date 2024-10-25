import React from "react";
import { Header } from "./components/Header"
import { Home } from "./components/Home";
import { Gallery } from "./components/Gallery";
import { CricketPlayerRegistration } from "./components/Registration";
import { CricketMatchPage } from "./secondmaincomponents/CricketMatchPage";
import { Live } from "./secondmaincomponents/Live";
import { Teams } from "./components/Teams";
import { MplUpdate } from "./secondmaincomponents/MplUpdate";
import { AdminLogin } from "./components/AdminLogin";
import { Footer } from "./components/Footer";

export const UserShow = () => {
    return (
      <>
        <Header />
        <Home />
        <Gallery />
        <CricketPlayerRegistration />
        <CricketMatchPage />
        <Live />
        <Teams />
        <MplUpdate />
        <AdminLogin />
        <Footer />
      </>
    );
};
