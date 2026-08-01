import api from "../api/axios";
// Get Recruiter Profile
export const getRecruiterProfile = async () => {
  const response = await api.get(
    "/profile/recruiterProfile/"
  );

  return response.data;
};


// Create Recruiter Profile
export const createRecruiterProfile = async (formData) => {
  const response = await api.post(
    "/profile/recruiterProfile/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};



// Update Recruiter Profile
export const updateRecruiterProfile = async (formData) => {
  const response = await api.put(
    "/profile/recruiterProfile/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};