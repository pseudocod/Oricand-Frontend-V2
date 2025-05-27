import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
