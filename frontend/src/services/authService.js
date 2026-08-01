import api from "../api/axios";

export const register = async (userData) => {
    const response = await api.post("/accounts/register/", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post("/accounts/login/", userData);
    return response.data;
};

export const verify_OTP = async (data) => {
    const response = await api.post("/accounts/verify-otp/", data);
    return response.data;
};

export const logout = async (refresh) => {
    const response = await api.post("/accounts/logout/", {
        refresh,
    });

    return response.data;
};

// export const forgotPassword = async (data) => {
//     const response = await api.post("/accounts/forgot-password/",data);
//     return response.data;
// };

// Send reset OTP
export const forgotPassword = async (data) => {
  const response = await api.post("/accounts/forgot-password/", data);
  return response.data;
};

// Verify Reset OTP
export const verifyResetOTP = async (data) => {
  const response = await api.post("/accounts/verify-reset-otp/", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await api.post("/accounts/reset-password/", data);
  return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get(`/accounts/me/`);
    return response.data;
};


// Get logged-in user profile
export const getProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

// Update logged-in user profile
export const updateProfile = async (data) => {
  const response = await api.put("/accounts/profile/", data);
  return response.data;
};