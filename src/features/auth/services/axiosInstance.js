import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',  // This will be proxied by Vite to http://localhost:8080
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    // Log the full request configuration
    console.log('Full request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      baseURL: config.baseURL
    });
    
    const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    console.error('Response error:', error.response || error);

    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'token');
        if (!token) {
          throw new Error('No refresh token available');
        }

        // Redirect to login if token refresh fails
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 