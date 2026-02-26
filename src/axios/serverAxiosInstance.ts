import { CONFIG } from "@telephotos/utils/config";
import axios from "axios";
import { cookies } from "next/headers";

// Create an axios instance
const serverAxiosInstance = axios.create({
  baseURL: CONFIG.BASE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
serverAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Only run cookies logic in a server context
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("telephotos_access_token")?.value;

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
serverAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Redirect or refresh token flow here");
    }
    return Promise.reject(error);
  }
);

export default serverAxiosInstance;
