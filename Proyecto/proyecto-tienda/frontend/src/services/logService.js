import api from "./api";

export const getLogs = async () => {
  const { data } = await api.get(
    "/logs",
  );

  return data;
};

export const getLogStats =
  async () => {
    const { data } =
      await api.get(
        "/logs/stats",
      );

    return data;
  };