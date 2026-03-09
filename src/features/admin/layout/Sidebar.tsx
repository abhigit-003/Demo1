import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Package,
  DollarSign,
  Map,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  Tag,
  Sliders,
  FileText,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/destinations', icon: Map, label: 'Destinations' },
    { to: '/admin/pricing-engine', icon: Settings, label: 'Pricing Engine' },
    { to: '/admin/pricing-rules', icon: Sliders, label: 'Pricing Rules' },
    { to: '/admin/coupons', icon: Tag, label: 'Coupons' },
    { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/admin/user-logs', icon: FileText, label: 'User Logs' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-sm border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar panel */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full bg-slate-900 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
            <span className="text-xl font-bold text-white">Admin Panel</span>
            <button
              onClick={closeSidebar}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-md group transition-all',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )
                }
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-all"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
