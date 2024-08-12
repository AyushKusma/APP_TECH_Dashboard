import axios from "axios";

export const imageApiUrl = "http://apptechnologies.co/storage/media";
const authApiUrl = "https://apptechnologies.co/api";
const apiUrl = `${authApiUrl}/admin`;
const apiConfig = {
  baseURL: apiUrl,
};
const authApiConfig = {
  baseURL: authApiUrl,
};

const api = axios.create(apiConfig);
const authApi = axios.create(authApiConfig);

// Add an interceptor to set the Authorization header before each request
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    // If a token exists, set the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, authApi };
