import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  console.log("Token:", token);
  console.log("Before headers:", config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("After headers:", config.headers);

  return config;
});


export default api;