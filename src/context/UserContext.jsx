import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getCurrentUser } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getCurrentUser();
      setUser(res);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("token", res.token);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("token", res.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const refreshUser = async () => {
    if (!token) return;
    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, register, logout, refreshUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
