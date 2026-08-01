

import api from "../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/recruiter/dashboard/");
  return response.data;
};