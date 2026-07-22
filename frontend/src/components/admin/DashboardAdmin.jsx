/**
 * DashboardAdmin — Panel principal del administrador con estadísticas y actividad reciente.
 */

import React from 'react';
import StatCard from '../shared/StatCard';

const ESTADO_COLOR = { 'Enviado':'secondary','En Evaluación':'warning','Seleccionado':'success','Rechazado':'danger' };

export default function DashboardAdmin({ stats, postulaciones, empresasPendientes, usuarios, onNavigate }) {
  const totalEst  = (usuarios || []).filter((u) => u.rol === 'estudiante').length;
  const totalEmp  = (usuarios || []).filter((u) => u.rol === 'empresa').length;
  const pendEmp   = (empresasPendientes || []).length;

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-0">Panel administrativo</h4>
        <p className="text-muted">Supervisión general del sistema</p>
      </div>

      {/* Fila 1 */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3"><StatCard label="Convocatorias"        value={stats?.totalConvocatorias}  icon="📋" color="primary" /></div>
        <div className="col-6 col-md-3"><StatCard label="Postulaciones"        value={stats?.totalPostulaciones}  icon="📝" color="info"    /></div>
        <div className="col-6 col-md-3"><StatCard label="Estudiantes"          value={totalEst}                   icon="🎓" color="success" /></div>
        <div className="col-6 col-md-3"><StatCard label="Organizaciones"       value={totalEmp}                   icon="🏢" color="light"   /></div>
      </div>

      {/* Alerta si hay empresas pendientes */}
      {pendEmp > 0 && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center rounded-3 mb-4">
          <span>⚠️ Hay <strong>{pendEmp}</strong> organización{pendEmp > 1 ? 'es' : ''} pendiente{pendEmp > 1 ? 's' : ''} de aprobación.</span>
          <button className="btn btn-warning btn-sm" onClick={() => onNavigate('gestionar-empresas')}>
            Revisar →
          </button>
        </div>
      )}

      <div className="row g-4">
        {/* Actividad reciente */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Actividad reciente</span>
              <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={() => onNavigate('postulaciones')}>
                Ver todas →
              </button>
            </div>
            <div className="card-body p-0">
              {(postulaciones || []).length === 0 ? (
                <p className="text-muted text-center py-4 mb-0">Sin actividad registrada.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {(postulaciones || []).slice(0, 6).map((p) => (
                    <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-2">
                      <div>
                        <span className="fw-semibold">{p.Estudiante?.nombre || '—'}</span>
                        <small className="text-muted ms-2">→ {p.Convocatoria?.titulo || '—'}</small>
                      </div>
                      <span className={`badge bg-${ESTADO_COLOR[p.estado] || 'secondary'}`}>{p.estado}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Accesos rápidos</div>
            <div className="card-body d-flex flex-column gap-2">
              {[
                { key: 'usuarios',               icon: '👥', label: 'Gestión de usuarios'    },
                { key: 'gestionar-empresas',      icon: '🏢', label: 'Aprobar organizaciones' },
                { key: 'gestionar-convocatorias', icon: '📋', label: 'Ver convocatorias'      },
                { key: 'postulaciones',           icon: '📝', label: 'Ver postulaciones'      },
                { key: 'reportes',                icon: '📊', label: 'Generar reportes'       },
              ].map((item) => (
                <button
                  key={item.key}
                  className="btn btn-light text-start d-flex align-items-center gap-2"
                  style={{ borderRadius: '0.5rem' }}
                  onClick={() => onNavigate(item.key)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
