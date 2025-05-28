import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code between 200 and 299 triggers this function
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(new Error("Network error"));
    }

    // Handle specific HTTP errors
    switch (error.response.status) {
      case 400:
        toast.error(error.response.data.message || "Bad request");
        break;
      case 403:
        toast.error("You don't have permission to perform this action");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 500:
        toast.error("Internal server error. Please try again later.");
        break;
      default:
        toast.error("Something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// Utility function to handle API responses
export const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: error.response?.data?.message || error.message 
    };
  }
};
