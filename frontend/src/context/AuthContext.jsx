/**
 * AuthContext — Estado global de autenticación.
 * Provee token, usuario y helpers de sesión a toda la app.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiFetch } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  const login = useCallback(async (email, password, rol) => {
    setLoading(true);
    try {
      const { ok, data } = await apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, rol }),
      });

      if (!ok) {
        showAlert('danger', data.message || 'Credenciales incorrectas.');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      showAlert('success', 'Sesión iniciada correctamente.');
      return true;
    } catch {
      showAlert('danger', 'Error de red. Verifica tu conexión.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  const register = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { ok, data } = await apiFetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!ok) {
        showAlert('warning', data.message || 'Error al crear la cuenta.');
        return { ok: false };
      }

      showAlert('success', data.message || 'Cuenta creada. Ahora inicia sesión.');
      return { ok: true, data };
    } catch {
      showAlert('warning', 'Error de red al crear la cuenta.');
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, alert, login, register, logout, showAlert }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
