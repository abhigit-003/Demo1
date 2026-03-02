import { 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Activity, 
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, bookings: 2400 },
  { name: 'Feb', revenue: 3000, bookings: 1398 },
  { name: 'Mar', revenue: 2000, bookings: 9800 },
  { name: 'Apr', revenue: 2780, bookings: 3908 },
  { name: 'May', revenue: 1890, bookings: 4800 },
  { name: 'Jun', revenue: 2390, bookings: 3800 },
  { name: 'Jul', revenue: 3490, bookings: 4300 },
];

function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'up' | 'down'; 
  icon: any; 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        <div className="flex items-center mt-2">
          {changeType === 'up' ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-slate-400 ml-1">vs last month</span>
        </div>
      </div>
      <div className="p-3 bg-indigo-50 rounded-lg">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            View Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Revenue" 
          value="$124,592.00" 
          change="12.5%" 
          changeType="up" 
          icon={DollarSign} 
        />
        <MetricCard 
          title="Active Users" 
          value="8,432" 
          change="2.4%" 
          changeType="up" 
          icon={Users} 
        />
        <MetricCard 
          title="Total Bookings" 
          value="1,245" 
          change="4.3%" 
          changeType="down" 
          icon={ShoppingBag} 
        />
        <MetricCard 
          title="System Status" 
          value="99.9%" 
          change="0.0%" 
          changeType="up" 
          icon={Activity} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Revenue & Bookings</h3>
            <select className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { title: 'New Destination Added', time: '2h ago', type: 'info', desc: 'Bali Villa Retreat pending review.' },
              { title: 'Price Surge Triggered', time: '4h ago', type: 'warning', desc: 'Paris bookings exceeded 80%.' },
              { title: 'System Maintenance', time: '1d ago', type: 'success', desc: 'Scheduled maintenance completed.' },
              { title: 'Stock Alert', time: '2d ago', type: 'error', desc: 'Travel Pillow stock low (Item #P006).' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.type === 'info' ? 'bg-blue-500' :
                  alert.type === 'warning' ? 'bg-orange-500' :
                  alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div>
                  <h4 className="text-sm font-medium text-slate-900">{alert.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
                  <span className="text-xs text-slate-400 mt-1 block">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
