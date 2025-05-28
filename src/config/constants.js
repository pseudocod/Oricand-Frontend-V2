// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
  },
  PRODUCTS: {
    BASE: "/products",
    IMAGES: (productId) => `/products/${productId}/images`,
    FEATURE_IMAGE: (productId, imageId) => `/products/${productId}/images/${imageId}/feature`,
  },
  CATEGORIES: {
    BASE: "/categories",
    MEDIA: (categoryId) => `/categories/${categoryId}/media`,
  }
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Oricand',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
};

// Auth Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'token',
  COOKIE_EXPIRES: parseInt(import.meta.env.VITE_AUTH_COOKIE_EXPIRES || '7'),
  ROUTES: {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    ADMIN: '/admin',
  },
};

// Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '209715200'), // 200MB default
  MAX_REQUEST_SIZE: parseInt(import.meta.env.VITE_MAX_REQUEST_SIZE || '262144000'), // 250MB default
  PRODUCTS: {
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_FILE_SIZE: parseInt(import.meta.env.VITE_PRODUCT_MAX_FILE_SIZE || '5242880'), // 5MB default
    IMAGE_COMPRESSION: {
      quality: parseFloat(import.meta.env.VITE_IMAGE_COMPRESSION_QUALITY || '0.8'),
      maxWidth: parseInt(import.meta.env.VITE_MAX_IMAGE_WIDTH || '1920'),
    },
  },
  CATEGORIES: {
    ALLOWED_TYPES: {
      IMAGES: ['image/jpeg', 'image/png', 'image/webp'],
      VIDEOS: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
      get ALL() {
        return [...this.IMAGES, ...this.VIDEOS];
      }
    },
    MAX_FILE_SIZE: parseInt(import.meta.env.VITE_CATEGORY_MAX_FILE_SIZE || '209715200'), // 200MB for videos
  },
  CHUNK_SIZE: 1024 * 1024 * 5, // 5MB chunks for large file uploads
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  DURATION: 0.3,
  EASE: 'easeInOut',
};

// Feature Flags
export const FEATURES = {
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  IMAGE: {
    MAX_SIZE_MB: 50,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
  VIDEO: {
    MAX_SIZE_MB: 200,
    ALLOWED_TYPES: ['video/mp4', 'video/webm'],
  },
};

// Route Configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
    CATEGORIES: '/admin/categories',
    ATTRIBUTES: '/admin/attributes',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// Theme Configuration
export const THEME = {
  colors: {
    primary: '#000000',
    secondary: '#666666',
    error: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}; 