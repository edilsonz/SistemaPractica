/**
 * Configuracion — Panel de configuración general del sistema (administrador).
 */

import React from 'react';

const ITEMS = [
  { icono: '🏫', titulo: 'Información institucional',   desc: 'Nombre, logo y datos de la UNSCH.',         btn: 'Configurar' },
  { icono: '🔒', titulo: 'Seguridad',                    desc: 'Políticas de contraseñas y JWT.',            btn: 'Gestionar'  },
  { icono: '📧', titulo: 'Notificaciones por email',     desc: 'Configurar servidor SMTP para alertas.',     btn: 'Próximamente', disabled: true },
  { icono: '🗃️', titulo: 'Base de datos',                desc: 'Estado de conexión y estadísticas de BD.',  btn: 'Ver estado' },
  { icono: '📄', titulo: 'Términos y condiciones',       desc: 'Texto legal que ven los usuarios al registrarse.', btn: 'Editar', disabled: true },
  { icono: '🌐', titulo: 'Idioma y región',              desc: 'Configuración regional del sistema.',        btn: 'Próximamente', disabled: true },
];

export default function Configuracion() {
  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-0">Configuración del sistema</h4>
        <p className="text-muted">Parámetros generales de la plataforma UNSCH.</p>
      </div>

      <div className="alert alert-info rounded-3 mb-4">
        <small>
          ⚙️ La configuración avanzada se habilitará progresivamente en próximas versiones.
          Los módulos marcados como <strong>Próximamente</strong> están en desarrollo.
        </small>
      </div>

      <div className="row g-3">
        {ITEMS.map((item) => (
          <div key={item.titulo} className="col-md-6">
            <div className={`card border-0 shadow-sm h-100 ${item.disabled ? 'opacity-75' : ''}`}
              style={{ borderRadius: '0.75rem' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span style={{ fontSize: '1.5rem' }}>{item.icono}</span>
                  <h6 className="fw-bold mb-0">{item.titulo}</h6>
                </div>
                <p className="small text-muted mb-3">{item.desc}</p>
                <button
                  className={`btn btn-sm ${item.disabled ? 'btn-outline-secondary' : 'btn-outline-primary'}`}
                  disabled={item.disabled}
                >
                  {item.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
