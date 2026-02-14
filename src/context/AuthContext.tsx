import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role: "user" | "provider";
  providerProfile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User | null;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: "user" | "provider";
    providerProfile?: any;
  }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("raffine_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("raffine_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("raffine_user");
    }
  }, [user]);

  const login = (email: string, _password: string) => {
    const stored = localStorage.getItem("raffine_user");
    if (!stored) return null;

    const parsedUser: User = JSON.parse(stored);

    if (parsedUser.email !== email) return null;

    setUser(parsedUser);
    return parsedUser;
  };

  const register = ({
    name,
    email,
    password,
    role,
    providerProfile,
  }: {
    name: string;
    email: string;
    password: string;
    role: "user" | "provider";
    providerProfile?: any;
  }) => {
    const newUser: User = {
      name,
      email,
      role,
      providerProfile: role === "provider" ? providerProfile : undefined,
    };

    setUser(newUser);
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
