import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Origin for static assets served by the API (e.g. /uploads/*)
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send httpOnly auth cookie cross-origin
  // Custom header the server requires on cookie-authenticated, state-changing
  // requests as a CSRF defense. A cross-site <form> cannot set this header.
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

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
