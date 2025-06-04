import axiosInstance from "./axiosInstance";

export async function loginUser(email, password) {
  const response = await axiosInstance.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function registerUser(userData) {
  const response = await axiosInstance.post("/auth/register", userData, {
    withCredentials: true,
  });
  return response.data;
}
