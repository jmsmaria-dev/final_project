import axios from 'axios';

// Default to same-origin in production (so NGINX can proxy /api),
// allow override in development via REACT_APP_API_BASE.
const API_BASE = process.env.REACT_APP_API_BASE || '';

export function apiClient(token) {
  const instance = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return instance;
}
