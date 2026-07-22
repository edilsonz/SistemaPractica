/**
 * InicioEmpresa — Dashboard principal de la organización colaboradora.
 */

import React from 'react';
import StatCard from '../shared/StatCard';
import EmptyState from '../shared/EmptyState';

const ESTADO_COLOR = {
  'Enviado':       'secondary',
  'En Evaluación': 'warning',
  'Seleccionado':  'success',
  'Rechazado':     'danger',
};

export default function InicioEmpresa({ perfil, convocatorias, postulaciones, onNavigate }) {
  const activas    = (convocatorias || []).filter((c) => c.activo).length;
  const cerradas   = (convocatorias || []).filter((c) => !c.activo).length;
  const totalPost  = (postulaciones || []).length;
  const pendientes = (postulaciones || []).filter((p) => p.estado === 'Enviado').length;

  const nombre = perfil?.usuario?.razon_social || perfil?.usuario?.nombre || 'Organización';

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-0">Bienvenido, {nombre} 🏢</h4>
        <p className="text-muted">Panel de control institucional</p>
      </div>

      {/* Estadísticas */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <StatCard label="Convocatorias activas"  value={activas}   icon="📋" color="success" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Convocatorias cerradas" value={cerradas}  icon="🔒" color="light"   />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Total postulantes"      value={totalPost} icon="👥" color="primary" />
        </div>
        <div className="col-6 col-md-3">
          <StatCard label="Por revisar"            value={pendientes} icon="⏳" color="warning" />
        </div>
      </div>

      {/* Últimas postulaciones */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Postulaciones recientes</span>
          <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={() => onNavigate('postulantes')}>
            Ver todos →
          </button>
        </div>
        <div className="card-body p-0">
          {(postulaciones || []).length === 0 ? (
            <EmptyState icon="📭" title="Sin postulantes aún" description="Cuando publiques convocatorias y recibas postulaciones aparecerán aquí." />
          ) : (
            <ul className="list-group list-group-flush">
              {(postulaciones || []).slice(0, 5).map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{p.Estudiante?.nombre || '—'}</div>
                    <small className="text-muted">{p.Convocatoria?.titulo || '—'}</small>
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
        {[
          { key: 'crear-convocatoria', icon: '➕', label: 'Publicar convocatoria', desc: 'Crea una nueva oportunidad de práctica' },
          { key: 'mis-convocatorias',  icon: '📋', label: 'Mis convocatorias',     desc: 'Gestiona tus ofertas publicadas'      },
          { key: 'postulantes',        icon: '👥', label: 'Ver postulantes',        desc: 'Revisa y evalúa a los candidatos'    },
          { key: 'reportes',           icon: '📊', label: 'Reportes',              desc: 'Exporta datos de tu actividad'       },
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
