import axios from "axios";

// Environment variables with fallbacks
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://rickandmortyapi.com/api";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000");

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.status === 401) {
      console.error("Session has expired, user needs to re-login");
    }
    return Promise.reject(error);
  }
);

/**
 * Generic API request function for additional endpoints if needed
 *
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - Endpoint URL
 * @param {any} [data] - Payload for POST/PUT requests
 * @param {object} [restConfig] - Additional Axios config options
 * @returns {Promise} Axios response promise
 */
export async function apiRequest(
  method: string,
  url: string,
  data: any = {},
  restConfig: any = {}
) {
  const config = {
    method,
    url,
    data,
    ...restConfig,
  };

  if (data instanceof FormData) {
    delete config.headers;
  } else {
    config.headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...config.headers,
    };
    config.data = JSON.stringify(data);
  }

  try {
    return await api(config);
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}
