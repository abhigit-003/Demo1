import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(name, email, password)) navigate("/dashboard");
  };

  return (
    <div className="flex py-20 items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-widest leading-tight">Create your account</h1>
          <p className="mt-3 text-sm text-gray-400">Join the Raffine experience</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-raffine-gold">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold transition-colors" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-raffine-gold">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-raffine-gold">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-raffine-gold transition-colors" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-raffine-pink py-4 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:scale-[0.98]">
            Create Account
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-raffine-gold hover:text-white font-bold transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
