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
import { ShowUpdate } from "./components/ShowUpdate.jsx";
import { Matches } from "./components/Matches.jsx";
import { Admin } from "./Admin.jsx";
import { PoliticalLeaderProfile } from "./components/PoliticalLeaderProfile";
import { PriceMoney } from "./components/PriceMoney.jsx";


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
      { path: "/live", element: <LiveAuction /> },
      { path: "/login", element: <AdminLogin /> },
      { path: "/update", element: <ShowUpdate /> },
      { path: "/political", element: <PoliticalLeaderProfile /> },
      { path: "/price", element: <PriceMoney /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>
);
