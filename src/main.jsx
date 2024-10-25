import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import "./index.css";
import Error from "./components/Error.jsx";
import { Home } from "./components/Home.jsx";
import { Gallery } from "./components/Gallery.jsx";
import { Teams } from "./components/Teams.jsx";
import { Live } from "./secondmaincomponents/Live.jsx";
import { MatchImage } from "./components/MatchImage.jsx";
import { CricketPlayerRegistration } from "./components/Registration.jsx";
import About from "./components/About.jsx";
import { ShowUpdate } from "./components/ShowUpdate.jsx";
import { InsertUpdate } from "./components/insertUpdate.jsx";

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
      { path: "/matches", element: <MatchImage /> },
      { path: "/live", element: <Live /> },
      { path: "/teams", element: <Teams /> },
      { path: "/showUpdate", element: <ShowUpdate /> },
      { path: "/insertUpdate", element: <InsertUpdate /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>
);
