import api from "../api/axios";

export const getJobs = async () => {
  const response = await api.get("/jobs/");

  return response.data;
};

export const createJob = (data) => {
  return api.post("/jobs/", data);
};

export const updateJob = (id, data) => {
  return api.put(`/jobs/${id}/`, data);
};

export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}/`);
};



export const getAvailableJobs = async () => {
  console.log("Calling jobs API...");
  const response = await api.get("/jobs/all/");
  console.log("Response:", response);
  return response.data;
};


export const getJob = async (id) => {
  const response = await api.get(`/jobs/details/${id}/`);

  return response.data;
};