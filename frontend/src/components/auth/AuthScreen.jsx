/**
 * AuthScreen — Pantalla de autenticación v1.3.
 * Panel izquierdo: foto real UNSCH con overlay de color del sistema.
 * Panel derecho: LoginForm / RegisterForm.
 */

import React from 'react';
import LoginForm    from './LoginForm';
import RegisterForm from './RegisterForm';

/* URL pública de la foto del campus UNSCH (Wikimedia Commons — dominio público) */
const UNSCH_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Unsch.JPG/800px-Unsch.JPG';

/* ── Pill de estadística ─────────────────────────────────────── */
function StatPill({ emoji, text }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.28)',
      borderRadius: '2rem',
      padding: '0.35rem 0.85rem',
      fontSize: '0.78rem',
      fontWeight: 500,
      color: '#fff',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: '0.95rem' }}>{emoji}</span>
      {text}
    </div>
  );
}

/* ── Panel hero izquierdo ────────────────────────────────────── */
function HeroPanel() {
  return (
    <div
      className="d-none d-lg-flex flex-column col-lg-6 col-xl-5"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        /* Foto de fondo */
        backgroundImage: `url(${UNSCH_PHOTO})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay con gradiente del sistema — hace los textos legibles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(13,110,253,0.82) 0%, rgba(102,16,242,0.88) 60%, rgba(80,10,200,0.94) 100%)',
      }} />

      {/* Franja inferior más densa para que las pills y features sean legibles */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(to top, rgba(50,0,180,0.75) 0%, transparent 100%)',
      }} />

      {/* Contenido sobre el overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem 2.5rem 2.25rem' }}>

        {/* Badge institucional */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '2rem',
          padding: '0.35rem 1rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#fff',
          width: 'fit-content',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
          UNSCH — Ayacucho, Perú
        </div>

        {/* Título */}
        <h1 style={{
          color: '#fff',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 2.4vw, 2.4rem)',
          lineHeight: 1.15,
          marginBottom: '0.9rem',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0,0,0,0.25)',
        }}>
          Sistema de Prácticas<br />
          <span style={{ opacity: 0.9, fontWeight: 700, fontSize: '0.85em' }}>Preprofesionales</span>
        </h1>

        {/* Descripción */}
        <p style={{
          color: 'rgba(255,255,255,0.88)',
          fontSize: '0.9rem',
          lineHeight: 1.65,
          maxWidth: 320,
          marginBottom: 0,
          textShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }}>
          Plataforma digital que conecta estudiantes universitarios con
          organizaciones que ofrecen oportunidades de práctica profesional.
        </p>

        {/* Espaciador flexible — empuja el contenido inferior hacia abajo */}
        <div style={{ flex: 1 }} />

        {/* Pills de stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <StatPill emoji="🎓" text="Estudiantes UNSCH" />
          <StatPill emoji="🏢" text="Organizaciones colaboradoras" />
          <StatPill emoji="📋" text="Gestión 100% digital" />
        </div>

        {/* Lista de features */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
        }}>
          {[
            'Postula a convocatorias en minutos',
            'Seguimiento en tiempo real de postulaciones',
            'Panel completo para organizaciones',
            'Reportes y estadísticas exportables',
          ].map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.85rem',
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20, height: 20,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                flexShrink: 0,
                fontSize: '0.65rem',
                fontWeight: 700,
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Crédito de la foto */}
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginTop: '1.25rem', marginBottom: 0 }}>
          © Universidad Nacional de San Cristóbal de Huamanga
        </p>
      </div>
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function AuthScreen({
  mode, onLogin, onRegister, loading,
  onSwitchToRegister, onSwitchToLogin,
}) {
  return (
    <div className="sp-auth-wrapper">

      {/* Panel izquierdo — foto + overlay */}
      <HeroPanel />

      {/* Panel derecho — formulario */}
      <div
        className="sp-auth-form-panel col-12 col-lg-6 col-xl-7"
        style={{ background: '#f4f6fb' }}
      >
        {/* Logo para móvil (cuando el panel izquierdo está oculto) */}
        <div className="d-lg-none text-center mb-4">
          <div
            className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill"
            style={{
              background: 'linear-gradient(90deg, #0d6efd, #6610f2)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Sistema de Prácticas UNSCH
          </div>
        </div>

        {/* Formulario centrado */}
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
        <p style={{
          fontSize: '0.72rem',
          color: '#9ca3af',
          marginTop: '1.5rem',
          textAlign: 'center',
          maxWidth: 400,
        }}>
          © {new Date().getFullYear()} Universidad Nacional de San Cristóbal de Huamanga
        </p>
      </div>
    </div>
  );
}
