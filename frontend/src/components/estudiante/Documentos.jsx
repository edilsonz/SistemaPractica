/**
 * Documentos — Sección de documentación del estudiante.
 * Muestra CV y carta de presentación. Upload real es trabajo futuro (Sprint 3).
 */

import React from 'react';

export default function Documentos({ perfil }) {
  const cvUrl    = perfil?.estudiante?.cv_url || '';
  const nombre   = perfil?.estudiante?.nombre || perfil?.user?.nombre || 'Estudiante';
  const escuela  = perfil?.estudiante?.escuela || '';

  return (
    <div>
      <h4 className="fw-bold mb-4">Mis documentos</h4>

      <div className="row g-4">
        {/* CV */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '0.75rem' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ fontSize: '2rem' }}>📄</span>
                <div>
                  <h6 className="mb-0 fw-bold">Curriculum Vitae</h6>
                  <small className="text-muted">Documento principal de postulación</small>
                </div>
              </div>

              {cvUrl ? (
                <>
                  <div className="alert alert-success py-2 rounded-3">
                    <small>✅ CV registrado</small>
                  </div>
                  <a href={cvUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm w-100 mt-2">
                    Ver CV →
                  </a>
                </>
              ) : (
                <>
                  <div className="alert alert-warning py-2 rounded-3">
                    <small>⚠️ No tienes un CV registrado. Ve a <strong>Mi perfil</strong> para añadir la URL de tu CV.</small>
                  </div>
                  <div className="text-muted small mt-2">
                    Puedes subir tu CV a Google Drive o Dropbox y pegar el enlace en tu perfil.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Carta de presentación */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '0.75rem' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ fontSize: '2rem' }}>✉️</span>
                <div>
                  <h6 className="mb-0 fw-bold">Carta de presentación</h6>
                  <small className="text-muted">Documento de presentación institucional</small>
                </div>
              </div>
              <div className="alert alert-info py-2 rounded-3">
                <small>🔔 La generación automática de carta de presentación estará disponible próximamente.</small>
              </div>
              <div className="mt-3 p-3 bg-light rounded-3">
                <small className="text-muted">
                  La carta de presentación se genera con los datos de tu perfil:
                </small>
                <ul className="small text-muted mt-2 mb-0 ps-3">
                  <li><strong>Nombre:</strong> {nombre}</li>
                  {escuela && <li><strong>Escuela:</strong> {escuela}</li>}
                  <li><strong>Institución:</strong> UNSCH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="col-12">
          <div className="card border-0 bg-light" style={{ borderRadius: '0.75rem' }}>
            <div className="card-body p-3">
              <h6 className="fw-semibold mb-2">💡 Consejos para tu documentación</h6>
              <ul className="small text-muted mb-0 ps-3">
                <li>Mantén tu CV actualizado con tus últimas experiencias y habilidades.</li>
                <li>Usa Google Drive o OneDrive para alojar tu CV y asegúrate de que el enlace sea público.</li>
                <li>Un CV de una página es suficiente para prácticas preprofesionales.</li>
                <li>Incluye tus proyectos académicos y habilidades técnicas relevantes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
