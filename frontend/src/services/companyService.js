import api from "../api/axios";

export const getCompanies = () => {
  return api.get("/companies/");
};

// export const getCompanies = async () => {
//   const response = await api.get("/companies/");
//   return response.data;
// };


export const getCompany = (id) => {
  return api.get(`/companies/${id}/`);
};

export const createCompany = (data) => {
  return api.post("/companies/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCompany = (id, data) => {
  return api.put(`/companies/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCompany = (id) => {
  return api.delete(`/companies/${id}/`);
};



