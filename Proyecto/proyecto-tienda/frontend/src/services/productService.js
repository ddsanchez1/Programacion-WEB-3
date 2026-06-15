import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/productos");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post("/productos", product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await api.put(`/productos/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};