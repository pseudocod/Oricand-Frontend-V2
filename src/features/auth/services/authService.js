import axiosInstance from "./axiosInstance";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
};

export const authService = {
  async login(email, password) {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    if (response.token) {
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'token', response.token);
    }
    
    return response;
  },

  async register(userData) {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response;
  },

  logout() {
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'token');
    window.location.href = '/login';
  },

  getStoredToken() {
    return localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'token');
  },

  isAuthenticated() {
    return !!this.getStoredToken();
  }
};
