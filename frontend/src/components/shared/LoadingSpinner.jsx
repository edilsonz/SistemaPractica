/**
 * LoadingSpinner — Indicador de carga centrado.
 */

import React from 'react';

export default function LoadingSpinner({ text = 'Cargando...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 text-muted">
      <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
        <span className="visually-hidden">Cargando…</span>
      </div>
      <small>{text}</small>
    </div>
  );
}
