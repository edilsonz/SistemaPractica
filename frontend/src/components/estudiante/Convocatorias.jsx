/**
 * Convocatorias — Lista de convocatorias activas para el estudiante.
 * Incluye filtros por modalidad y búsqueda por texto.
 */

import React, { useState, useMemo } from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const MODALIDAD_COLOR = { Presencial: 'primary', Virtual: 'success', Híbrida: 'warning' };

export default function Convocatorias({ convocatorias, postuladoIds, onPostular, loading }) {
  const [modalidad, setModalidad] = useState('');
  const [busqueda, setBusqueda]   = useState('');

  const filtradas = useMemo(() => {
    return (convocatorias || []).filter((c) => {
      const matchModal  = modalidad ? c.modalidad === modalidad : true;
      const matchSearch = busqueda
        ? [c.titulo, c.empresa, c.descripcion].join(' ').toLowerCase().includes(busqueda.toLowerCase())
        : true;
      return matchModal && matchSearch;
    });
  }, [convocatorias, modalidad, busqueda]);

  if (loading) return <LoadingSpinner text="Cargando convocatorias..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h4 className="fw-bold mb-0">Convocatorias disponibles</h4>
        <span className="badge bg-primary rounded-pill">{filtradas.length} resultado(s)</span>
      </div>

      {/* Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-sm-4">
          <select className="form-select" value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
            <option value="">Todas las modalidades</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Híbrida">Híbrida</option>
          </select>
        </div>
        <div className="col-sm-8">
          <input
            className="form-control"
            placeholder="Buscar por título, empresa o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Listado */}
      {filtradas.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Sin resultados"
          description="Intenta con otros filtros o términos de búsqueda."
          action={
            <button className="btn btn-outline-secondary btn-sm" onClick={() => { setModalidad(''); setBusqueda(''); }}>
              Limpiar filtros
            </button>
          }
        />
      ) : (
        <div className="row g-3">
          {filtradas.map((c) => {
            const yaPostulo = postuladoIds?.has(c.id);
            return (
              <div key={c.id} className="col-12 col-lg-6">
                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className={`badge bg-${MODALIDAD_COLOR[c.modalidad] || 'secondary'}`}>
                        {c.modalidad || 'Sin modalidad'}
                      </span>
                      {yaPostulo && <span className="badge bg-success">✓ Postulado</span>}
                    </div>

                    <h6 className="fw-bold mb-1">{c.titulo}</h6>
                    <p className="text-muted small mb-1">🏢 {c.empresa}</p>
                    <p className="small text-secondary flex-grow-1" style={{ WebkitLineClamp: 3, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                      {c.descripcion}
                    </p>

                    {c.fecha_fin && (
                      <p className="small text-muted mb-2">
                        📅 Cierre: {new Date(c.fecha_fin).toLocaleDateString('es-PE')}
                      </p>
                    )}

                    <button
                      className={`btn btn-sm mt-auto ${yaPostulo ? 'btn-outline-success' : 'btn-primary'}`}
                      disabled={yaPostulo || loading}
                      onClick={() => !yaPostulo && onPostular(c.id)}
                    >
                      {yaPostulo ? '✓ Ya postulaste' : 'Postular ahora'}
                    </button>
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
