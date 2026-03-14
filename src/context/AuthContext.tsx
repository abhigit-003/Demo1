import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "provider" | "admin" | "developer";
  providerProfile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: "user" | "provider";
    providerProfile?: any;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("raffine_token");
      if (!token) {
        setLoading(false);
        return;
      }

      // Proactively check token expiry client-side before making an API call.
      // This prevents stale/expired tokens from lingering in localStorage.
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp && Date.now() >= payload.exp * 1000;
        if (isExpired) {
          localStorage.removeItem("raffine_token");
          setUser(null);
          setLoading(false);
          return;
        }
      } catch {
        // Token is malformed — clear it
        localStorage.removeItem("raffine_token");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch (error) {
        localStorage.removeItem("raffine_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("raffine_token", data.token);
      setUser(data.user);
      return data.user;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      return null;
    }
  };

  const register = async (userData: any) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      localStorage.setItem("raffine_token", data.token);
      setUser(data.user);
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("raffine_token");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
