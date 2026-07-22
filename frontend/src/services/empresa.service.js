/**
 * Servicio de empresas — capa de acceso a datos del frontend.
 */

import { apiFetch } from '../utils/api';

export async function getEmpresasPendientes(token) {
  return apiFetch('/api/empresas/pending', {}, token);
}

export async function aprobarEmpresa(token, id) {
  return apiFetch(`/api/empresas/${id}/approve`, { method: 'PATCH' }, token);
}
