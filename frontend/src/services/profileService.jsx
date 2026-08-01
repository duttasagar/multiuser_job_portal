import api from "../api/axios";

export const getProfile = () => {
  return api.get("/profile/");
};

// export const createProfile = (data) => {
//   return api.post("/profile/", data);
// };

// export const updateProfile = (data) => {
//   return api.put("/profile/", data);
// };

export const updateProfile = (data) => {
  return api.put("/profile/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const createProfile = (data) => {
  return api.post("/profile/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getProfileCompletion = async () => {
    const response = await api.get("/profile/completion/");
    return response.data;
};




