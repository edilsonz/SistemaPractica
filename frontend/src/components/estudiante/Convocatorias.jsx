/**
 * Convocatorias — Lista de convocatorias activas para el estudiante.
 * Incluye filtros por modalidad, búsqueda, días restantes e indicador de urgencia.
 */

import React, { useState, useMemo } from 'react';
import EmptyState     from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const MODALIDAD_COLOR = { Presencial: 'primary', Virtual: 'success', Híbrida: 'warning' };

/** Días que quedan hasta fecha_fin. Null si no hay fecha. */
function diasRestantes(fechaFin) {
  if (!fechaFin) return null;
  const diff = Math.ceil((new Date(fechaFin) - Date.now()) / 86_400_000);
  return diff;
}

/** Clasifica la urgencia según los días restantes */
function urgenciaClase(dias) {
  if (dias === null) return null;
  if (dias < 0)  return 'expirada';
  if (dias <= 3) return 'critica';
  if (dias <= 7) return 'urgente';
  return 'normal';
}

function DiasRestantesTag({ fechaFin }) {
  const dias = diasRestantes(fechaFin);
  if (dias === null) return null;
  const urgencia = urgenciaClase(dias);

  if (urgencia === 'expirada') {
    return (
      <span className="badge bg-secondary" style={{ fontSize: '0.68rem' }}>
        Plazo vencido
      </span>
    );
  }

  const colorMap = { critica: 'danger', urgente: 'warning', normal: 'light' };
  const textMap  = { critica: 'text-white', urgente: 'text-dark', normal: 'text-muted' };
  const color    = colorMap[urgencia] || 'light';
  const text     = textMap[urgencia]  || 'text-muted';

  return (
    <span className={`badge bg-${color} ${text} d-inline-flex align-items-center gap-1`}
      style={{ fontSize: '0.68rem' }}>
      {urgencia !== 'normal' && (
        <span className="sp-urgency-dot"
          style={{ background: urgencia === 'critica' ? '#fff' : '#495057' }} />
      )}
      {dias === 0 ? 'Cierra hoy' : `${dias}d restantes`}
    </span>
  );
}

export default function Convocatorias({ convocatorias, postuladoIds, onPostular, loading }) {
  const [modalidad, setModalidad] = useState('');
  const [busqueda,  setBusqueda]  = useState('');

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
    <div className="sp-page-enter">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <div>
          <h4 className="fw-bold mb-0">Convocatorias disponibles</h4>
          <p className="text-muted small mb-0">Oportunidades de práctica abiertas para postular</p>
        </div>
        <span className="badge bg-primary rounded-pill px-3" style={{ fontSize: '0.78rem' }}>
          {filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-sm-4">
          <select
            className="form-select form-select-sm"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            aria-label="Filtrar por modalidad"
          >
            <option value="">Todas las modalidades</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Híbrida">Híbrida</option>
          </select>
        </div>
        <div className="col-sm-8">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af"
                strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Buscar por título, empresa o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Listado */}
      {filtradas.length === 0 ? (
        <EmptyState
          iconKey="search"
          title="Sin resultados"
          description="Intenta con otros filtros o términos de búsqueda."
          action={
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => { setModalidad(''); setBusqueda(''); }}
            >
              Limpiar filtros
            </button>
          }
        />
      ) : (
        <div className="row g-3">
          {filtradas.map((c) => {
            const yaPostulo = postuladoIds?.has(c.id);
            const dias      = diasRestantes(c.fecha_fin);
            const urgencia  = urgenciaClase(dias);

            return (
              <div key={c.id} className="col-12 col-lg-6">
                <div
                  className={`sp-card h-100${urgencia === 'critica' ? ' sp-border-l-warning' : ''}`}
                  style={{ borderLeft: urgencia === 'critica' ? '4px solid #ffc107' : undefined }}
                >
                  <div className="card-body d-flex flex-column p-4">
                    {/* Fila de badges superiores */}
                    <div className="d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap">
                      <span className={`badge bg-${MODALIDAD_COLOR[c.modalidad] || 'secondary'}`}
                        style={{ fontSize: '0.72rem' }}>
                        {c.modalidad || 'Sin modalidad'}
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <DiasRestantesTag fechaFin={c.fecha_fin} />
                        {yaPostulo && (
                          <span className="badge bg-success" style={{ fontSize: '0.72rem' }}>
                            ✓ Postulado
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Título y empresa */}
                    <h6 className="fw-bold mb-1 lh-sm">{c.titulo}</h6>
                    <p className="text-muted small mb-2 d-flex align-items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      </svg>
                      {c.empresa}
                    </p>

                    {/* Descripción recortada */}
                    <p className="small text-secondary flex-grow-1 mb-3"
                      style={{
                        WebkitLineClamp: 3, overflow: 'hidden',
                        display: '-webkit-box', WebkitBoxOrient: 'vertical',
                        lineHeight: 1.55,
                      }}>
                      {c.descripcion}
                    </p>

                    {/* Fecha de cierre */}
                    {c.fecha_fin && (
                      <p className="small text-muted mb-3 d-flex align-items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8"  y1="2" x2="8"  y2="6"/>
                          <line x1="3"  y1="10" x2="21" y2="10"/>
                        </svg>
                        Cierre: {new Date(c.fecha_fin).toLocaleDateString('es-PE')}
                      </p>
                    )}

                    {/* CTA */}
                    <button
                      className={`btn btn-sm mt-auto ${yaPostulo ? 'btn-outline-success' : 'btn-primary'}`}
                      disabled={yaPostulo || loading || urgencia === 'expirada'}
                      onClick={() => !yaPostulo && onPostular(c.id)}
                      style={{ borderRadius: '0.45rem' }}
                    >
                      {yaPostulo
                        ? '✓ Ya postulaste'
                        : urgencia === 'expirada'
                          ? 'Plazo vencido'
                          : 'Postular ahora'}
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
