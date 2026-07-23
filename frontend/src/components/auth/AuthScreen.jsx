/**
 * AuthScreen — Pantalla de autenticación v1.2.
 * Panel izquierdo: ilustración contextual + branding UNSCH.
 * Panel derecho: LoginForm / RegisterForm.
 */

import React from 'react';
import LoginForm    from './LoginForm';
import RegisterForm from './RegisterForm';

/* ── Ilustración SVG principal — escena universitaria ───────── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 460 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 420, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))' }}
      aria-hidden="true">

      {/* Edificio universitario */}
      <rect x="120" y="120" width="220" height="160" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      {/* Columnas */}
      <rect x="140" y="140" width="18" height="140" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <rect x="170" y="140" width="18" height="140" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <rect x="272" y="140" width="18" height="140" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <rect x="302" y="140" width="18" height="140" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      {/* Frontón */}
      <polygon points="110,120 230,65 350,120" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      {/* Puerta central */}
      <rect x="210" y="210" width="40" height="70" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      {/* Ventanas */}
      <rect x="150" y="165" width="28" height="28" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <rect x="196" y="165" width="28" height="28" rx="3" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <rect x="282" y="165" width="28" height="28" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <rect x="282" y="205" width="28" height="28" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <rect x="150" y="205" width="28" height="28" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      {/* Torre central / cúpula */}
      <ellipse cx="230" cy="65" rx="22" ry="14" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      <rect x="222" y="40" width="16" height="26" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      {/* Bandera */}
      <line x1="230" y1="40" x2="230" y2="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
      <polygon points="230,20 248,27 230,34" fill="rgba(255,255,255,0.5)"/>
      {/* Base / escalones */}
      <rect x="100" y="278" width="260" height="8" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <rect x="110" y="270" width="240" height="10" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

      {/* Estudiante izquierdo con libro */}
      <g transform="translate(55, 175)">
        {/* Cuerpo */}
        <circle cx="28" cy="15" r="12" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <path d="M14 45 Q28 35 42 45 L44 90 Q28 95 12 90 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        {/* Libro */}
        <rect x="36" y="48" width="20" height="26" rx="2" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <line x1="46" y1="50" x2="46" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        {/* Gorro de graduación */}
        <rect x="18" y="4" width="20" height="5" rx="1" fill="rgba(255,255,255,0.5)"/>
        <polygon points="28,0 38,5 18,5" fill="rgba(255,255,255,0.6)"/>
        <line x1="38" y1="5" x2="42" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <circle cx="42" cy="13" r="2" fill="rgba(255,255,255,0.5)"/>
      </g>

      {/* Estudiante derecho con laptop */}
      <g transform="translate(345, 175)">
        <circle cx="28" cy="15" r="12" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <path d="M14 45 Q28 35 42 45 L44 90 Q28 95 12 90 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        {/* Laptop */}
        <rect x="10" y="50" width="30" height="20" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <rect x="12" y="52" width="26" height="15" rx="1" fill="rgba(255,255,255,0.2)"/>
        <rect x="8" y="70" width="34" height="3" rx="1" fill="rgba(255,255,255,0.3)"/>
        {/* Gorro */}
        <rect x="18" y="4" width="20" height="5" rx="1" fill="rgba(255,255,255,0.5)"/>
        <polygon points="28,0 38,5 18,5" fill="rgba(255,255,255,0.6)"/>
      </g>

      {/* Documento / CV flotante */}
      <g transform="translate(360, 60)">
        <rect width="60" height="76" rx="5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <rect x="10" y="12" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
        <rect x="10" y="22" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="10" y="30" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="10" y="38" width="25" height="3" rx="1.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="10" y="50" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
        <rect x="10" y="58" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
        {/* Check de aprobación */}
        <circle cx="48" cy="64" r="9" fill="rgba(34,197,94,0.7)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <polyline points="43,64 47,68 54,60" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* Símbolo de conexión / wifi entre personajes */}
      <g opacity="0.4">
        <path d="M95 215 Q165 185 225 210" stroke="white" strokeWidth="1" strokeDasharray="4 3" fill="none"/>
        <path d="M365 215 Q295 185 235 210" stroke="white" strokeWidth="1" strokeDasharray="4 3" fill="none"/>
        <circle cx="230" cy="212" r="5" fill="rgba(255,255,255,0.6)"/>
        <circle cx="230" cy="212" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </g>

      {/* Árbol decorativo izquierdo */}
      <g transform="translate(32, 230)" opacity="0.4">
        <rect x="10" y="50" width="8" height="30" rx="2" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="14" cy="40" rx="16" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </g>
      {/* Árbol decorativo derecho */}
      <g transform="translate(396, 230)" opacity="0.4">
        <rect x="10" y="50" width="8" height="30" rx="2" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="14" cy="40" rx="16" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </g>

      {/* Suelo */}
      <line x1="20" y1="285" x2="440" y2="285" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    </svg>
  );
}

/* ── Tarjetas de stats flotantes ─────────────────────────────── */
function StatPill({ icon, label, value }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.22)',
      borderRadius: '2rem',
      padding: '0.4rem 0.9rem',
      fontSize: '0.8rem',
      fontWeight: 500,
      color: '#fff',
    }}>
      <span style={{ fontSize: '1rem' }}>{icon}</span>
      <span style={{ opacity: 0.75 }}>{label}:</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function AuthScreen({ mode, onLogin, onRegister, loading, onSwitchToRegister, onSwitchToLogin }) {
  return (
    <div className="sp-auth-wrapper">

      {/* ── Panel izquierdo — Hero con ilustración ──────────── */}
      <div className="sp-auth-hero col-lg-6 col-xl-5 d-none d-lg-flex flex-column justify-content-between">

        {/* Header del hero */}
        <div className="sp-auth-hero-content">
          <div className="sp-auth-hero-badge mb-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            UNSCH — Ayacucho, Perú
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Prácticas<br />Preprofesionales
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.82, maxWidth: 320, lineHeight: 1.65 }}>
            Plataforma digital de la Universidad Nacional de San Cristóbal de Huamanga
            para gestionar prácticas preprofesionales.
          </p>
        </div>

        {/* Ilustración central */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
          <HeroIllustration />
        </div>

        {/* Stats y features en el pie */}
        <div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <StatPill icon="🎓" label="Estudiantes" value="conectados" />
            <StatPill icon="🏢" label="Empresas" value="colaboradoras" />
            <StatPill icon="📋" label="Gestión" value="100% digital" />
          </div>

          <ul className="sp-auth-hero-features" style={{ marginTop: '0.5rem' }}>
            <li>Postula a convocatorias activas en minutos</li>
            <li>Seguimiento en tiempo real de tus postulaciones</li>
            <li>Panel administrativo con reportes y estadísticas CSV</li>
          </ul>
        </div>
      </div>

      {/* ── Panel derecho — Formulario ─────────────────────── */}
      <div className="sp-auth-form-panel col-12 col-lg-6 col-xl-7">

        {/* Logo para móvil */}
        <div className="d-lg-none text-center mb-4">
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill"
            style={{ background: 'linear-gradient(90deg, #0d6efd, #6610f2)', color: '#fff', fontWeight: 700 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Sistema de Prácticas UNSCH
          </div>
        </div>

        {/* Formulario */}
        <div style={{ width: '100%', maxWidth: '440px' }}>
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

        {/* Footer */}
        <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '1.5rem', textAlign: 'center', maxWidth: 400 }}>
          © {new Date().getFullYear()} Universidad Nacional de San Cristóbal de Huamanga
        </p>
      </div>
    </div>
  );
}
