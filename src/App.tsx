import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RocketsPage from "./pages/RocketListing";
import RocketDetail from "./pages/RocketPage";
import HistoryPage from "./pages/HistoryListing";
// import Navbar from "./components/Navbar";
import { LaunchesListing } from "./pages/LunchesListing";
import { LaunchesPage } from "./pages/LaunchesPage";
import "./App.css";
import AppLayout from "./layouts/app-layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RocketsPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/rockets/:rocketId",
        element: <RocketDetail />,
      },
      {
        path: "/launches",
        element: <LaunchesListing />,
      },
      {
        path: "/launches/:launchId",
        element: <LaunchesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
