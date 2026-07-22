/**
 * Sidebar — Navegación lateral por rol.
 * Recibe los items del menú y la página activa.
 */

import React from 'react';

const ROLE_COLORS = {
  admin: 'primary',
  empresa: 'success',
  estudiante: 'info',
};

export default function Sidebar({ userRole, navItems, activePage, onNavigate }) {
  const color = ROLE_COLORS[userRole] || 'secondary';

  return (
    <div className="d-flex flex-column h-100">
      <div className={`text-white text-center py-3 bg-${color} rounded-top`}>
        <small className="text-uppercase fw-bold opacity-75">Menú</small>
      </div>
      <div className="list-group list-group-flush flex-grow-1 rounded-bottom border">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`list-group-item list-group-item-action text-start border-0 py-3 ${
              activePage === item.key ? `active bg-${color} text-white` : ''
            }`}
            onClick={() => onNavigate(item.key)}
          >
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
