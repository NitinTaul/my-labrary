// frontend/src/services/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  withCredentials: true // important so browser sends httpOnly cookies
});

export default api;
