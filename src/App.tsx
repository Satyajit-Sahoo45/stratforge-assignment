import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RocketsPage from "./pages/RocketListing";
import RocketDetail from "./pages/RocketPage";
import HistoryPage from "./pages/HistoryListing";
import { LaunchesListing } from "./pages/LaunchesListing";
import { LaunchesPage } from "./pages/LaunchesPage";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

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
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </HelmetProvider>
  );
}

export default App;
