/**
 * StatCard — Tarjeta de estadística reutilizable para dashboards.
 */

import React from 'react';

const COLOR_MAP = {
  primary: { bg: 'bg-primary',   text: 'text-white' },
  success: { bg: 'bg-success',   text: 'text-white' },
  warning: { bg: 'bg-warning',   text: 'text-dark'  },
  info:    { bg: 'bg-info',      text: 'text-dark'  },
  light:   { bg: 'bg-light',     text: 'text-dark'  },
};

export default function StatCard({ label, value, icon, color = 'light', footer }) {
  const { bg, text } = COLOR_MAP[color] || COLOR_MAP.light;

  return (
    <div className={`card h-100 border-0 shadow-sm ${bg} ${text}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <small className="fw-semibold opacity-75 text-uppercase" style={{ fontSize: '0.7rem' }}>
            {label}
          </small>
          {icon && <span style={{ fontSize: '1.4rem', opacity: 0.6 }}>{icon}</span>}
        </div>
        <div className="display-6 fw-bold mt-1">{value ?? 0}</div>
        {footer && <small className="opacity-75 mt-1">{footer}</small>}
      </div>
    </div>
  );
}
