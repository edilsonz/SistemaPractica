/**
 * GestionPostulaciones — Vista administrativa de todas las postulaciones del sistema.
 */

import React, { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const ESTADO_COLOR = {
  'Enviado':'secondary','En Evaluación':'warning','Seleccionado':'success','Rechazado':'danger'
};
const ESTADOS = ['En Evaluación', 'Seleccionado', 'Rechazado'];

export default function GestionPostulaciones({ postulaciones, loading, onCambiarEstado }) {
  const [filtroEst, setFiltroEst] = useState('');
  const [busqueda,  setBusqueda]  = useState('');

  if (loading) return <LoadingSpinner text="Cargando postulaciones..." />;

  const filtradas = (postulaciones || []).filter((p) => {
    const matchEst    = filtroEst ? p.estado === filtroEst : true;
    const matchSearch = busqueda
      ? [p.Estudiante?.nombre, p.Convocatoria?.titulo, p.Convocatoria?.empresa]
          .join(' ').toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return matchEst && matchSearch;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Postulaciones</h4>
        <span className="badge bg-secondary rounded-pill">{filtradas.length} resultado(s)</span>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-sm-4">
          <select className="form-select" value={filtroEst} onChange={(e) => setFiltroEst(e.target.value)}>
            <option value="">Todos los estados</option>
            {['Enviado', ...ESTADOS].map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-8">
          <input className="form-control" placeholder="Buscar por estudiante, convocatoria u organización..."
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      {filtradas.length === 0 ? (
        <EmptyState icon="📝" title="Sin postulaciones" />
      ) : (
        <div className="card border-0 shadow-sm" style={{ borderRadius:'0.75rem', overflow:'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>Estudiante</th><th>Convocatoria</th><th>Organización</th><th>Estado</th><th>Cambiar estado</th></tr>
              </thead>
              <tbody>
                {filtradas.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="fw-semibold">{p.Estudiante?.nombre || '—'}</div>
                      <small className="text-muted">{p.Estudiante?.escuela || ''}</small>
                    </td>
                    <td className="small">{p.Convocatoria?.titulo || '—'}</td>
                    <td className="text-muted small">{p.Convocatoria?.empresa || '—'}</td>
                    <td>
                      <span className={`badge bg-${ESTADO_COLOR[p.estado]||'secondary'}`}>{p.estado}</span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {ESTADOS.map((estado) => (
                          <button key={estado}
                            className={`btn btn-sm ${p.estado===estado ? 'btn-'+ESTADO_COLOR[estado] : 'btn-outline-'+ESTADO_COLOR[estado]}`}
                            disabled={p.estado === estado}
                            onClick={() => onCambiarEstado(p.id, estado)}
                          >
                            {estado}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
