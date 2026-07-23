/**
 * Toast — Notificación flotante en esquina superior derecha.
 * Se autocierra a los 4 segundos con barra de progreso animada.
 * Reemplaza al alert de barra completa anterior.
 */

import React, { useEffect, useRef, useState } from 'react';

const ICONS = {
  success: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  danger: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9"  y1="9" x2="15" y2="15"/>
    </svg>
  ),
  warning: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8"  x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

const BG = {
  success: '#d1e7dd',
  danger:  '#f8d7da',
  warning: '#fff3cd',
  info:    '#cff4fc',
};
const COLOR = {
  success: '#0a3622',
  danger:  '#58151c',
  warning: '#332701',
  info:    '#055160',
};
const PROGRESS_COLOR = {
  success: '#0f5132',
  danger:  '#842029',
  warning: '#664d03',
  info:    '#087990',
};

const DURATION = 4000; // ms

function SingleToast({ type = 'info', message, onDone }) {
  const [closing, setClosing] = useState(false);
  const timerRef = useRef(null);

  function close() {
    setClosing(true);
    setTimeout(onDone, 220);
  }

  useEffect(() => {
    timerRef.current = setTimeout(close, DURATION);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className={`sp-toast${closing ? ' sp-toast-out' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ background: BG[type] || BG.info, color: COLOR[type] || COLOR.info }}
    >
      <div className="sp-toast-body">
        <span style={{ flexShrink: 0 }}>{ICONS[type] || ICONS.info}</span>
        <span className="flex-grow-1" style={{ fontWeight: 500 }}>{message}</span>
        <button
          type="button"
          aria-label="Cerrar"
          onClick={close}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '0 2px', lineHeight: 1, flexShrink: 0,
            color: COLOR[type] || COLOR.info, opacity: 0.6,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6"  y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      {/* Barra de progreso */}
      <div className="sp-toast-progress"
        style={{ background: PROGRESS_COLOR[type] || PROGRESS_COLOR.info }} />
    </div>
  );
}

/**
 * ToastContainer — renderiza la cola de toasts.
 *
 * @param {{ id, type, message }[]} toasts
 * @param {(id) => void}            onRemove
 */
export function ToastContainer({ toasts = [], onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="sp-toast-container" aria-label="Notificaciones">
      {toasts.map((t) => (
        <SingleToast
          key={t.id}
          type={t.type}
          message={t.message}
          onDone={() => onRemove(t.id)}
        />
      ))}
    </div>
  );
}

export default SingleToast;
