import { CONFIG } from "@telephotos/utils/config";
import axios from "axios";

// Create an axios instance
const clientAxiosInstance = axios.create({
  baseURL: CONFIG.BASE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
clientAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Only run cookies logic in a server context

      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      // In client context `cookies()` will throw,
      // so we just ignore and move on
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor (e.g., to handle 401 globally)
clientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Redirect or refresh token flow here");
    }
    return Promise.reject(error);
  }
);

export default clientAxiosInstance;
