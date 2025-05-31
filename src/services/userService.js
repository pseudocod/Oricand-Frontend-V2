import axios from "./axiosInstance";

export const getCurrentUser = async () => {
  const res = await axios.get("/users/me");
  return res.data;
};

export const updateCurrentUser = async (updateData) => {
  const res = await axios.put("/users/me", updateData);
  return res.data;
};

export const changePassword = async (passwordData) => {
  await axios.put("/users/me/password", passwordData);
};
