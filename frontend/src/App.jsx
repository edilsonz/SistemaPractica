/**
 * App.jsx — Raíz de la aplicación.
 * Gestiona autenticación, sesión persistente y enrutado por rol.
 */

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apiFetch } from './utils/api';
import { exportarCSV } from './utils/csv';

// ── Layout ────────────────────────────────────────────────────────────────────
import Navbar  from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer  from './components/layout/Footer';

// ── Auth ──────────────────────────────────────────────────────────────────────
import LoginForm    from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// ── Shared ────────────────────────────────────────────────────────────────────
import AlertMessage  from './components/shared/AlertMessage';
import LoadingSpinner from './components/shared/LoadingSpinner';

// ── Estudiante ────────────────────────────────────────────────────────────────
import InicioEstudiante   from './components/estudiante/InicioEstudiante';
import Convocatorias      from './components/estudiante/Convocatorias';
import MisPostulaciones   from './components/estudiante/MisPostulaciones';
import MiPerfilEstudiante from './components/estudiante/MiPerfilEstudiante';
import Documentos         from './components/estudiante/Documentos';
import Notificaciones     from './components/estudiante/Notificaciones';

// ── Empresa ───────────────────────────────────────────────────────────────────
import InicioEmpresa    from './components/empresa/InicioEmpresa';
import PerfilEmpresa    from './components/empresa/PerfilEmpresa';
import MisConvocatorias from './components/empresa/MisConvocatorias';
import CrearConvocatoria from './components/empresa/CrearConvocatoria';
import Postulantes      from './components/empresa/Postulantes';
import ReportesEmpresa  from './components/empresa/ReportesEmpresa';

// ── Admin ─────────────────────────────────────────────────────────────────────
import DashboardAdmin        from './components/admin/DashboardAdmin';
import GestionUsuarios       from './components/admin/GestionUsuarios';
import GestionEmpresas       from './components/admin/GestionEmpresas';
import GestionConvocatorias  from './components/admin/GestionConvocatorias';
import GestionPostulaciones  from './components/admin/GestionPostulaciones';
import ReportesAdmin         from './components/admin/ReportesAdmin';
import Configuracion         from './components/admin/Configuracion';

// ── Constantes ────────────────────────────────────────────────────────────────
const NAV_ITEMS = {
  estudiante: [
    { key: 'inicio',            label: 'Resumen personal',  icon: '🏠' },
    { key: 'convocatorias',     label: 'Convocatorias',     icon: '📋' },
    { key: 'mis-postulaciones', label: 'Mis postulaciones', icon: '📝' },
    { key: 'mi-perfil',         label: 'Mi perfil',         icon: '👤' },
    { key: 'documentos',        label: 'Documentación',     icon: '📄' },
    { key: 'notificaciones',    label: 'Notificaciones',    icon: '🔔' },
  ],
  empresa: [
    { key: 'inicio',             label: 'Dashboard',          icon: '🏢' },
    { key: 'mi-perfil',          label: 'Perfil institucional',icon: '🏷️' },
    { key: 'mis-convocatorias',  label: 'Mis convocatorias',  icon: '📋' },
    { key: 'crear-convocatoria', label: 'Crear convocatoria', icon: '➕' },
    { key: 'postulantes',        label: 'Postulantes',        icon: '👥' },
    { key: 'reportes',           label: 'Reportes',           icon: '📊' },
  ],
  admin: [
    { key: 'dashboard',               label: 'Dashboard',          icon: '📊' },
    { key: 'usuarios',                label: 'Usuarios',           icon: '👥' },
    { key: 'gestionar-empresas',      label: 'Organizaciones',     icon: '🏢' },
    { key: 'gestionar-convocatorias', label: 'Convocatorias',      icon: '📋' },
    { key: 'postulaciones',           label: 'Postulaciones',      icon: '📝' },
    { key: 'reportes',                label: 'Reportes',           icon: '📈' },
    { key: 'configuracion',           label: 'Configuración',      icon: '⚙️' },
  ],
};

const DEFAULT_PAGE = { admin: 'dashboard', empresa: 'inicio', estudiante: 'inicio' };
const SESSION_KEY  = 'unsch_session';

// ── Helpers de sesión ─────────────────────────────────────────────────────────
function guardarSesion(token, user) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user })); } catch {}
}
function leerSesion() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
function limpiarSesion() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Estado de sesión ─────────────────────────────────────────────────────
  const sesionGuardada = leerSesion();
  const [token,  setToken]  = useState(sesionGuardada?.token || '');
  const [user,   setUser]   = useState(sesionGuardada?.user  || null);

  // ── Estado de UI ─────────────────────────────────────────────────────────
  const [authMode,    setAuthMode]    = useState('login');
  const [activePage,  setActivePage]  = useState(DEFAULT_PAGE[sesionGuardada?.user?.rol] || 'inicio');
  const [alert,       setAlert]       = useState(null);
  const [loading,     setLoading]     = useState(false);

  // ── Datos ─────────────────────────────────────────────────────────────────
  const [perfil,             setPerfil]             = useState(null);
  const [convocatorias,      setConvocatorias]      = useState([]);
  const [postulaciones,      setPostulaciones]      = useState([]);
  const [empresasPendientes, setEmpresasPendientes] = useState([]);
  const [usuarios,           setUsuarios]           = useState([]);

  // ── Alertas ───────────────────────────────────────────────────────────────
  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  // ── Carga inicial de datos al autenticarse ────────────────────────────────
  useEffect(() => {
    if (!token || !user) return;
    cargarPerfil();
    cargarConvocatorias();
    cargarPostulaciones();
    if (user.rol === 'admin') {
      cargarEmpresasPendientes();
      cargarUsuarios();
    }
  }, [token]);

  // ── API helpers ───────────────────────────────────────────────────────────
  async function api(endpoint, options = {}) {
    return apiFetch(endpoint, options, token);
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  async function handleLogin(email, password, rol) {
    setLoading(true);
    const { ok, data } = await apiFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rol }),
    });
    setLoading(false);

    if (!ok) { showAlert('danger', data.message || 'Credenciales incorrectas.'); return; }

    setToken(data.token);
    setUser(data.user);
    guardarSesion(data.token, data.user);
    setActivePage(DEFAULT_PAGE[data.user.rol] || 'inicio');
    showAlert('success', `Bienvenido, ${data.user.nombre}.`);
  }

  async function handleRegister(formData) {
    setLoading(true);
    const { ok, data } = await apiFetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    setLoading(false);

    if (!ok) { showAlert('warning', data.message || 'Error al registrar.'); return false; }
    showAlert('success', data.message || 'Cuenta creada. Ahora inicia sesión.');
    setAuthMode('login');
    return true;
  }

  function handleLogout() {
    setToken(''); setUser(null); setPerfil(null);
    setConvocatorias([]); setPostulaciones([]);
    setEmpresasPendientes([]); setUsuarios([]);
    limpiarSesion();
    setAuthMode('login');
  }

  // ── Carga de datos ────────────────────────────────────────────────────────
  async function cargarPerfil() {
    const { ok, data } = await api('/api/perfil');
    if (ok) setPerfil(data);
  }

  async function cargarConvocatorias() {
    setLoading(true);
    const query = user?.rol === 'estudiante' ? '?activo=true' : '';
    const { ok, data } = await api(`/api/convocatorias${query}`);
    setLoading(false);
    if (ok) setConvocatorias(data.convocatorias || []);
    else showAlert('warning', data.message || 'No se pudo cargar convocatorias.');
  }

  async function cargarPostulaciones() {
    const { ok, data } = await api('/api/postulaciones');
    if (ok) setPostulaciones(data.postulaciones || []);
  }

  async function cargarEmpresasPendientes() {
    const { ok, data } = await api('/api/empresas/pending');
    if (ok) setEmpresasPendientes(data.empresas || []);
  }

  async function cargarUsuarios() {
    const { ok, data } = await api('/api/usuarios');
    if (ok) setUsuarios(data.usuarios || []);
  }

  // ── Acciones ──────────────────────────────────────────────────────────────
  async function handlePostular(convocatoriaId) {
    const { ok, data } = await api('/api/postular', {
      method: 'POST',
      body: JSON.stringify({ convocatoriaId }),
    });
    if (!ok && !data.alreadyPostulated) { showAlert('warning', data.message); return; }
    showAlert('success', data.message || 'Postulación registrada.');
    cargarPostulaciones();
  }

  async function handleActualizarPerfil(payload) {
    const { ok, data } = await api('/api/perfil', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    if (ok) { showAlert('success', data.message || 'Perfil actualizado.'); cargarPerfil(); }
    else    { showAlert('warning', data.message || 'No se pudo actualizar.'); }
  }

  async function handleCrearConvocatoria(form) {
    const { ok, data } = await api('/api/convocatorias', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (ok) { showAlert('success', data.message || 'Convocatoria publicada.'); cargarConvocatorias(); return true; }
    showAlert('warning', data.message || 'Error al crear convocatoria.');
    return false;
  }

  async function handleToggleActivo(id, activo) {
    const { ok, data } = await api(`/api/convocatorias/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ activo }),
    });
    if (ok) { showAlert('success', activo ? 'Convocatoria activada.' : 'Convocatoria cerrada.'); cargarConvocatorias(); }
    else    { showAlert('warning', data.message || 'Error al actualizar.'); }
  }

  async function handleCambiarEstado(postulacionId, estado) {
    const { ok, data } = await api(`/api/postulaciones/${postulacionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ estado }),
    });
    if (ok) { showAlert('success', 'Estado actualizado.'); cargarPostulaciones(); }
    else    { showAlert('warning', data.message || 'Error al cambiar estado.'); }
  }

  async function handleAprobarEmpresa(id) {
    const { ok, data } = await api(`/api/empresas/${id}/approve`, { method: 'PATCH' });
    if (ok) { showAlert('success', 'Organización aprobada.'); cargarEmpresasPendientes(); }
    else    { showAlert('warning', data.message || 'Error al aprobar.'); }
  }

  // ── Memos ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    totalConvocatorias:    convocatorias.length,
    totalPostulaciones:    postulaciones.length,
    postulacionesPendientes: postulaciones.filter((p) => p.estado === 'Enviado').length,
    aprobadas:             postulaciones.filter((p) => p.estado === 'Seleccionado').length,
  }), [convocatorias, postulaciones]);

  const postuladoIds = useMemo(
    () => new Set(postulaciones.map((p) => p.Convocatoria?.id || p.convocatoria_id)),
    [postulaciones]
  );

  // ── Renderizado de páginas ────────────────────────────────────────────────
  function renderPage(page) {
    const rol = user?.rol;

    // ── Estudiante ──
    if (rol === 'estudiante') {
      if (page === 'inicio')            return <InicioEstudiante stats={stats} postulaciones={postulaciones} perfil={perfil} onNavigate={setActivePage} />;
      if (page === 'convocatorias')     return <Convocatorias convocatorias={convocatorias} postuladoIds={postuladoIds} onPostular={handlePostular} loading={loading} />;
      if (page === 'mis-postulaciones') return <MisPostulaciones postulaciones={postulaciones} loading={loading} onNavigate={setActivePage} />;
      if (page === 'mi-perfil')         return <MiPerfilEstudiante perfil={perfil} onActualizar={handleActualizarPerfil} loading={loading} />;
      if (page === 'documentos')        return <Documentos perfil={perfil} />;
      if (page === 'notificaciones')    return <Notificaciones postulaciones={postulaciones} />;
    }

    // ── Empresa ──
    if (rol === 'empresa') {
      if (page === 'inicio')             return <InicioEmpresa perfil={perfil} convocatorias={convocatorias} postulaciones={postulaciones} onNavigate={setActivePage} />;
      if (page === 'mi-perfil')          return <PerfilEmpresa perfil={perfil} onActualizar={handleActualizarPerfil} loading={loading} />;
      if (page === 'mis-convocatorias')  return <MisConvocatorias convocatorias={convocatorias} loading={loading} onToggleActivo={handleToggleActivo} onNavigate={setActivePage} />;
      if (page === 'crear-convocatoria') return <CrearConvocatoria onCreate={handleCrearConvocatoria} loading={loading} />;
      if (page === 'postulantes')        return <Postulantes postulaciones={postulaciones} loading={loading} onCambiarEstado={handleCambiarEstado} />;
      if (page === 'reportes')           return <ReportesEmpresa convocatorias={convocatorias} postulaciones={postulaciones} />;
    }

    // ── Admin ──
    if (rol === 'admin') {
      if (page === 'dashboard')               return <DashboardAdmin stats={stats} postulaciones={postulaciones} empresasPendientes={empresasPendientes} usuarios={usuarios} onNavigate={setActivePage} />;
      if (page === 'usuarios')                return <GestionUsuarios usuarios={usuarios} loading={loading} onRecargar={cargarUsuarios} />;
      if (page === 'gestionar-empresas')      return <GestionEmpresas empresasPendientes={empresasPendientes} loading={loading} onAprobar={handleAprobarEmpresa} onRecargar={cargarEmpresasPendientes} />;
      if (page === 'gestionar-convocatorias') return <GestionConvocatorias convocatorias={convocatorias} loading={loading} onToggleActivo={handleToggleActivo} />;
      if (page === 'postulaciones')           return <GestionPostulaciones postulaciones={postulaciones} loading={loading} onCambiarEstado={handleCambiarEstado} />;
      if (page === 'reportes')                return <ReportesAdmin convocatorias={convocatorias} postulaciones={postulaciones} usuarios={usuarios} />;
      if (page === 'configuracion')           return <Configuracion />;
    }

    return <div className="text-muted py-5 text-center">Página no encontrada.</div>;
  }

  // ── Shell autenticado ─────────────────────────────────────────────────────
  if (token && user) {
    return (
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar superior */}
        <nav className="navbar navbar-expand-lg navbar-dark px-4 py-2"
          style={{ background: 'linear-gradient(90deg,#0d6efd 0%,#6610f2 100%)' }}>
          <span className="navbar-brand fw-bold fs-5">🎓 Sistema de Prácticas UNSCH</span>
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="text-white text-end d-none d-md-block">
              <div className="fw-semibold lh-1">{user.nombre}</div>
              <small className="text-white-50 text-capitalize">{user.rol}</small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </nav>

        {/* Alerta global */}
        {alert && (
          <div className={`alert alert-${alert.type} rounded-0 mb-0 py-2 text-center`} role="alert">
            {alert.message}
          </div>
        )}

        {/* Cuerpo: sidebar + contenido */}
        <div className="container-fluid flex-grow-1">
          <div className="row h-100">
            {/* Sidebar */}
            <aside className="col-12 col-md-3 col-xl-2 py-3 bg-light border-end" style={{ minHeight: '100%' }}>
              <Sidebar
                userRole={user.rol}
                navItems={NAV_ITEMS[user.rol] || []}
                activePage={activePage}
                onNavigate={setActivePage}
              />
            </aside>

            {/* Contenido principal */}
            <main className="col-12 col-md-9 col-xl-10 py-4 px-4">
              {renderPage(activePage)}
            </main>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ── Pantalla de autenticación ─────────────────────────────────────────────
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-5"
      style={{ background: 'linear-gradient(135deg,#0d6efd 0%,#6610f2 55%,#7952b3 100%)' }}>

      <div className="text-center text-white mb-4">
        <h1 className="display-6 fw-bold">🎓 Sistema de Prácticas UNSCH</h1>
        <p className="lead opacity-75">Portal de gestión de prácticas preprofesionales</p>
      </div>

      <div className="w-100" style={{ maxWidth: 860 }}>
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {authMode === 'login'
          ? <LoginForm
              onLogin={handleLogin}
              loading={loading}
              onSwitchToRegister={() => setAuthMode('register')}
            />
          : <RegisterForm
              onRegister={handleRegister}
              loading={loading}
              onSwitchToLogin={() => setAuthMode('login')}
            />
        }
      </div>
    </div>
  );
}
