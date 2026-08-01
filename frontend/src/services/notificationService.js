import api from "../api/axios";

export const getNotifications = async () => {
  const response = await api.get("/notifications/");
  return response.data;
};

export const markNotificationRead = async (id) => {
  await api.put(`/notifications/${id}/read/`);
};