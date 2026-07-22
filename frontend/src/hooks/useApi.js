/**
 * Hook genérico para llamadas a la API con manejo de estado.
 */

import { useState, useCallback } from 'react';
import { apiFetch } from '../utils/api';
import { useAuth } from '../context/AuthContext';

/**
 * Devuelve { data, loading, error, execute }
 * execute(endpoint, options?) dispara la petición con el token del contexto.
 */
export function useApi() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (endpoint, options = {}) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFetch(endpoint, options, token);
        if (!result.ok) setError(result.data?.message || 'Error en la petición.');
        return result;
      } catch (err) {
        setError('Error de red.');
        return { ok: false, data: {} };
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { loading, error, execute };
}
