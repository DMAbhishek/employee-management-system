// frontend/src/services/api.js
// ─────────────────────────────────────────────────────────────
// Central Axios instance shared across all service files.
//
// Features:
//   • Base URL from .env variable (REACT_APP_API_BASE_URL)
//   • Auto-attaches JWT from localStorage to every request
//   • Handles 401 Unauthorized by logging out automatically
// ─────────────────────────────────────────────────────────────
import axios from 'axios';

// Vite exposes env vars via import.meta.env (not process.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15-second timeout
});

// ── Request interceptor ───────────────────────────────────────
// Runs before every request is sent.
// Reads the JWT from localStorage and adds it to the header.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ──────────────────────────────────────
// Runs when the backend sends a response.
// If the token is expired or invalid (401), auto-logout.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired – clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

