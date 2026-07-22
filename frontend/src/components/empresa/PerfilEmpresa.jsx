/**
 * PerfilEmpresa — Formulario de edición del perfil institucional de la organización.
 */

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function PerfilEmpresa({ perfil, onActualizar, loading }) {
  const [form, setForm] = useState({
    razon_social: '', ruc: '', descripcion: '', logo_url: '',
  });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (perfil?.usuario) {
      setForm({
        razon_social: perfil.usuario.razon_social || '',
        ruc:          perfil.usuario.ruc          || '',
        descripcion:  perfil.usuario.descripcion  || '',
        logo_url:     perfil.usuario.logo_url     || '',
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
      <h4 className="fw-bold mb-4">Perfil institucional</h4>

      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '0.75rem' }}>
        <div className="card-body d-flex align-items-center gap-4 p-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
            style={{ width: 64, height: 64, flexShrink: 0, fontSize: '1.5rem' }}
          >
            {(perfil?.usuario?.razon_social || 'E').charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 className="mb-0 fw-bold">{perfil?.usuario?.razon_social || perfil?.usuario?.nombre || '—'}</h5>
            <p className="text-muted mb-0">{perfil?.usuario?.email}</p>
            <span className="badge bg-success text-dark mt-1">Organización</span>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
        <div className="card-header bg-white fw-semibold">Datos de la organización</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Razón social</label>
                <input className="form-control" value={form.razon_social} onChange={set('razon_social')} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">RUC</label>
                <input className="form-control" value={form.ruc} onChange={set('ruc')} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Descripción institucional</label>
                <textarea className="form-control" rows={4} value={form.descripcion} onChange={set('descripcion')} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">URL del logo</label>
                <input className="form-control" type="url" value={form.logo_url} onChange={set('logo_url')} />
                {form.logo_url && (
                  <a href={form.logo_url} target="_blank" rel="noreferrer" className="small text-primary mt-1 d-inline-block">
                    Ver logo →
                  </a>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-success px-4" disabled={guardando}>
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
