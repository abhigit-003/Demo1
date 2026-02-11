import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/raffine/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-raffine-burgundy flex flex-col font-display antialiased text-white selection:bg-raffine-pink selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
