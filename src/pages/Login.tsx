import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate slight delay for professional feel
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid credentials");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen px-6 py-24 items-center justify-center bg-raffine-burgundy selection:bg-raffine-pink/30">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-raffine-pink text-white shadow-xl shadow-raffine-pink/30 mb-6 transition-transform hover:rotate-3">
            <span className="text-3xl font-black tracking-tighter">R</span>
          </div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-[0.2em] leading-tight">Welcome back</h1>
          <p className="mt-3 text-gray-400 tracking-wide font-medium">Sign in to your premium account</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Subtle Decorative Gradient */}
          <div className="absolute -top-24 -right-24 h-48 w-48 bg-raffine-pink/10 rounded-full blur-3xl group-hover:bg-raffine-pink/20 transition-colors duration-700" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-12 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password link removed as page is missing */}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-raffine-pink py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_0_20px_rgba(238,43,108,0.4)] active:scale-[0.98] disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-raffine-gold hover:text-white font-bold transition-colors ml-1 uppercase tracking-widest text-xs">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
