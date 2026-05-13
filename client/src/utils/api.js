import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Origin for static assets served by the API (e.g. /uploads/*)
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to add the JWT token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle rate limit errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      const message = error.response.data?.message || 'Too many requests. Please try again later.';
      const retryAfter = error.response.headers['retry-after'];
      
      let displayMessage = message;
      if (retryAfter) {
        displayMessage += ` (Please wait ${retryAfter} seconds)`;
      }
      
      return Promise.reject(new Error(displayMessage));
    }
    return Promise.reject(error);
  }
);

export default api;
