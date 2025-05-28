import axios from "./axiosInstance";
import { API_ENDPOINTS, UPLOAD_CONFIG } from "../config/constants";

export async function fetchAllCategories() {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES.BASE);
  return response;
}

export async function createCategory(data) {
  const response = await axios.post(API_ENDPOINTS.CATEGORIES.BASE, data);
  return response;
}

export async function updateCategory(id, data) {
  const response = await axios.put(`${API_ENDPOINTS.CATEGORIES.BASE}/${id}`, data);
  return response;
}

export async function deleteCategory(id) {
  await axios.delete(`${API_ENDPOINTS.CATEGORIES.BASE}/${id}`);
}

const validateCategoryMedia = (file) => {
  if (!UPLOAD_CONFIG.CATEGORIES.ALLOWED_TYPES.ALL.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed types: ${UPLOAD_CONFIG.CATEGORIES.ALLOWED_TYPES.ALL.join(', ')}`
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
    const chunks = Math.ceil(file.size / UPLOAD_CONFIG.CHUNK_SIZE);
    
    for (let i = 0; i < chunks; i++) {
      const start = i * UPLOAD_CONFIG.CHUNK_SIZE;
      const end = Math.min(start + UPLOAD_CONFIG.CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("filename", file.name);
      formData.append("chunkIndex", i.toString());
      formData.append("totalChunks", chunks.toString());

      await axios.post(`${API_ENDPOINTS.CATEGORIES.MEDIA(categoryId)}/chunk`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  } else {
    // For smaller files, upload in one request
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(API_ENDPOINTS.CATEGORIES.MEDIA(categoryId), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
};

export const deleteCategoryMedia = async (categoryId) => {
  await axios.delete(API_ENDPOINTS.CATEGORIES.MEDIA(categoryId));
};
