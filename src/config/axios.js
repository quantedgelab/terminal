import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("auth_token");

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Common error messages that indicate connection issues
    const connectionErrors = ["Failed to connect to server", "ERR_CONNECTION_TIMED_OUT", "ECONNABORTED", "Network Error"];

    // Check if error message includes any of the connection error patterns
    const isConnectionError = connectionErrors.some((errMsg) => error.message?.includes(errMsg) || error.code === errMsg);

    if (isConnectionError || !error.response) {
      toast.error("Network error. Please check your internet connection.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
