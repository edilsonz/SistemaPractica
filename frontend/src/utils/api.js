/**
 * Cliente HTTP centralizado.
 * Todas las llamadas a la API pasan por aquí para evitar repetición de lógica.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Realiza una petición a la API.
 * @param {string} endpoint - Ruta relativa, ej: '/api/login'
 * @param {object} options  - Opciones fetch (method, body, etc.)
 * @param {string} token    - JWT opcional para Authorization header
 */
async function apiFetch(endpoint, options = {}, token = null) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  return { ok: res.ok, status: res.status, data };
}

export { apiFetch, API_URL };
