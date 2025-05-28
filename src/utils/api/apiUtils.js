import axiosInstance from './axiosConfig';
import { API_CONFIG } from '@/config/constants';

const cache = new Map();

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWithRetry = async (url, options = {}) => {
  const {
    method = 'GET',
    data = null,
    maxRetries = API_CONFIG.MAX_RETRIES,
    retryDelay = API_CONFIG.RETRY_DELAY,
    useCache = false,
    cacheDuration = 5 * 60 * 1000, // 5 minutes
    ...rest
  } = options;

  // Check cache for GET requests
  if (useCache && method === 'GET') {
    const cacheKey = `${method}:${url}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
      return cachedData.data;
    }
  }

  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        ...rest
      });

      // Cache successful GET requests
      if (useCache && method === 'GET') {
        const cacheKey = `${method}:${url}`;
        cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }

      return response.data;
    } catch (error) {
      lastError = error;

      // Don't retry on certain status codes
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await wait(retryDelay * Math.pow(2, i)); // Exponential backoff
      }
    }
  }

  throw lastError;
};

export const clearCache = (url) => {
  if (url) {
    cache.delete(`GET:${url}`);
  } else {
    cache.clear();
  }
};

export const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress?.(percentCompleted);
    },
  });
};

export const uploadChunkedFile = async (url, file, onProgress) => {
  const chunkSize = 1024 * 1024 * 5; // 5MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);
  let uploadedChunks = 0;

  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize);
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('totalChunks', totalChunks);
    formData.append('chunkIndex', Math.floor(start / chunkSize));

    await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    uploadedChunks++;
    onProgress?.(Math.round((uploadedChunks * 100) / totalChunks));
  }
}; 