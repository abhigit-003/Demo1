import { LayoutDashboard, Calendar, DollarSign, Users, ShoppingBag, TrendingUp, Star, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Revenue", value: "₹12,430", icon: DollarSign, change: "+12%" },
  { label: "Bookings", value: "284", icon: Calendar, change: "+8%" },
  { label: "Clients", value: "1,205", icon: Users, change: "+15%" },
  { label: "Products Sold", value: "432", icon: ShoppingBag, change: "+22%" },
];

const recentSales = [
  { name: "Signature Massage", amount: "₹1456", time: "2h ago" },
  { name: "Midnight Radiance Oil", amount: "₹815", time: "4h ago" },
  { name: "HydraFacial Treatment", amount: "₹160", time: "6h ago" },
  { name: "Sculpting Stone Roller", amount: "₹304", time: "8h ago" },
];

const schedule = [
  { time: "10:00 AM", client: "Suhail.", service: "Deep Tissue Massage" },
  { time: "11:30 AM", client: "Umar.", service: "HydraFacial" },
  { time: "2:00 PM", client: "Abhijeet.", service: "Hot Stone Therapy" },
  { time: "4:00 PM", client: "Michael R.", service: "Precision Haircut" },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Dashboard</h1>
            <p className="mt-1 text-gray-400">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-raffine-pink hover:bg-raffine-pink/10 transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{s.label}</span>
                <s.icon className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs text-raffine-gold">{s.change} from last month</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-raffine-pink/20 to-transparent border border-raffine-pink/20 p-8">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to="/admin/add-service" className="rounded-lg bg-raffine-pink px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90">
              Add New Service
            </Link>
            <Link to="/admin/products" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10">
              Manage Products
            </Link>
            <Link to="/admin/analytics" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10">
              View Analytics
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Schedule */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-card-foreground">
              <Calendar className="h-5 w-5 text-primary" /> Today's Schedule
            </h2>
            <div className="mt-4 space-y-3">
              {schedule.map((item) => (
                <div key={item.time} className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.service}</p>
                    <p className="text-xs text-muted-foreground">{item.client}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-card-foreground">
              <TrendingUp className="h-5 w-5 text-primary" /> Recent Sales
            </h2>
            <div className="mt-4 space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.name} className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">{sale.time}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{sale.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
