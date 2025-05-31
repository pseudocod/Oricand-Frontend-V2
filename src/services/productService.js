import axios from "./axiosInstance";

export const fetchAllProducts = async () => {
  const res = await axios.get("/products");
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`/products/${id}`);
  return res.data;
};

export const fetchProductsByCategoryId = async (categoryId) => {
  const res = await axios.get(`/products/category/${categoryId}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post("/products", productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/products/${id}`);
};

export const uploadProductImages = async (productId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  await axios.post(`/products/${productId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductImage = async (productId, imageId) => {
  await axios.delete(`/products/${productId}/images/${imageId}`);
};

export const setFeaturedImage = async (productId, imageId) => {
  await axios.put(`/products/${productId}/images/${imageId}/feature`);
};
