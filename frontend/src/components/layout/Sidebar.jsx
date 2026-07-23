/**
 * Sidebar — Navegación lateral por rol.
 * Indicador activo con borde izquierdo, badges de pendientes, secciones agrupadas.
 */

import React from 'react';

/** Colores del badge de rol en la cabecera del sidebar */
const ROLE_META = {
  admin:      { label: 'Administrador', gradient: 'linear-gradient(135deg,#dc3545,#b02a37)' },
  empresa:    { label: 'Organización',  gradient: 'linear-gradient(135deg,#198754,#146c43)' },
  estudiante: { label: 'Estudiante',    gradient: 'linear-gradient(135deg,#0dcaf0,#0aa2c0)' },
};

/**
 * Agrupa los nav items en secciones separadas por un divisor.
 * Convención: si el primer ítem tiene section:'main' y otro tiene section:'settings',
 * se separan. Sin section, todos van juntos.
 */
function groupItems(items) {
  // Soporte simple: items con propiedad `dividerBefore: true` inician nuevo grupo.
  const groups = [];
  let current = [];
  items.forEach((item) => {
    if (item.dividerBefore && current.length > 0) {
      groups.push(current);
      current = [];
    }
    current.push(item);
  });
  if (current.length > 0) groups.push(current);
  return groups;
}

export default function Sidebar({ userRole, navItems, activePage, onNavigate, badges = {} }) {
  const meta   = ROLE_META[userRole] || { label: userRole, gradient: 'linear-gradient(135deg,#6c757d,#495057)' };
  const groups = groupItems(navItems || []);

  return (
    <nav className="sp-sidebar d-flex flex-column" aria-label="Navegación principal">
      {/* Cabecera de rol */}
      <div
        className="px-3 py-3 d-flex align-items-center gap-2"
        style={{ background: meta.gradient, color: '#fff', flexShrink: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ opacity: 0.75 }}>
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.06em', opacity: 0.9 }}>
          {meta.label}
        </span>
      </div>

      {/* Grupos de ítems */}
      <div className="flex-grow-1 py-1">
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className="sp-sidebar-divider" />}
            {group.map((item) => {
              const badgeCount = badges[item.key] || 0;
              const isActive   = activePage === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`sp-sidebar-item${isActive ? ' active' : ''}`}
                  onClick={() => onNavigate(item.key)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="sp-sidebar-icon" aria-hidden="true">{item.icon}</span>
                  )}
                  <span className="flex-grow-1">{item.label}</span>
                  {badgeCount > 0 && (
                    <span
                      className="badge rounded-pill bg-danger"
                      style={{ fontSize: '0.6rem', padding: '0.2em 0.45em' }}
                      aria-label={`${badgeCount} pendientes`}
                    >
                      {badgeCount > 9 ? '9+' : badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
