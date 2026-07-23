/**
 * Navbar — Barra superior de la aplicación.
 * Muestra el nombre del sistema, datos del usuario y botón de cierre de sesión.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ROL_LABEL = { admin: 'Administrador', empresa: 'Organización', estudiante: 'Estudiante' };

/** Inicial del nombre o fallback '?' */
function getInitial(nombre) {
  return (nombre || '?').trim().charAt(0).toUpperCase();
}

export default function Navbar({ pendingCount = 0 }) {
  const { user, logout } = useAuth();

  return (
    <nav className="sp-navbar navbar navbar-dark px-3 px-md-4">
      {/* Brand */}
      <span className="navbar-brand fw-bold d-flex align-items-center gap-2" style={{ fontSize: '1rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
        <span className="d-none d-sm-inline">Sistema de Prácticas</span>
        <span className="d-inline d-sm-none">SP UNSCH</span>
        <span className="badge ms-1 d-none d-md-inline"
          style={{ background: 'rgba(255,255,255,0.15)', fontSize: '0.65rem', fontWeight: 600 }}>
          UNSCH
        </span>
      </span>

      {/* Zona derecha */}
      {user && (
        <div className="ms-auto d-flex align-items-center gap-2 gap-md-3">
          {/* Nombre + rol — solo en pantallas medianas+ */}
          <div className="text-white text-end d-none d-md-block" style={{ lineHeight: 1.2 }}>
            <div className="fw-semibold" style={{ fontSize: '0.875rem' }}>{user.nombre}</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.65 }}>{ROL_LABEL[user.rol] || user.rol}</div>
          </div>

          {/* Avatar con inicial + badge de pendientes */}
          <div className="position-relative">
            <div
              className={`sp-avatar sp-avatar--${user.rol}`}
              title={`${user.nombre} (${ROL_LABEL[user.rol] || user.rol})`}
              aria-label={`Usuario: ${user.nombre}`}
            >
              {getInitial(user.nombre)}
            </div>
            {pendingCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6rem', padding: '0.2em 0.45em', minWidth: '16px' }}
                aria-label={`${pendingCount} pendientes`}
              >
                {pendingCount > 9 ? '9+' : pendingCount}
              </span>
            )}
          </div>

          {/* Botón cerrar sesión */}
          <button
            className="btn btn-sm d-flex align-items-center gap-1"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              fontSize: '0.8rem',
              borderRadius: '0.4rem',
            }}
            onClick={logout}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="d-none d-sm-inline">Salir</span>
          </button>
        </div>
      )}
    </nav>
  );
}
