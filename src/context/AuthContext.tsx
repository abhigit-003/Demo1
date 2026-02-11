import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("raffine_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("raffine_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("raffine_user");
    }
  }, [user]);

  const login = (email: string, _password: string) => {
    // For now, accept any non-empty password
    const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
    const u = { email, name };
    setUser(u);
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    const u = { email, name };
    setUser(u);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
