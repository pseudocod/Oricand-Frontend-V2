import axios from "axios";
import toast from "react-hot-toast";
import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from "@/config/constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Adds auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log("Full request config:", config);
    }

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handles common response scenarios
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log("Response data:", response.data);
    }
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(new Error("Network error"));
    }

    const message = error.response?.data?.message || "An error occurred";

    // Handle token expiration
    if (error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
      return Promise.reject(error);
    }

    // Handle other common HTTP errors
    switch (error.response.status) {
      case 400:
        toast.error(message || "Bad request");
        break;
      case 403:
        toast.error("You don't have permission to perform this action");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 422:
        toast.error("Invalid data provided");
        break;
      case 500:
        toast.error("Internal server error. Please try again later.");
        break;
      default:
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

// API request wrapper with automatic error handling
const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  // File upload helper
  upload: async (url, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(percentCompleted);
      },
    });
  },
  // Chunked upload helper for large files
  uploadChunked: async (url, file, onProgress) => {
    const chunkSize = API_CONFIG.CHUNK_SIZE;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;

    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("totalChunks", totalChunks);
      formData.append("chunkIndex", Math.floor(start / chunkSize));

      await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      uploadedChunks++;
      onProgress?.(Math.round((uploadedChunks * 100) / totalChunks));
    }
  },
};

export default api;

// Utility function to handle API responses with better error handling
export const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return { data: response, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

// Utility function to handle file uploads
export const handleFileUpload = async (apiCall, options = {}) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      ...options,
    };
    const response = await apiCall(config);
    return { data: response, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};
