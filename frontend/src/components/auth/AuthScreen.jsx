/**
 * AuthScreen — Pantalla de autenticación con layout split hero/formulario.
 * Panel izquierdo: branding UNSCH + features destacadas.
 * Panel derecho: LoginForm / RegisterForm.
 */

import React from 'react';
import LoginForm    from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthScreen({ mode, onLogin, onRegister, loading, onSwitchToRegister, onSwitchToLogin }) {
  return (
    <div className="sp-auth-wrapper">
      {/* ── Panel izquierdo — Hero ─────────────────────────────── */}
      <div className="sp-auth-hero col-lg-5 col-xl-5 d-none d-lg-flex">
        <div className="sp-auth-hero-content">
          {/* Badge institucional */}
          <div className="sp-auth-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            UNSCH — Ayacucho, Perú
          </div>

          <h1>Sistema de Prácticas<br />Preprofesionales</h1>

          <p>
            Conecta estudiantes universitarios con organizaciones que ofrecen
            oportunidades de desarrollo profesional en Ayacucho y el país.
          </p>

          <ul className="sp-auth-hero-features">
            <li>Postula a convocatorias activas en minutos</li>
            <li>Seguimiento en tiempo real de tus postulaciones</li>
            <li>Gestión completa para organizaciones colaboradoras</li>
            <li>Panel administrativo con reportes y estadísticas</li>
          </ul>

          {/* Stats rápidas */}
          <div className="d-flex gap-4 mt-4 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div>
              <div className="fw-bold fs-5">3 roles</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>Estudiante, Empresa, Admin</div>
            </div>
            <div>
              <div className="fw-bold fs-5">100%</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>Gestión digital</div>
            </div>
            <div>
              <div className="fw-bold fs-5">CSV</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>Reportes exportables</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel derecho — Formulario ─────────────────────────── */}
      <div className="sp-auth-form-panel col-12 col-lg-7 col-xl-7">
        {/* Logo móvil — solo visible en pantallas pequeñas */}
        <div className="d-lg-none text-center mb-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{ background: 'linear-gradient(90deg, #0d6efd, #6610f2)', color: '#fff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            <span className="fw-bold">Sistema de Prácticas UNSCH</span>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '520px' }}>
          {mode === 'login' ? (
            <LoginForm
              onLogin={onLogin}
              loading={loading}
              onSwitchToRegister={onSwitchToRegister}
            />
          ) : (
            <RegisterForm
              onRegister={onRegister}
              loading={loading}
              onSwitchToLogin={onSwitchToLogin}
            />
          )}
        </div>

        {/* Footer legal */}
        <p className="text-muted mt-4 mb-0" style={{ fontSize: '0.75rem', textAlign: 'center', maxWidth: 420 }}>
          © {new Date().getFullYear()} Universidad Nacional de San Cristóbal de Huamanga.
          Sistema de Prácticas Preprofesionales.
        </p>
      </div>
    </div>
  );
}
