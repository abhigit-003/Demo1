import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) navigate("/dashboard");
  };

  return (
    <div className="flex py-20 items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-widest leading-tight">Welcome back</h1>
          <p className="mt-3 text-sm text-gray-400">Sign in to your Raffine account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-raffine-gold">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-raffine-gold">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold transition-colors" placeholder="••••••••" />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" disable-navigation="true" className="text-xs text-gray-500 hover:text-white transition-colors">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full rounded-lg bg-raffine-pink py-4 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:scale-[0.98]">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-raffine-gold hover:text-white font-bold transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
