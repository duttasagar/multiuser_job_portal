import api from '../api/axios'
 const applyJob = (jobId) => {
  return api.post(`/applications/apply/${jobId}/`);
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications/");
  return response.data;
};

export const getRecruiterApplications = async () => {
  const response = await api.get(
    "/applications/recruiter-applications/"
  );

  return response.data;
};



export const updateApplicationStatus = async (
  applicationId,
  status
) => {

  const response = await api.put(
    `/applications/status/${applicationId}/`,
    {
      status,
    }
  );

  return response.data;
};

export default applyJob