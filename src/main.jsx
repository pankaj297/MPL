import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import "./index.css";
import Error from "./components/Error.jsx";
import { Home } from "./components/Home.jsx";
import { Gallery } from "./components/Gallery.jsx";
import { Teams } from "./components/Teams.jsx";
import { LiveAuction } from "./components/LiveAuction.jsx";
import { CricketPlayerRegistration } from "./components/Registration.jsx";
import { About } from "./components/About.jsx";
import { AdminLogin } from "./components/AdminLogin.jsx";
// import { ShowUpdate } from "./components/ShowUpdate.jsx";
import { Matches } from "./components/Matches.jsx";
import { Admin } from "./Admin.jsx";
// import { PoliticalLeaderProfile } from "./components/PoliticalLeaderProfile";
import { PriceMoney } from "./components/PriceMoney.jsx";
import { HomeAdmin } from "./pages/HomeAdmin.jsx";
import { PlayerTable } from "./pages/PlayerTable.jsx";
import { AdminLiveAuction } from "./pages/AdminLiveAuction.jsx";
// import { AdminTeamPlayers } from "./pages/AdminTeamPlayers.jsx";
import { UpcomingMatch } from "./pages/UpcomingMatch.jsx";
// import { AdminUpdate } from "./pages/AdminUpdate.jsx";
import { TotalSoldOutPlayers } from "./pages/TotalSoldOutPlayers.jsx";
import { PointsTable } from "./components/PointsTable.jsx";
import { Schedule } from "./components/Schedule.jsx";
// import {TopSoldOut} from "./components/TopSoldOut.jsx";
import TopSoldOut from "./components/TopSoldOut";

import { ToastContainer } from "react-toastify";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/gallary", element: <Gallery /> },
      { path: "/register", element: <CricketPlayerRegistration /> },
      { path: "/matches", element: <Matches /> },
      { path: "/live", element: <LiveAuction /> },
      { path: "/teams", element: <Teams /> },
      { path: "/login", element: <AdminLogin /> },
      { path: "/top", element: <TopSoldOut /> },
      <ToastContainer position="top-right" />,
      // { path: "/update", element: <ShowUpdate /> },
      { path: "/table", element: <PointsTable /> },
      { path: "/schedule", element: <Schedule /> },
      // { path: "/political", element: <PoliticalLeaderProfile /> },
      { path: "/price", element: <PriceMoney /> },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <PlayerTable />,
          },
          {
            path: "allplayers",
            element: <PlayerTable />,
          },
          {
            path: "liveauction",
            element: <AdminLiveAuction />,
          },
          // {
          //   path: "finalteamplayers",
          //   element: <AdminTeamPlayers />,
          // },
          {
            path: "addmatches",
            element: <UpcomingMatch />,
          },
          // {
          //   path: "addupdate",
          //   element: <AdminUpdate />,
          // },
          {
            path: "soldPlayer",
            element: <TotalSoldOutPlayers />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>
);
