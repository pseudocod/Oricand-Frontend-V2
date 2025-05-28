import { axiosInstance as axios } from "@/utils/api";
import { API_ENDPOINTS, UPLOAD_CONFIG } from "@/config/constants";

export const fetchAllProducts = async () => {
  const response = await axios.get(API_ENDPOINTS.PRODUCTS.BASE);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_ENDPOINTS.PRODUCTS.BASE, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
};

const validateProductImage = (file) => {
  if (!UPLOAD_CONFIG.PRODUCTS.ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed types: ${UPLOAD_CONFIG.PRODUCTS.ALLOWED_TYPES.join(', ')}`
    );
  }
  if (file.size > UPLOAD_CONFIG.PRODUCTS.MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${file.name}. Maximum size: ${UPLOAD_CONFIG.PRODUCTS.MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }
  return true;
};

export const uploadProductImages = async (productId, files) => {
  const validFiles = files.filter(validateProductImage);

  const formData = new FormData();
  validFiles.forEach((file) => formData.append("files", file));

  await axios.post(API_ENDPOINTS.PRODUCTS.IMAGES(productId), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductImage = async (productId, imageId) => {
  await axios.delete(`${API_ENDPOINTS.PRODUCTS.IMAGES(productId)}/${imageId}`);
};

export const setFeaturedImage = async (productId, imageId) => {
  await axios.put(API_ENDPOINTS.PRODUCTS.FEATURE_IMAGE(productId, imageId));
};
