/**
 * ReportesEmpresa — Panel de reportes y estadísticas para la organización.
 */

import React from 'react';
import { exportarCSV } from '../../utils/csv';
import StatCard from '../shared/StatCard';
import EmptyState from '../shared/EmptyState';

export default function ReportesEmpresa({ convocatorias, postulaciones }) {
  const activas      = (convocatorias  || []).filter((c) => c.activo).length;
  const totalPost    = (postulaciones  || []).length;
  const seleccionados = (postulaciones || []).filter((p) => p.estado === 'Seleccionado').length;
  const rechazados   = (postulaciones  || []).filter((p) => p.estado === 'Rechazado').length;

  function descargarPostulantes() {
    const filas = [
      ['Estudiante', 'Email', 'Escuela', 'Convocatoria', 'Estado', 'Fecha'],
      ...(postulaciones || []).map((p) => [
        p.Estudiante?.nombre       || '—',
        p.Estudiante?.email        || '—',
        p.Estudiante?.escuela      || '—',
        p.Convocatoria?.titulo     || '—',
        p.estado                   || '—',
        p.created_at ? new Date(p.created_at).toLocaleDateString('es-PE') : '—',
      ]),
    ];
    exportarCSV(`reporte-postulantes-${new Date().toISOString().slice(0, 10)}`, filas);
  }

  function descargarConvocatorias() {
    const filas = [
      ['Título', 'Modalidad', 'Estado', 'Fecha inicio', 'Fecha cierre'],
      ...(convocatorias || []).map((c) => [
        c.titulo     || '—',
        c.modalidad  || '—',
        c.activo ? 'Activa' : 'Cerrada',
        c.fecha_inicio ? new Date(c.fecha_inicio).toLocaleDateString('es-PE') : '—',
        c.fecha_fin    ? new Date(c.fecha_fin).toLocaleDateString('es-PE')    : '—',
      ]),
    ];
    exportarCSV(`reporte-convocatorias-${new Date().toISOString().slice(0, 10)}`, filas);
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">Reportes</h4>

      {/* Resumen */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <StatCard label="Convocatorias activas" value={activas}       icon="📋" color="success" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Total postulantes"     value={totalPost}     icon="👥" color="primary" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Seleccionados"         value={seleccionados} icon="✅" color="info"    />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Rechazados"            value={rechazados}    icon="❌" color="light"   />
        </div>
      </div>

      {/* Exportaciones */}
      <h6 className="fw-semibold text-muted text-uppercase mb-3" style={{ fontSize: '0.75rem' }}>
        Exportar datos
      </h6>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-1">📥 Postulantes</h6>
              <p className="small text-muted mb-3">
                Exporta la lista completa de postulantes con nombre, escuela, convocatoria y estado.
              </p>
              {(postulaciones || []).length === 0 ? (
                <EmptyState icon="📭" title="Sin datos para exportar" />
              ) : (
                <button className="btn btn-success btn-sm" onClick={descargarPostulantes}>
                  Descargar CSV — {(postulaciones || []).length} registros
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-1">📥 Convocatorias</h6>
              <p className="small text-muted mb-3">
                Exporta el historial completo de convocatorias publicadas por tu organización.
              </p>
              {(convocatorias || []).length === 0 ? (
                <EmptyState icon="📭" title="Sin datos para exportar" />
              ) : (
                <button className="btn btn-primary btn-sm" onClick={descargarConvocatorias}>
                  Descargar CSV — {(convocatorias || []).length} registros
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
