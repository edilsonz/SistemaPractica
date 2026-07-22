/**
 * GestionConvocatorias — Vista administrativa de todas las convocatorias del sistema.
 */

import React, { useState } from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

const MODALIDAD_COLOR = { Presencial: 'primary', Virtual: 'success', Híbrida: 'warning' };

export default function GestionConvocatorias({ convocatorias, loading, onToggleActivo }) {
  const [filtro,    setFiltro]    = useState('todas');
  const [busqueda,  setBusqueda]  = useState('');

  if (loading) return <LoadingSpinner text="Cargando convocatorias..." />;

  const filtradas = (convocatorias || []).filter((c) => {
    const matchEstado  = filtro === 'activas' ? c.activo : filtro === 'cerradas' ? !c.activo : true;
    const matchSearch  = busqueda
      ? [c.titulo, c.empresa].join(' ').toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return matchEstado && matchSearch;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Convocatorias</h4>
        <span className="badge bg-secondary rounded-pill">{filtradas.length} resultado(s)</span>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-sm-4">
          <div className="btn-group w-100" role="group">
            {['todas','activas','cerradas'].map((f) => (
              <button key={f} type="button"
                className={`btn btn-sm ${filtro===f?'btn-primary':'btn-outline-primary'}`}
                onClick={() => setFiltro(f)}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="col-sm-8">
          <input className="form-control" placeholder="Buscar por título o empresa..."
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      {filtradas.length === 0 ? (
        <EmptyState icon="📋" title="Sin convocatorias" />
      ) : (
        <div className="card border-0 shadow-sm" style={{ borderRadius:'0.75rem', overflow:'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Título</th><th>Organización</th><th>Modalidad</th><th>Estado</th><th>Cierre</th><th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((c) => (
                  <tr key={c.id}>
                    <td className="fw-semibold">{c.titulo}</td>
                    <td className="text-muted small">{c.empresa}</td>
                    <td><span className={`badge bg-${MODALIDAD_COLOR[c.modalidad]||'secondary'}`}>{c.modalidad}</span></td>
                    <td>
                      <span className={`badge ${c.activo ? 'bg-success' : 'bg-secondary'}`}>
                        {c.activo ? 'Activa' : 'Cerrada'}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {c.fecha_fin ? new Date(c.fecha_fin).toLocaleDateString('es-PE') : '—'}
                    </td>
                    <td>
                      {onToggleActivo && (
                        <button
                          className={`btn btn-sm ${c.activo ? 'btn-outline-danger' : 'btn-outline-success'}`}
                          onClick={() => onToggleActivo(c.id, !c.activo)}
                        >
                          {c.activo ? 'Cerrar' : 'Activar'}
                        </button>
                      )}
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
