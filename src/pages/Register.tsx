import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate slight delay
    setTimeout(() => {
      const success = register(name, email, password);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex px-6 py-20 items-center justify-center">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-raffine-pink text-white shadow-xl shadow-raffine-pink/30 mb-6 transition-transform hover:rotate-3">
            <span className="text-3xl font-black tracking-tighter">R</span>
          </div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-[0.2em] leading-tight">Create Account</h1>
          <p className="mt-3 text-gray-400 tracking-wide font-medium">Join the Raffine elite experience</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 h-48 w-48 bg-raffine-pink/10 rounded-full blur-3xl" />

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-display"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-display"
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
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-display"
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

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-raffine-gold ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold/50 focus:bg-white/10 transition-all font-display"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-raffine-pink py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_0_20px_rgba(238,43,108,0.4)] active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-raffine-gold hover:text-white font-bold transition-colors ml-1 uppercase tracking-widest text-xs">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
