import { Outlet, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

export default function AdminLayout() {
  const storedUser = localStorage.getItem("user");
  let role = "";
  try {
    const user = storedUser ? JSON.parse(storedUser) : null;
    role = user?.role || "admin";
  } catch {
    role = "admin";
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <TopNavbar />
        {/* pt-14 on mobile gives clearance for the fixed hamburger button */}
        <main className="flex-1 overflow-y-auto p-4 pt-16 md:p-6 md:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}