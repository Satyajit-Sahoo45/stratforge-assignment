import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RocketsPage from "./pages/RocketListing";
import RocketDetail from "./pages/RocketPage";
import HistoryPage from "./pages/HistoryListing";
import Navbar from "./components/Navbar";
import { LaunchesListing } from "./pages/LunchesListing";
import { LaunchesPage } from "./pages/LaunchesPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RocketsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/rockets/:rocketId" element={<RocketDetail />} />
        <Route path="/launches" element={<LaunchesListing />} />
        <Route path="/launches/:launchId" element={<LaunchesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
