import api from "./api";

export const login = async (correo, password) => {
  const response = await api.post("/auth/login", {
    correo,
    password,
  });

  return response.data;
};

export const register = async (nombre, correo, password, captchaToken) => {
  const response = await api.post("/auth/register", {
    nombre,
    correo,
    password,
    captchaToken,
  });

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
