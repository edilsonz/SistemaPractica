/**
 * LoadingSpinner — Indicador de carga con animación de pulso.
 * Acepta una prop `overlay` para mostrarse sobre el contenido existente.
 */

import React from 'react';

export default function LoadingSpinner({ text = 'Cargando...', overlay = false }) {
  const inner = (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 text-muted">
      <div className="sp-loading-pulse" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {text && (
        <small style={{ fontSize: '0.8rem', letterSpacing: '0.02em' }}>{text}</small>
      )}
    </div>
  );

  if (!overlay) return inner;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderRadius: 'inherit',
      }}
      role="status"
      aria-live="polite"
    >
      {inner}
    </div>
  );
}
