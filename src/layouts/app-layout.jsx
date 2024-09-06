import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative z-10">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
