import { useState, useEffect, useContext } from "react";
import { authService } from "../services/authService";
import storage from "@/utils/storage/storage";
import { USER_STORAGE_KEY, TOKEN_STORAGE_KEY } from "./constants";
import { UserContext } from "./context";

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = storage.get(USER_STORAGE_KEY);
    const storedToken = storage.get(TOKEN_STORAGE_KEY);
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setUser(res.user);
    setToken(res.token);
    storage.set(USER_STORAGE_KEY, res.user);
    storage.set(TOKEN_STORAGE_KEY, res.token);
  };

  const register = async (data) => {
    const res = await authService.register(data);
    setUser(res.user);
    setToken(res.token);
    storage.set(USER_STORAGE_KEY, res.user);
    storage.set(TOKEN_STORAGE_KEY, res.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove(USER_STORAGE_KEY);
    storage.remove(TOKEN_STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
