/**
 * EmptyState — Estado vacío genérico para listados sin datos.
 */

import React from 'react';

export default function EmptyState({ icon = '📭', title = 'Sin datos', description, action }) {
  return (
    <div className="text-center py-5 text-muted">
      <div style={{ fontSize: '3rem' }}>{icon}</div>
      <h6 className="mt-3 mb-1 text-dark">{title}</h6>
      {description && <p className="small mb-3">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
