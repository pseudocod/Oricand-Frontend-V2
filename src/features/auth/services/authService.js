import api from "@/utils/api";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/config/constants";

export async function loginUser(email, password) {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  return response;
}

export async function registerUser(userData) {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response;
}

export function getStoredUser() {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Error parsing stored user:", e);
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function storeUserData(userData, token) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function clearUserData() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}
