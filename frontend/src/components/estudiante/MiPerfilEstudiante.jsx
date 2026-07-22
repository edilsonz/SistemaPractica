/**
 * MiPerfilEstudiante — Formulario de edición del perfil del estudiante.
 */

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function MiPerfilEstudiante({ perfil, onActualizar, loading }) {
  const [form, setForm] = useState({
    nombre: '', escuela: '', telefono: '', cv_url: '',
  });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (perfil?.estudiante) {
      setForm({
        nombre:   perfil.estudiante.nombre   || '',
        escuela:  perfil.estudiante.escuela  || '',
        telefono: perfil.estudiante.telefono || '',
        cv_url:   perfil.estudiante.cv_url   || '',
      });
    }
  }, [perfil]);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    await onActualizar(form);
    setGuardando(false);
  }

  if (loading) return <LoadingSpinner text="Cargando perfil..." />;

  return (
    <div>
      <h4 className="fw-bold mb-4">Mi perfil</h4>

      {/* Tarjeta de resumen */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '0.75rem' }}>
        <div className="card-body d-flex align-items-center gap-4 p-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
            style={{ width: 64, height: 64, fontSize: '1.5rem', flexShrink: 0 }}
          >
            {(perfil?.user?.nombre || 'E').charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 className="mb-0 fw-bold">{perfil?.user?.nombre || '—'}</h5>
            <p className="text-muted mb-0">{perfil?.user?.email}</p>
            <span className="badge bg-info text-dark mt-1">Estudiante</span>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
        <div className="card-header bg-white fw-semibold">Datos académicos</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nombre completo</label>
                <input className="form-control" value={form.nombre} onChange={set('nombre')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Escuela profesional</label>
                <input className="form-control" placeholder="Ej: Ingeniería Informática" value={form.escuela} onChange={set('escuela')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Teléfono</label>
                <input className="form-control" type="tel" placeholder="Ej: 966123456" value={form.telefono} onChange={set('telefono')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">URL del CV</label>
                <input className="form-control" type="url" placeholder="https://drive.google.com/..." value={form.cv_url} onChange={set('cv_url')} />
                {form.cv_url && (
                  <a href={form.cv_url} target="_blank" rel="noreferrer" className="small text-primary mt-1 d-inline-block">
                    Ver CV →
                  </a>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary px-4" disabled={guardando}>
                {guardando ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : null}
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
