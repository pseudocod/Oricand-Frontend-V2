import api from "@/utils/api";
import { API_ENDPOINTS, UPLOAD_CONFIG } from "@/config/constants";

export async function fetchAllCategories() {
  return api.get(API_ENDPOINTS.CATEGORIES.BASE);
}

export async function createCategory(data) {
  return api.post(API_ENDPOINTS.CATEGORIES.BASE, data);
}

export async function updateCategory(id, data) {
  return api.put(`${API_ENDPOINTS.CATEGORIES.BASE}/${id}`, data);
}

export async function deleteCategory(id) {
  return api.delete(`${API_ENDPOINTS.CATEGORIES.BASE}/${id}`);
}

const validateCategoryMedia = (file) => {
  if (!UPLOAD_CONFIG.CATEGORIES.ALLOWED_TYPES.ALL.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed types: ${UPLOAD_CONFIG.CATEGORIES.ALLOWED_TYPES.ALL.join(", ")}`
    );
  }
  if (file.size > UPLOAD_CONFIG.CATEGORIES.MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${file.name}. Maximum size: ${UPLOAD_CONFIG.CATEGORIES.MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }
  return true;
};

export const uploadCategoryMedia = async (categoryId, file) => {
  // Validate file
  validateCategoryMedia(file);

  // For large files (like videos), use chunked upload
  if (file.size > UPLOAD_CONFIG.CHUNK_SIZE) {
    return api.uploadChunked(API_ENDPOINTS.CATEGORIES.MEDIA(categoryId), file);
  }
  
  // For smaller files, use regular upload
  return api.upload(API_ENDPOINTS.CATEGORIES.MEDIA(categoryId), file);
};

export const deleteCategoryMedia = async (categoryId) => {
  return api.delete(API_ENDPOINTS.CATEGORIES.MEDIA(categoryId));
};
