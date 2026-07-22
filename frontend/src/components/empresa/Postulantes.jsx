/**
 * Postulantes — Vista de postulantes a las convocatorias de la organización.
 * Permite revisar perfiles y cambiar el estado de cada postulación.
 */

import React, { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const ESTADOS = ['En Evaluación', 'Seleccionado', 'Rechazado'];
const ESTADO_COLOR = {
  'Enviado':       'secondary',
  'En Evaluación': 'warning',
  'Seleccionado':  'success',
  'Rechazado':     'danger',
};

export default function Postulantes({ postulaciones, loading, onCambiarEstado }) {
  const [filtroCon, setFiltroCon] = useState('');
  const [filtroEst, setFiltroEst] = useState('');

  if (loading) return <LoadingSpinner text="Cargando postulantes..." />;

  // Convocatorias únicas para el filtro
  const convocatoriasUnicas = [...new Map(
    (postulaciones || []).map((p) => [p.Convocatoria?.id, p.Convocatoria?.titulo])
  ).entries()].filter(([id]) => id);

  const filtradas = (postulaciones || []).filter((p) => {
    const matchCon = filtroCon ? String(p.Convocatoria?.id) === filtroCon : true;
    const matchEst = filtroEst ? p.estado === filtroEst : true;
    return matchCon && matchEst;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Postulantes</h4>
        <span className="badge bg-primary rounded-pill">{filtradas.length} resultado(s)</span>
      </div>

      {/* Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-sm-6">
          <select className="form-select" value={filtroCon} onChange={(e) => setFiltroCon(e.target.value)}>
            <option value="">Todas las convocatorias</option>
            {convocatoriasUnicas.map(([id, titulo]) => (
              <option key={id} value={id}>{titulo}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-6">
          <select className="form-select" value={filtroEst} onChange={(e) => setFiltroEst(e.target.value)}>
            <option value="">Todos los estados</option>
            {['Enviado', ...ESTADOS].map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {filtradas.length === 0 ? (
        <EmptyState icon="👥" title="Sin postulantes" description="Aún no hay postulaciones a tus convocatorias." />
      ) : (
        <div className="row g-3">
          {filtradas.map((p) => {
            const est  = p.Estudiante || {};
            const conv = p.Convocatoria || {};
            return (
              <div key={p.id} className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '0.75rem' }}>
                  <div className="card-body">
                    {/* Encabezado */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: 42, height: 42, flexShrink: 0 }}
                        >
                          {(est.nombre || 'E').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-semibold">{est.nombre || '—'}</div>
                          <small className="text-muted">{est.escuela || 'Sin escuela registrada'}</small>
                        </div>
                      </div>
                      <span className={`badge bg-${ESTADO_COLOR[p.estado] || 'secondary'}`}>{p.estado}</span>
                    </div>

                    {/* Datos */}
                    <p className="small text-muted mb-1">📋 {conv.titulo || '—'}</p>
                    {est.telefono && <p className="small text-muted mb-1">📞 {est.telefono}</p>}
                    {est.email    && <p className="small text-muted mb-1">✉️ {est.email}</p>}
                    {est.cv_url   && (
                      <a href={est.cv_url} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm mb-3">
                        Ver CV →
                      </a>
                    )}

                    {/* Acciones */}
                    <div className="d-flex flex-wrap gap-1 mt-2">
                      {ESTADOS.map((estado) => (
                        <button
                          key={estado}
                          className={`btn btn-sm ${p.estado === estado ? 'btn-' + ESTADO_COLOR[estado] : 'btn-outline-' + ESTADO_COLOR[estado]}`}
                          disabled={p.estado === estado}
                          onClick={() => onCambiarEstado(p.id, estado)}
                        >
                          {estado}
                        </button>
                      ))}
                    </div>
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
