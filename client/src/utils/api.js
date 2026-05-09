import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
      
      // Never silently swallow: explicitly alert the user
      window.alert(`Rate Limit Exceeded: ${displayMessage}`);
      
      return Promise.reject(new Error(displayMessage));
    }
    return Promise.reject(error);
  }
);

export default api;
