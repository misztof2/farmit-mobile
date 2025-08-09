import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AuthContext = createContext(null);
const API = axios.create({ baseURL: "http://localhost:7091" }); // zmień na swój backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInit] = useState(true);
  useEffect(() => { (async () => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt) {
        API.defaults.headers.common.Authorization = `Bearer ${jwt}`;
        const { data } = await API.get("/api/auth/me");
        setUser(data);
      }
    } finally { setInit(false); }
  })(); }, []);
  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password }, { withCredentials:true });
    const token = data?.token || data?.jwt || "";
    if (token) {
      await AsyncStorage.setItem("jwt", token);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      const me = await API.get("/api/auth/me");
      setUser(me.data);
    } else {
      throw new Error("No token from /api/auth/login");
    }
  };
  const logout = async () => { await AsyncStorage.removeItem("jwt"); delete API.defaults.headers.common.Authorization; setUser(null); };
  return <AuthContext.Provider value={{ user, initializing, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
