// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
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