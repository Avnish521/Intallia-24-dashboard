import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // Set to `true` if cookies/session are required
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

//Attach token to every request
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Handle responses and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Directly return response.data for convenience
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn('Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    if (status >= 500) {
      console.error('Server error:', error.response?.data?.message || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
