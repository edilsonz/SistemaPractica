/**
 * LoginForm — Formulario de inicio de sesión rediseñado v1.2.
 * Layout vertical con campos apilados, botón de tamaño completo y
 * toggle de visibilidad de contraseña.
 */

import React, { useState } from 'react';

const IS_DEV = import.meta.env.DEV;

const DEMO = {
  estudiante: { email: 'demo@unsch.edu.pe',    password: 'estudiante123' },
  empresa:    { email: 'empresa@unsch.edu.pe', password: 'empresa123'   },
};

const ROLES_VISIBLES = [
  { value: 'estudiante', label: '🎓  Estudiante'   },
  { value: 'empresa',    label: '🏢  Organización' },
];

export default function LoginForm({ onLogin, loading, onSwitchToRegister }) {
  const [rol,         setRol]         = useState('estudiante');
  const [email,       setEmail]       = useState(IS_DEV ? DEMO.estudiante.email    : '');
  const [password,    setPassword]    = useState(IS_DEV ? DEMO.estudiante.password : '');
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState('');

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
    await onLogin(email, password, undefined);
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '1.25rem',
      boxShadow: '0 8px 32px rgba(13,110,253,0.10)',
      overflow: 'hidden',
      width: '100%',
    }}>
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
        padding: '1.75rem 2rem 1.5rem',
        color: '#fff',
      }}>
        {/* Icono */}
        <div style={{
          width: 48, height: 48,
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1rem',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>
        <h4 style={{ fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
          Iniciar sesión
        </h4>
        <p style={{ opacity: 0.8, fontSize: '0.875rem', marginBottom: 0 }}>
          Accede con tus credenciales institucionales
        </p>
      </div>

      {/* ── Cuerpo del formulario ─────────────────────────────── */}
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        {error && (
          <div className="alert alert-danger rounded-3 py-2 mb-3 d-flex align-items-center gap-2"
            role="alert" style={{ fontSize: '0.875rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Selector de rol */}
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6c757d' }}>
              Acceder como
            </label>
            <div className="d-flex gap-2">
              {ROLES_VISIBLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => handleRolChange({ target: { value: r.value } })}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.5rem',
                    borderRadius: '0.6rem',
                    border: `2px solid ${rol === r.value ? '#0d6efd' : '#e9ecef'}`,
                    background: rol === r.value ? '#edf2ff' : '#fff',
                    color: rol === r.value ? '#0d6efd' : '#6c757d',
                    fontWeight: rol === r.value ? 600 : 400,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6c757d' }}>
              Correo electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderRadius: '0.6rem 0 0 0.6rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                className="form-control border-start-0 ps-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="tu@correo.edu.pe"
                style={{ borderRadius: '0 0.6rem 0.6rem 0' }}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6c757d' }}>
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderRadius: '0.6rem 0 0 0.6rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                className="form-control border-start-0 border-end-0 ps-1"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="input-group-text bg-white"
                style={{ borderRadius: '0 0.6rem 0.6rem 0', cursor: 'pointer', border: '1px solid #dee2e6', borderLeft: 'none' }}
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPass ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? '#94b4fd' : 'linear-gradient(135deg, #0d6efd, #6610f2)',
              border: 'none',
              borderRadius: '0.7rem',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.18s ease',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(13,110,253,0.35)',
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Verificando...
              </>
            ) : (
              <>
                Ingresar al sistema
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>

          {/* Registro */}
          <div className="text-center mt-3">
            <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>¿No tienes cuenta? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#0d6efd', fontWeight: 600, fontSize: '0.85rem',
                padding: 0, textDecoration: 'none',
              }}
            >
              Crear cuenta gratis
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
