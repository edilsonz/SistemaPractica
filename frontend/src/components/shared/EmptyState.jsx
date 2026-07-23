/**
 * EmptyState — Estado vacío genérico para listados sin datos.
 * Muestra un icono SVG temático o un emoji, título, descripción y acción opcional.
 */

import React from 'react';

/* SVGs inline temáticos por tipo */
const SVGS = {
  list: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <line x1="8"  y1="8"  x2="16" y2="8"/>
      <line x1="8"  y1="12" x2="16" y2="12"/>
      <line x1="8"  y1="16" x2="13" y2="16"/>
    </svg>
  ),
  search: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11" strokeDasharray="2 1.5"/>
    </svg>
  ),
  bell: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  inbox: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  users: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  check: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
};

/** Elige SVG por iconKey o muestra emoji como fallback */
function IconContainer({ iconKey, emoji }) {
  const svg = SVGS[iconKey];
  return (
    <div className="sp-empty-icon mx-auto" style={{ color: '#9ca3af' }}>
      {svg || <span style={{ fontSize: '2rem', lineHeight: 1 }}>{emoji || '📭'}</span>}
    </div>
  );
}

/**
 * @param {string}      icon      - Emoji de fallback (ej: '📭')
 * @param {string}      iconKey   - Clave para SVG temático: 'list'|'search'|'bell'|'inbox'|'users'|'check'
 * @param {string}      title
 * @param {string}      description
 * @param {ReactNode}   action
 */
export default function EmptyState({
  icon,
  iconKey,
  title = 'Sin datos',
  description,
  action,
}) {
  return (
    <div className="sp-empty" role="status">
      <IconContainer iconKey={iconKey} emoji={icon} />
      <h6 className="mt-2 mb-1 fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>{title}</h6>
      {description && (
        <p className="small mb-3" style={{ maxWidth: 320, margin: '0 auto 0.75rem' }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
