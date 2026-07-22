/**
 * Servicio de convocatorias — capa de acceso a datos del frontend.
 */

import { apiFetch } from '../utils/api';

export async function getConvocatorias(token, { activo, modalidad } = {}) {
  const params = new URLSearchParams();
  if (activo !== undefined) params.set('activo', activo);
  if (modalidad) params.set('modalidad', modalidad);
  const query = params.toString() ? `?${params}` : '';
  return apiFetch(`/api/convocatorias${query}`, {}, token);
}

export async function createConvocatoria(token, datos) {
  return apiFetch('/api/convocatorias', { method: 'POST', body: JSON.stringify(datos) }, token);
}

export async function updateConvocatoria(token, id, cambios) {
  return apiFetch(`/api/convocatorias/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) }, token);
}
