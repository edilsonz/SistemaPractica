/**
 * MisPostulaciones — Historial de postulaciones del estudiante con estado actual.
 */

import React from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const ESTADO_CONFIG = {
  'Enviado':       { color: 'secondary', icon: '📤' },
  'En Evaluación': { color: 'warning',   icon: '🔍' },
  'Seleccionado':  { color: 'success',   icon: '🎉' },
  'Rechazado':     { color: 'danger',    icon: '❌' },
};

export default function MisPostulaciones({ postulaciones, loading, onNavigate }) {
  if (loading) return <LoadingSpinner text="Cargando postulaciones..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Mis postulaciones</h4>
        <span className="badge bg-secondary rounded-pill">{(postulaciones || []).length} total</span>
      </div>

      {(postulaciones || []).length === 0 ? (
        <EmptyState
          icon="📭"
          title="Aún no has postulado"
          description="Explora las convocatorias disponibles y da el primer paso."
          action={
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('convocatorias')}>
              Ver convocatorias
            </button>
          }
        />
      ) : (
        <div className="row g-3">
          {(postulaciones || []).map((p) => {
            const conv  = p.Convocatoria || p.convocatoria || {};
            const cfg   = ESTADO_CONFIG[p.estado] || ESTADO_CONFIG['Enviado'];
            return (
              <div key={p.id} className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '0.75rem' }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className={`badge bg-${cfg.color}`}>{cfg.icon} {p.estado}</span>
                      <small className="text-muted">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString('es-PE') : ''}
                      </small>
                    </div>
                    <h6 className="fw-bold mb-1">{conv.titulo || '—'}</h6>
                    <p className="text-muted small mb-1">🏢 {conv.empresa || '—'}</p>
                    {conv.modalidad && (
                      <span className="badge bg-light text-dark border me-1">{conv.modalidad}</span>
                    )}
                    {conv.fecha_fin && (
                      <small className="text-muted d-block mt-2">
                        📅 Cierre: {new Date(conv.fecha_fin).toLocaleDateString('es-PE')}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
