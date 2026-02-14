import {
  Calendar,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  Clock,
  Heart,
  Star,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const providerStats = [
  { label: "Total Revenue", value: "₹12,430", icon: DollarSign, change: "+12%" },
  { label: "Bookings", value: "284", icon: Calendar, change: "+8%" },
  { label: "Clients", value: "1,205", icon: Users, change: "+15%" },
  { label: "Products Sold", value: "432", icon: ShoppingBag, change: "+22%" },
];

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const isProvider = user.role === "provider";

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-widest">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-400">
              Welcome back, {user.name}
            </p>
          </div>
        </div>

        {/* ================= PROVIDER DASHBOARD ================= */}
        {isProvider && (
          <>
            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {providerStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{s.label}</span>
                    <s.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-raffine-gold">
                    {s.change} from last month
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-raffine-pink/20 to-transparent border border-raffine-pink/20 p-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">
                Quick Actions
              </h2>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to="/admin/add-service"
                  className="rounded-lg bg-raffine-pink px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                >
                  Add New Service
                </Link>
                <Link
                  to="/admin/products"
                  className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10"
                >
                  Manage Products
                </Link>
                <Link
                  to="/admin/analytics"
                  className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10"
                >
                  View Analytics
                </Link>
              </div>
            </div>
          </>
        )}

        {/* ================= USER DASHBOARD ================= */}
        {!isProvider && (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="text-raffine-pink" />
                  <h2 className="text-lg font-bold text-white">
                    My Bookings
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  View and manage your upcoming appointments.
                </p>
                <Link
                  to="/my-bookings"
                  className="mt-4 inline-block text-xs uppercase tracking-widest text-raffine-gold"
                >
                  View Bookings →
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <Heart className="text-raffine-pink" />
                  <h2 className="text-lg font-bold text-white">
                    Favorites
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Your saved salons and wellness centers.
                </p>
                <Link
                  to="/favorites"
                  className="mt-4 inline-block text-xs uppercase tracking-widest text-raffine-gold"
                >
                  View Favorites →
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <UserCircle className="text-raffine-pink" />
                  <h2 className="text-lg font-bold text-white">
                    Profile
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Manage your personal account information.
                </p>
                <Link
                  to="/profile"
                  className="mt-4 inline-block text-xs uppercase tracking-widest text-raffine-gold"
                >
                  Edit Profile →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
