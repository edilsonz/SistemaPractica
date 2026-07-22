/**
 * MisConvocatorias — Lista y gestión de convocatorias de la organización.
 */

import React, { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const MODALIDAD_COLOR = { Presencial: 'primary', Virtual: 'success', Híbrida: 'warning' };

export default function MisConvocatorias({ convocatorias, loading, onToggleActivo, onNavigate }) {
  const [filtro, setFiltro] = useState('todas');

  const filtradas = (convocatorias || []).filter((c) => {
    if (filtro === 'activas')  return c.activo;
    if (filtro === 'cerradas') return !c.activo;
    return true;
  });

  if (loading) return <LoadingSpinner text="Cargando convocatorias..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h4 className="fw-bold mb-0">Mis convocatorias</h4>
        <button className="btn btn-success btn-sm" onClick={() => onNavigate('crear-convocatoria')}>
          + Nueva convocatoria
        </button>
      </div>

      {/* Filtro rápido */}
      <div className="btn-group mb-4" role="group">
        {['todas', 'activas', 'cerradas'].map((f) => (
          <button
            key={f}
            type="button"
            className={`btn btn-sm ${filtro === f ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtradas.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Sin convocatorias"
          description="Publica tu primera convocatoria para empezar a recibir postulantes."
          action={
            <button className="btn btn-success btn-sm" onClick={() => onNavigate('crear-convocatoria')}>
              Crear convocatoria
            </button>
          }
        />
      ) : (
        <div className="row g-3">
          {filtradas.map((c) => (
            <div key={c.id} className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '0.75rem' }}>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className={`badge bg-${MODALIDAD_COLOR[c.modalidad] || 'secondary'}`}>
                      {c.modalidad}
                    </span>
                    <span className={`badge ${c.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {c.activo ? '● Activa' : '● Cerrada'}
                    </span>
                  </div>
                  <h6 className="fw-bold mb-1">{c.titulo}</h6>
                  <p
                    className="small text-secondary flex-grow-1"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {c.descripcion}
                  </p>
                  {c.fecha_fin && (
                    <small className="text-muted mb-2">
                      📅 Cierre: {new Date(c.fecha_fin).toLocaleDateString('es-PE')}
                    </small>
                  )}
                  {onToggleActivo && (
                    <button
                      className={`btn btn-sm mt-auto ${c.activo ? 'btn-outline-danger' : 'btn-outline-success'}`}
                      onClick={() => onToggleActivo(c.id, !c.activo)}
                    >
                      {c.activo ? 'Cerrar convocatoria' : 'Reactivar convocatoria'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
