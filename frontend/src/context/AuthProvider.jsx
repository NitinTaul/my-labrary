import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        setLoading(true);
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Fetch user failed:", error.response?.data || error.message);
        setUser(null);
        setErr(error.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  const register = async (email, password) => {
    try {
      setErr(null);
      const res = await api.post("/api/auth/register", { email, password });
      setUser(res.data.user);
      return res;
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setErr(null);
      const res = await api.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return res;
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

const logout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  } catch (error) {
    setErr(error.response?.data?.message || "Logout failed");
    console.error("Logout failed:", error.response?.data || error.message);
  }
};


  return (
    <AuthContext.Provider value={{ user, loading, err, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
