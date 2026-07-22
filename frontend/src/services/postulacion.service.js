/**
 * Servicio de postulaciones — capa de acceso a datos del frontend.
 */

import { apiFetch } from '../utils/api';

export async function getPostulaciones(token) {
  return apiFetch('/api/postulaciones', {}, token);
}

export async function postular(token, convocatoriaId) {
  return apiFetch('/api/postular', { method: 'POST', body: JSON.stringify({ convocatoriaId }) }, token);
}

export async function updateEstadoPostulacion(token, id, estado) {
  return apiFetch(`/api/postulaciones/${id}`, { method: 'PATCH', body: JSON.stringify({ estado }) }, token);
}
