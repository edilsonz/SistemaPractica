import React from 'react';

export default function Dashboard({ userRole, user, stats, activePage, onNavigate, navItems }) {
  const defaultItems = {
    admin: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'gestionar-empresas', label: 'Empresas pendientes' },
      { key: 'gestionar-convocatorias', label: 'Convocatorias' },
      { key: 'postulaciones', label: 'Postulaciones' },
    ],
    empresa: [
      { key: 'inicio', label: 'Inicio' },
      { key: 'mis-convocatorias', label: 'Mis convocatorias' },
      { key: 'crear-convocatoria', label: 'Crear convocatoria' },
      { key: 'postulantes', label: 'Postulantes' },
    ],
    estudiante: [
      { key: 'inicio', label: 'Inicio' },
      { key: 'convocatorias', label: 'Convocatorias' },
      { key: 'mis-postulaciones', label: 'Mis postulaciones' },
      { key: 'mi-perfil', label: 'Mi perfil' },
    ],
  };

  const items = navItems || defaultItems[userRole] || [];

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 gap-3">
          <div>
            <h2 className="h4 mb-1">Panel de {userRole === 'estudiante' ? 'Estudiante' : userRole === 'empresa' ? 'Empresa' : 'Administrador'}</h2>
            <div className="text-muted">Usuario: {user?.nombre || 'Invitado'}</div>
          </div>
          <span className="badge bg-primary text-uppercase">Rol: {userRole}</span>
        </div>

        <div className="row g-3">
          <div className="col-lg-3">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title">Navegación</h6>
                <div className="list-group list-group-flush">
                  {items.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`list-group-item list-group-item-action text-start ${activePage === item.key ? 'active' : ''}`}
                      onClick={() => onNavigate?.(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row g-3">
              <div className="col-sm-6 col-lg-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <small className="text-muted">Convocatorias</small>
                    <div className="h4 mb-0">{stats?.totalConvocatorias ?? 0}</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <small className="text-muted">Postulaciones</small>
                    <div className="h4 mb-0">{stats?.totalPostulaciones ?? 0}</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <small className="text-muted">En evaluación</small>
                    <div className="h4 mb-0">{stats?.postulacionesPendientes ?? 0}</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <small className="text-muted">Seleccionados</small>
                    <div className="h4 mb-0">{stats?.aprobadas ?? 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

