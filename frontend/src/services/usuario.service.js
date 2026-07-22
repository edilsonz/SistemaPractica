/**
 * Servicio de usuarios y perfil — capa de acceso a datos del frontend.
 */

import { apiFetch } from '../utils/api';

export async function getPerfil(token) {
  return apiFetch('/api/perfil', {}, token);
}

export async function updatePerfil(token, datos) {
  return apiFetch('/api/perfil', { method: 'PATCH', body: JSON.stringify(datos) }, token);
}

export async function getUsuarios(token) {
  return apiFetch('/api/usuarios', {}, token);
}
