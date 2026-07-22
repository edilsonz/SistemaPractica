/**
 * RegisterForm — Formulario de registro para estudiantes y organizaciones.
 * Muestra campos adicionales según el rol seleccionado.
 */

import React, { useState } from 'react';

const INITIAL = {
  nombre: '', email: '', password: '', rol: 'estudiante',
  // Empresa
  razon_social: '', ruc: '', descripcion: '', logo_url: '',
  // Estudiante
  escuela: '', telefono: '', cv_url: '',
};

export default function RegisterForm({ onRegister, loading, onSwitchToLogin }) {
  const [form, setForm] = useState(INITIAL);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onRegister(form);
  }

  const esEmpresa    = form.rol === 'empresa';
  const esEstudiante = form.rol === 'estudiante';

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
      <div
        className="card-header py-4 text-white"
        style={{ background: 'linear-gradient(135deg, #198754, #0d6efd)' }}
      >
        <h5 className="card-title mb-1">Crear cuenta nueva</h5>
        <small className="text-white-75">Regístrate para empezar. Las organizaciones requieren aprobación.</small>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* Datos base */}
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Tipo de cuenta</label>
              <select className="form-select" value={form.rol} onChange={set('rol')}>
                <option value="estudiante">Estudiante</option>
                <option value="empresa">Organización</option>
              </select>
              <small className="text-muted">Solo estudiantes y organizaciones</small>
            </div>
            <div className="col-md-5">
              <label className="form-label fw-semibold">Email</label>
              <input className="form-control" type="email" value={form.email} onChange={set('email')} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Contraseña <small className="text-muted">(mín. 8 caracteres)</small></label>
              <input className="form-control" type="password" value={form.password} onChange={set('password')} required minLength={8} autoComplete="new-password" />
            </div>
          </div>

          {/* Campos de estudiante */}
          {esEstudiante && (
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nombre completo</label>
                <input className="form-control" value={form.nombre} onChange={set('nombre')} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Escuela profesional</label>
                <input className="form-control" placeholder="Ej: Ingeniería Informática" value={form.escuela} onChange={set('escuela')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Teléfono</label>
                <input className="form-control" type="tel" value={form.telefono} onChange={set('telefono')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">URL del CV <small className="text-muted">(opcional)</small></label>
                <input className="form-control" type="url" placeholder="https://..." value={form.cv_url} onChange={set('cv_url')} />
              </div>
            </div>
          )}

          {/* Campos de empresa */}
          {esEmpresa && (
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Razón social</label>
                <input className="form-control" value={form.razon_social} onChange={set('razon_social')} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">RUC</label>
                <input className="form-control" value={form.ruc} onChange={set('ruc')} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Descripción de la organización</label>
                <textarea className="form-control" rows={3} value={form.descripcion} onChange={set('descripcion')} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">URL del logo <small className="text-muted">(opcional)</small></label>
                <input className="form-control" type="url" placeholder="https://..." value={form.logo_url} onChange={set('logo_url')} />
              </div>
            </div>
          )}

          {esEmpresa && (
            <div className="alert alert-warning mt-3 py-2 mb-0 rounded-3">
              <small>
                Las organizaciones deben ser aprobadas por el administrador antes de poder iniciar sesión.
              </small>
            </div>
          )}

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : null}
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
            <button type="button" className="btn btn-link btn-sm p-0 text-decoration-none" onClick={onSwitchToLogin}>
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
