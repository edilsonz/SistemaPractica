/**
 * CrearConvocatoria — Formulario para publicar una nueva convocatoria de prácticas.
 */

import React, { useState } from 'react';

const INITIAL = { titulo: '', descripcion: '', modalidad: 'Presencial', fecha_inicio: '', fecha_fin: '' };

export default function CrearConvocatoria({ onCreate, loading }) {
  const [form, setForm]       = useState(INITIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  function set(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrores((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function validar() {
    const e = {};
    if (!form.titulo.trim())       e.titulo       = 'El título es obligatorio.';
    if (!form.descripcion.trim())  e.descripcion  = 'La descripción es obligatoria.';
    if (form.fecha_fin && form.fecha_inicio && form.fecha_fin < form.fecha_inicio) {
      e.fecha_fin = 'La fecha de cierre no puede ser anterior a la de inicio.';
    }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length) { setErrores(errs); return; }
    setEnviando(true);
    const ok = await onCreate(form);
    setEnviando(false);
    if (ok) setForm(INITIAL);
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">Publicar convocatoria</h4>

      <div className="card border-0 shadow-sm" style={{ borderRadius: '0.75rem' }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">

              {/* Título */}
              <div className="col-12">
                <label className="form-label fw-semibold">Título de la convocatoria <span className="text-danger">*</span></label>
                <input
                  className={`form-control ${errores.titulo ? 'is-invalid' : ''}`}
                  placeholder="Ej: Practicante de Ingeniería de Sistemas"
                  value={form.titulo}
                  onChange={set('titulo')}
                />
                {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
              </div>

              {/* Modalidad */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Modalidad</label>
                <select className="form-select" value={form.modalidad} onChange={set('modalidad')}>
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Híbrida">Híbrida</option>
                </select>
              </div>

              {/* Fecha inicio */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Fecha de inicio</label>
                <input
                  className="form-control"
                  type="date"
                  value={form.fecha_inicio}
                  onChange={set('fecha_inicio')}
                />
              </div>

              {/* Fecha cierre */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Fecha de cierre</label>
                <input
                  className={`form-control ${errores.fecha_fin ? 'is-invalid' : ''}`}
                  type="date"
                  value={form.fecha_fin}
                  onChange={set('fecha_fin')}
                />
                {errores.fecha_fin && <div className="invalid-feedback">{errores.fecha_fin}</div>}
              </div>

              {/* Descripción */}
              <div className="col-12">
                <label className="form-label fw-semibold">Descripción <span className="text-danger">*</span></label>
                <textarea
                  className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                  rows={5}
                  placeholder="Describe las actividades, requisitos y beneficios de la práctica..."
                  value={form.descripcion}
                  onChange={set('descripcion')}
                />
                {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                <div className="form-text">{form.descripcion.length} caracteres</div>
              </div>

            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-success px-4" disabled={enviando || loading}>
                {enviando
                  ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Publicando...</>
                  : '📢 Publicar convocatoria'
                }
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setForm(INITIAL)}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
