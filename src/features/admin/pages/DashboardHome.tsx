import { useState, useEffect, useCallback } from "react";
import { TrendingUp, Package, MapPin, DollarSign, Users, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getDashboardStats } from "../services/adminAPI";
import { useNavigate } from "react-router";

const DEFAULT_REVENUE_DATA = [
  { name: 'Jan', revenue: 45000, bookings: 320 },
  { name: 'Feb', revenue: 52000, bookings: 380 },
  { name: 'Mar', revenue: 48000, bookings: 340 },
  { name: 'Apr', revenue: 61000, bookings: 420 },
  { name: 'May', revenue: 55000, bookings: 390 },
  { name: 'Jun', revenue: 67000, bookings: 460 },
];

const DEFAULT_CATEGORY_DATA = [
  { name: 'Destinations', value: 45, color: '#3b82f6' },
  { name: 'Physical Products', value: 30, color: '#8b5cf6' },
  { name: 'Services', value: 25, color: '#10b981' },
];

const DEFAULT_STATS = [
  { name: 'Total Revenue', value: '$124,832', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'Active Products', value: '1,248', change: '+4.2%', trend: 'up', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Active Destinations', value: '342', change: '-2.1%', trend: 'down', icon: MapPin, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { name: 'Total Customers', value: '8,426', change: '+8.3%', trend: 'up', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const DEFAULT_ACTIVITIES = [
  { action: 'Price rule activated', item: 'Paris Early Bird Discount', time: '5 min ago', user: 'Admin' },
  { action: 'Product hidden', item: 'Luxury Watch #2341', time: '12 min ago', user: 'Moderator' },
  { action: 'Destination updated', item: 'Tokyo Premium Package', time: '1 hour ago', user: 'Admin' },
  { action: 'Coupon created', item: 'SUMMER25', time: '2 hours ago', user: 'Marketing' },
  { action: 'Flash sale started', item: 'European Destinations', time: '3 hours ago', user: 'Admin' },
];

export default function DashboardHome() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [revenueData, setRevenueData] = useState(DEFAULT_REVENUE_DATA);
  const [categoryData, setCategoryData] = useState(DEFAULT_CATEGORY_DATA);
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardStats();
      if (data.stats) setStats(data.stats);
      if (data.revenueData) setRevenueData(data.revenueData);
      if (data.categoryData) setCategoryData(data.categoryData);
      if (data.recentActivities) setActivities(data.recentActivities);
    } catch {
      // Fall through to defaults – no error banner on dashboard
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Your command center for managing products and destinations</p>
        </div>
        <button onClick={fetchStats} disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-60">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4" />
                <div className="h-7 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-600 mt-1">Last 6 months performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <button onClick={() => navigate('/admin/user-logs')} className="text-sm text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.item}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{activity.user}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => navigate('/admin/products')} className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
          <Package className="w-8 h-8 text-gray-400 mb-3" />
          <h4 className="text-sm font-medium text-gray-900">Add New Product</h4>
          <p className="text-xs text-gray-600 mt-1">Create a new product or service</p>
        </button>
        <button onClick={() => navigate('/admin/destinations')} className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
          <MapPin className="w-8 h-8 text-gray-400 mb-3" />
          <h4 className="text-sm font-medium text-gray-900">Add Destination</h4>
          <p className="text-xs text-gray-600 mt-1">List a new travel destination</p>
        </button>
        <button onClick={() => navigate('/admin/pricing-rules')} className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors text-left">
          <DollarSign className="w-8 h-8 text-gray-400 mb-3" />
          <h4 className="text-sm font-medium text-gray-900">Create Pricing Rule</h4>
          <p className="text-xs text-gray-600 mt-1">Set up dynamic pricing</p>
        </button>
      </div>
    </div>
  );
}
