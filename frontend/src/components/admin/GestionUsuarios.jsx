/**
 * GestionUsuarios — Listado y administración de todos los usuarios del sistema.
 */

import React, { useState } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';

const ROL_COLOR  = { admin: 'danger', empresa: 'success', estudiante: 'primary' };
const ROL_ICON   = { admin: '🔑', empresa: '🏢', estudiante: '🎓' };

export default function GestionUsuarios({ usuarios, loading, onRecargar }) {
  const [filtroRol,    setFiltroRol]    = useState('');
  const [busqueda,     setBusqueda]     = useState('');

  if (loading) return <LoadingSpinner text="Cargando usuarios..." />;

  const filtrados = (usuarios || []).filter((u) => {
    const matchRol    = filtroRol ? u.rol === filtroRol : true;
    const matchSearch = busqueda
      ? [u.nombre, u.email].join(' ').toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return matchRol && matchSearch;
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h4 className="fw-bold mb-0">Gestión de usuarios</h4>
        <div className="d-flex gap-2">
          <span className="badge bg-secondary rounded-pill">{filtrados.length} usuario(s)</span>
          <button className="btn btn-outline-primary btn-sm" onClick={onRecargar}>↻ Actualizar</button>
        </div>
      </div>

      {/* Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-sm-4">
          <select className="form-select" value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
            <option value="">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="empresa">Organización</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </div>
        <div className="col-sm-8">
          <input
            className="form-control"
            placeholder="Buscar por nombre o email..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState icon="👥" title="Sin usuarios" description="No hay usuarios que coincidan con los filtros." />
      ) : (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Registro</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span>{ROL_ICON[u.rol] || '👤'}</span>
                        <span className="fw-semibold">{u.nombre}</span>
                      </div>
                    </td>
                    <td className="text-muted small">{u.email}</td>
                    <td>
                      <span className={`badge bg-${ROL_COLOR[u.rol] || 'secondary'} text-capitalize`}>
                        {u.rol}
                      </span>
                    </td>
                    <td>
                      {u.rol !== 'empresa' || u.approved
                        ? <span className="badge bg-success-subtle text-success border border-success-subtle">Activo</span>
                        : <span className="badge bg-warning-subtle text-warning border border-warning-subtle">Pendiente</span>
                      }
                    </td>
                    <td className="text-muted small">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString('es-PE') : '—'}
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
