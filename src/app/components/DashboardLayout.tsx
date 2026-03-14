import { Outlet, NavLink } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  IndianRupee, 
  Map, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  User,
  ShieldAlert
} from "lucide-react";
import { clsx } from "clsx";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <ShieldAlert className="w-6 h-6" />
            <span>Command Center</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard Home" />
          <NavItem to="/products" icon={<Package size={20} />} label="Product & Service Hub" />
          <NavItem to="/pricing" icon={<IndianRupee size={20} />} label="Revenue & Pricing" />
          <NavItem to="/regulation" icon={<Map size={20} />} label="Destination Regulation" />
          <NavItem to="/analytics" icon={<BarChart3 size={20} />} label="Analytics & Behavior" />
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              System
            </div>
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate">Senior Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="w-96 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products, users, orders..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Operational
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive 
          ? "bg-indigo-50 text-indigo-700" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
