/**
 * GestionEmpresas — Aprobación de organizaciones colaboradoras pendientes.
 */

import React from 'react';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function GestionEmpresas({ empresasPendientes, loading, onAprobar, onRecargar }) {
  if (loading) return <LoadingSpinner text="Cargando organizaciones..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Organizaciones pendientes</h4>
          <p className="text-muted mb-0">Organizaciones registradas que requieren aprobación para acceder al sistema.</p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={onRecargar}>↻ Actualizar</button>
      </div>

      {(empresasPendientes || []).length === 0 ? (
        <EmptyState icon="✅" title="Sin pendientes" description="No hay organizaciones esperando aprobación." />
      ) : (
        <div className="row g-3">
          {(empresasPendientes || []).map((emp) => (
            <div key={emp.id} className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm border-start border-4 border-warning" style={{ borderRadius: '0.75rem' }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-bold mb-0">{emp.razon_social || emp.nombre}</h6>
                      <small className="text-muted">{emp.email}</small>
                    </div>
                    <span className="badge bg-warning text-dark">Pendiente</span>
                  </div>

                  {emp.ruc         && <p className="small text-muted mb-1">🆔 RUC: {emp.ruc}</p>}
                  {emp.descripcion && (
                    <p className="small text-secondary mb-3"
                      style={{ display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      {emp.descripcion}
                    </p>
                  )}

                  <button className="btn btn-success btn-sm px-4" onClick={() => onAprobar(emp.id)}>
                    ✓ Aprobar organización
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
