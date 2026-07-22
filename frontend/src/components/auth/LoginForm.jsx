/**
 * LoginForm — Formulario de inicio de sesión.
 * - Muestra solo Estudiante y Organización en el selector público.
 * - Admin accede escribiendo directamente su email (sin opción visible).
 * - Rellena credenciales de demo solo en development.
 */

import React, { useState } from 'react';

const IS_DEV = import.meta.env.DEV;

const DEMO = {
  estudiante: { email: 'demo@unsch.edu.pe',    password: 'estudiante123' },
  empresa:    { email: 'empresa@unsch.edu.pe', password: 'empresa123'   },
};

// Admin se detecta automáticamente en el backend por el email; no hace falta
// exponer la opción en el selector público.
const ROLES_VISIBLES = [
  { value: 'estudiante', label: 'Estudiante'     },
  { value: 'empresa',    label: 'Organización'   },
];

export default function LoginForm({ onLogin, loading, onSwitchToRegister }) {
  const [rol,      setRol]      = useState('estudiante');
  const [email,    setEmail]    = useState(IS_DEV ? DEMO.estudiante.email    : '');
  const [password, setPassword] = useState(IS_DEV ? DEMO.estudiante.password : '');
  const [error,    setError]    = useState('');

  function handleRolChange(e) {
    const r = e.target.value;
    setRol(r);
    if (IS_DEV && DEMO[r]) {
      setEmail(DEMO[r].email);
      setPassword(DEMO[r].password);
    }
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    // Enviamos rol undefined para que el backend valide con el rol real del usuario.
    // El selector solo existe para prellenar credenciales demo; no restringe el login.
    await onLogin(email, password, undefined);
  }

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
      {/* Cabecera */}
      <div className="card-header py-4 text-white"
        style={{ background: 'linear-gradient(135deg,#6610f2,#0d6efd)' }}>
        <h5 className="card-title mb-1">Iniciar sesión</h5>
        <small className="text-white-75">Accede con tus credenciales institucionales.</small>
      </div>

      <div className="card-body p-4">
        {error && (
          <div className="alert alert-danger rounded-3 py-2 mb-3" role="alert">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">

            {/* Selector de rol — solo roles públicos */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Acceder como</label>
              <select className="form-select" value={rol} onChange={handleRolChange}>
                {ROLES_VISIBLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="col-md-5">
              <label className="form-label fw-semibold">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="tu@correo.edu.pe"
              />
            </div>

            {/* Contraseña */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {/* Botón */}
            <div className="col-md-1 d-grid">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading
                  ? <span className="spinner-border spinner-border-sm" role="status" />
                  : 'Entrar'
                }
              </button>
            </div>
          </div>



          <div className="mt-3 d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={onSwitchToRegister}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
