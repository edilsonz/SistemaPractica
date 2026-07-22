/**
 * Navbar — Barra superior de la aplicación.
 * Muestra el nombre del sistema, datos del usuario y botón de cierre de sesión.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ROL_LABEL = { admin: 'Administrador', empresa: 'Organización', estudiante: 'Estudiante' };

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4 py-2"
      style={{ background: 'linear-gradient(90deg, #0d6efd 0%, #6610f2 100%)' }}
    >
      <span className="navbar-brand fw-bold fs-5">
        🎓 Sistema de Prácticas UNSCH
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">
        {user && (
          <>
            <div className="text-white text-end d-none d-md-block">
              <div className="fw-semibold lh-1">{user.nombre}</div>
              <small className="text-white-50">{ROL_LABEL[user.rol] || user.rol}</small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
