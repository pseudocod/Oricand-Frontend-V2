import axios from "axios";

const API_URL = "http://localhost:8080";

export async function loginUser(email, password) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
}
