/**
 * AlertMessage — Alerta visual reutilizable.
 * Se autocierra si se pasa la prop `alert` del AuthContext.
 */

import React from 'react';

const ICONS = { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️' };

export default function AlertMessage({ type = 'info', message, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible d-flex align-items-center gap-2 rounded-3 py-2 mb-3`}
      role="alert"
    >
      <span>{ICONS[type] || 'ℹ️'}</span>
      <span className="flex-grow-1">{message}</span>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar"
          onClick={onClose}
        />
      )}
    </div>
  );
}
