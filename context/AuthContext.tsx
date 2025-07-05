"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails, loginUser, logoutUser, registerUser } from "../services/auth";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: "tenant" | "landlord";
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, mobile: string, password: string, role: "tenant" | "landlord") => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserDetails();
        if (data && !data.message) {
          setUser(data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

async function login(email: string, password: string) {
  const res = await loginUser({ email, password });
  if (res.token) {
    const userData = await getUserDetails();
    setUser(userData);
  }
  return res;
}


  async function register(
  name: string,
  email: string,
  mobile: string,
  password: string,
  role: "tenant" | "landlord"
) {
  const res = await registerUser({ name, email, mobile, password, role });
  return res;
}


  async function logout() {
    await logoutUser();
    setUser(null);
  }

  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
