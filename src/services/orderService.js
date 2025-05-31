import axios from "./axiosInstance";

export const getOrderHistory = async () => {
  const response = await axios.get("/orders");
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post("/orders", orderData);
  return response.data;
}; 