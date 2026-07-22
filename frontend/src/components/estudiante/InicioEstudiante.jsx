/**
 * InicioEstudiante — Panel de resumen personal del estudiante.
 * Muestra estadísticas rápidas y accesos directos.
 */

import React from 'react';
import StatCard from '../shared/StatCard';
import EmptyState from '../shared/EmptyState';

export default function InicioEstudiante({ stats, postulaciones, perfil, onNavigate }) {
  const recientes = (postulaciones || []).slice(0, 3);

  const ESTADO_COLOR = {
    'Enviado':        'secondary',
    'En Evaluación':  'warning',
    'Seleccionado':   'success',
    'Rechazado':      'danger',
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-0">Bienvenido, {perfil?.user?.nombre || perfil?.estudiante?.nombre || 'Estudiante'} 👋</h4>
        <p className="text-muted">{perfil?.estudiante?.escuela || 'Completa tu perfil para aparecer en las búsquedas.'}</p>
      </div>

      {/* Estadísticas */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <StatCard label="Convocatorias disponibles" value={stats?.totalConvocatorias} icon="📋" color="primary" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Mis postulaciones" value={stats?.totalPostulaciones} icon="📝" color="info" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="En evaluación" value={stats?.postulacionesPendientes} icon="⏳" color="warning" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Seleccionado" value={stats?.aprobadas} icon="✅" color="success" />
        </div>
      </div>

      {/* Postulaciones recientes */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Postulaciones recientes</span>
          <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={() => onNavigate('mis-postulaciones')}>
            Ver todas →
          </button>
        </div>
        <div className="card-body p-0">
          {recientes.length === 0 ? (
            <EmptyState
              icon="📭"
              title="Sin postulaciones aún"
              description="Explora las convocatorias disponibles y postula."
              action={
                <button className="btn btn-primary btn-sm" onClick={() => onNavigate('convocatorias')}>
                  Ver convocatorias
                </button>
              }
            />
          ) : (
            <ul className="list-group list-group-flush">
              {recientes.map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{p.Convocatoria?.titulo || p.convocatoria?.titulo}</div>
                    <small className="text-muted">{p.Convocatoria?.empresa || p.convocatoria?.empresa}</small>
                  </div>
                  <span className={`badge bg-${ESTADO_COLOR[p.estado] || 'secondary'}`}>{p.estado}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="row g-3">
        <div className="col-12">
          <h6 className="fw-semibold text-muted text-uppercase mb-3" style={{ fontSize: '0.75rem' }}>Accesos rápidos</h6>
        </div>
        {[
          { key: 'convocatorias',     icon: '📋', label: 'Buscar convocatorias',   desc: 'Explora oportunidades disponibles' },
          { key: 'mis-postulaciones', icon: '📝', label: 'Mis postulaciones',       desc: 'Consulta el estado de tus postulaciones' },
          { key: 'mi-perfil',         icon: '👤', label: 'Actualizar perfil',        desc: 'Mantén tus datos al día' },
          { key: 'documentos',        icon: '📄', label: 'Mis documentos',          desc: 'Gestiona tu CV y carta de presentación' },
        ].map((item) => (
          <div key={item.key} className="col-sm-6 col-lg-3">
            <button
              className="card border-0 shadow-sm w-100 text-start p-3 btn btn-light"
              style={{ borderRadius: '0.75rem' }}
              onClick={() => onNavigate(item.key)}
            >
              <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
              <div className="fw-semibold mt-2">{item.label}</div>
              <small className="text-muted">{item.desc}</small>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
