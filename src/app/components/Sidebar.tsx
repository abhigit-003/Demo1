import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Package, 
  IndianRupee, 
  Map, 
  BarChart2, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/products', icon: Package, label: 'Products & Services' },
    { to: '/pricing', icon: IndianRupee, label: 'Revenue & Pricing' },
    { to: '/destinations', icon: Map, label: 'Destinations' },
    { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-sm border border-gray-200"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      <div className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">AdminHub</span>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </button>
          <button className="flex items-center w-full px-4 py-2 mt-1 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
