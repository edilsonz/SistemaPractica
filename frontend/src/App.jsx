/**
 * App.jsx — Raíz de la aplicación.
 * Gestiona autenticación, sesión persistente y enrutado por rol.
 * v1.1 — integra AuthScreen, ToastContainer, Navbar con avatar y Sidebar con badges.
 */

import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apiFetch } from './utils/api';

// ── Layout ────────────────────────────────────────────────────────────────────
import Navbar  from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer  from './components/layout/Footer';

// ── Auth ──────────────────────────────────────────────────────────────────────
import AuthScreen from './components/auth/AuthScreen';

// ── Shared ────────────────────────────────────────────────────────────────────
import { ToastContainer } from './components/shared/Toast';

// ── Estudiante ────────────────────────────────────────────────────────────────
import InicioEstudiante   from './components/estudiante/InicioEstudiante';
import Convocatorias      from './components/estudiante/Convocatorias';
import MisPostulaciones   from './components/estudiante/MisPostulaciones';
import MiPerfilEstudiante from './components/estudiante/MiPerfilEstudiante';
import Documentos         from './components/estudiante/Documentos';
import Notificaciones     from './components/estudiante/Notificaciones';

// ── Empresa ───────────────────────────────────────────────────────────────────
import InicioEmpresa     from './components/empresa/InicioEmpresa';
import PerfilEmpresa     from './components/empresa/PerfilEmpresa';
import MisConvocatorias  from './components/empresa/MisConvocatorias';
import CrearConvocatoria from './components/empresa/CrearConvocatoria';
import Postulantes       from './components/empresa/Postulantes';
import ReportesEmpresa   from './components/empresa/ReportesEmpresa';

// ── Admin ─────────────────────────────────────────────────────────────────────
import DashboardAdmin       from './components/admin/DashboardAdmin';
import GestionUsuarios      from './components/admin/GestionUsuarios';
import GestionEmpresas      from './components/admin/GestionEmpresas';
import GestionConvocatorias from './components/admin/GestionConvocatorias';
import GestionPostulaciones from './components/admin/GestionPostulaciones';
import ReportesAdmin        from './components/admin/ReportesAdmin';
import Configuracion        from './components/admin/Configuracion';

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
    { key: 'inicio',             label: 'Dashboard',           icon: '🏢' },
    { key: 'mi-perfil',          label: 'Perfil institucional', icon: '🏷️' },
    { key: 'mis-convocatorias',  label: 'Mis convocatorias',   icon: '📋' },
    { key: 'crear-convocatoria', label: 'Crear convocatoria',  icon: '➕' },
    { key: 'postulantes',        label: 'Postulantes',         icon: '👥' },
    { key: 'reportes',           label: 'Reportes',            icon: '📊' },
  ],
  admin: [
    { key: 'dashboard',               label: 'Dashboard',     icon: '📊' },
    { key: 'usuarios',                label: 'Usuarios',      icon: '👥' },
    { key: 'gestionar-empresas',      label: 'Organizaciones',icon: '🏢' },
    { key: 'gestionar-convocatorias', label: 'Convocatorias', icon: '📋' },
    { key: 'postulaciones',           label: 'Postulaciones', icon: '📝' },
    { key: 'reportes',                label: 'Reportes',      icon: '📈' },
    { key: 'configuracion',           label: 'Configuración', icon: '⚙️', dividerBefore: true },
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

// ── Counter ID para toasts ─────────────────────────────────────────────────────
let _toastId = 0;

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Estado de sesión ──────────────────────────────────────────────────────
  const sesionGuardada = leerSesion();
  const [token, setToken] = useState(sesionGuardada?.token || '');
  const [user,  setUser]  = useState(sesionGuardada?.user  || null);

  // ── Estado de UI ──────────────────────────────────────────────────────────
  const [authMode,   setAuthMode]   = useState('login');
  const [activePage, setActivePage] = useState(DEFAULT_PAGE[sesionGuardada?.user?.rol] || 'inicio');
  const [loading,    setLoading]    = useState(false);
  const [toasts,     setToasts]     = useState([]);

  // ── Datos ─────────────────────────────────────────────────────────────────
  const [perfil,             setPerfil]             = useState(null);
  const [convocatorias,      setConvocatorias]      = useState([]);
  const [postulaciones,      setPostulaciones]      = useState([]);
  const [empresasPendientes, setEmpresasPendientes] = useState([]);
  const [usuarios,           setUsuarios]           = useState([]);

  // ── Toast helpers ─────────────────────────────────────────────────────────
  const showAlert = useCallback((type, message) => {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Carga inicial al autenticarse ─────────────────────────────────────────
  // Usamos una ref para evitar doble-carga en Strict Mode (React 18)
  const loadedRef = useRef(false);
  useEffect(() => {
    if (!token || !user) { loadedRef.current = false; return; }
    if (loadedRef.current) return;
    loadedRef.current = true;
    cargarPerfil();
    cargarConvocatorias();
    cargarPostulaciones();
    if (user.rol === 'admin') {
      cargarEmpresasPendientes();
      cargarUsuarios();
    }
  }, [token]);

  // ── API helper ─────────────────────────────────────────────────────────────
  function api(endpoint, options = {}) {
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
    totalConvocatorias:       convocatorias.length,
    totalPostulaciones:       postulaciones.length,
    postulacionesPendientes:  postulaciones.filter((p) => p.estado === 'Enviado').length,
    aprobadas:                postulaciones.filter((p) => p.estado === 'Seleccionado').length,
  }), [convocatorias, postulaciones]);

  const postuladoIds = useMemo(
    () => new Set(postulaciones.map((p) => p.Convocatoria?.id || p.convocatoria_id)),
    [postulaciones]
  );

  // Badges del sidebar: claves de nav item → conteo
  const sidebarBadges = useMemo(() => {
    if (!user) return {};
    if (user.rol === 'admin') {
      return {
        'gestionar-empresas': empresasPendientes.length,
        'postulaciones':      postulaciones.filter((p) => p.estado === 'Enviado').length,
      };
    }
    if (user.rol === 'empresa') {
      return {
        postulantes: postulaciones.filter((p) => p.estado === 'Enviado').length,
      };
    }
    if (user.rol === 'estudiante') {
      return {
        notificaciones: postulaciones.filter((p) => p.estado === 'En Evaluación').length,
      };
    }
    return {};
  }, [user, empresasPendientes, postulaciones]);

  // Total de pendientes para el badge del navbar (solo admin y empresa)
  const navbarPendingCount = useMemo(() => {
    if (user?.rol === 'admin')   return empresasPendientes.length;
    if (user?.rol === 'empresa') return postulaciones.filter((p) => p.estado === 'Enviado').length;
    return 0;
  }, [user, empresasPendientes, postulaciones]);

  // ── Renderizado de páginas ────────────────────────────────────────────────
  function renderPage(page) {
    const rol = user?.rol;

    // ── Estudiante ──
    if (rol === 'estudiante') {
      if (page === 'inicio')            return <InicioEstudiante   stats={stats} postulaciones={postulaciones} perfil={perfil} onNavigate={setActivePage} />;
      if (page === 'convocatorias')     return <Convocatorias      convocatorias={convocatorias} postuladoIds={postuladoIds} onPostular={handlePostular} loading={loading} />;
      if (page === 'mis-postulaciones') return <MisPostulaciones   postulaciones={postulaciones} loading={loading} onNavigate={setActivePage} />;
      if (page === 'mi-perfil')         return <MiPerfilEstudiante perfil={perfil} onActualizar={handleActualizarPerfil} loading={loading} />;
      if (page === 'documentos')        return <Documentos         perfil={perfil} />;
      if (page === 'notificaciones')    return <Notificaciones     postulaciones={postulaciones} />;
    }

    // ── Empresa ──
    if (rol === 'empresa') {
      if (page === 'inicio')             return <InicioEmpresa     perfil={perfil} convocatorias={convocatorias} postulaciones={postulaciones} onNavigate={setActivePage} />;
      if (page === 'mi-perfil')          return <PerfilEmpresa     perfil={perfil} onActualizar={handleActualizarPerfil} loading={loading} />;
      if (page === 'mis-convocatorias')  return <MisConvocatorias  convocatorias={convocatorias} loading={loading} onToggleActivo={handleToggleActivo} onNavigate={setActivePage} />;
      if (page === 'crear-convocatoria') return <CrearConvocatoria onCreate={handleCrearConvocatoria} loading={loading} />;
      if (page === 'postulantes')        return <Postulantes       postulaciones={postulaciones} loading={loading} onCambiarEstado={handleCambiarEstado} />;
      if (page === 'reportes')           return <ReportesEmpresa   convocatorias={convocatorias} postulaciones={postulaciones} />;
    }

    // ── Admin ──
    if (rol === 'admin') {
      if (page === 'dashboard')               return <DashboardAdmin       stats={stats} postulaciones={postulaciones} empresasPendientes={empresasPendientes} usuarios={usuarios} onNavigate={setActivePage} />;
      if (page === 'usuarios')                return <GestionUsuarios      usuarios={usuarios} loading={loading} onRecargar={cargarUsuarios} />;
      if (page === 'gestionar-empresas')      return <GestionEmpresas      empresasPendientes={empresasPendientes} loading={loading} onAprobar={handleAprobarEmpresa} onRecargar={cargarEmpresasPendientes} />;
      if (page === 'gestionar-convocatorias') return <GestionConvocatorias convocatorias={convocatorias} loading={loading} onToggleActivo={handleToggleActivo} />;
      if (page === 'postulaciones')           return <GestionPostulaciones postulaciones={postulaciones} loading={loading} onCambiarEstado={handleCambiarEstado} />;
      if (page === 'reportes')                return <ReportesAdmin        convocatorias={convocatorias} postulaciones={postulaciones} usuarios={usuarios} />;
      if (page === 'configuracion')           return <Configuracion />;
    }

    return <p className="text-muted py-5 text-center">Página no encontrada.</p>;
  }

  // ── Shell autenticado ─────────────────────────────────────────────────────
  if (token && user) {
    return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh', background: '#f4f6fb' }}>
        {/* Navbar */}
        <Navbar user={user} logout={handleLogout} pendingCount={navbarPendingCount} />

        {/* Toast container — flotante, sobre todo */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />

        {/* Cuerpo: sidebar + contenido */}
        <div className="flex-grow-1 d-flex" style={{ minHeight: 0 }}>
          {/* Sidebar */}
          <aside style={{ width: 220, flexShrink: 0 }} className="d-none d-md-block">
            <Sidebar
              userRole={user.rol}
              navItems={NAV_ITEMS[user.rol] || []}
              activePage={activePage}
              onNavigate={setActivePage}
              badges={sidebarBadges}
            />
          </aside>

          {/* Contenido principal */}
          <main
            className="flex-grow-1 py-4 px-3 px-lg-4 overflow-auto"
            style={{ minWidth: 0 }}
          >
            {/* Barra móvil de navegación (visible solo en xs/sm) */}
            <div className="d-md-none mb-3 pb-2" style={{ borderBottom: '1px solid #e9ecef', overflowX: 'auto' }}>
              <div className="d-flex gap-1" style={{ flexWrap: 'nowrap', paddingBottom: 2 }}>
                {(NAV_ITEMS[user.rol] || []).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`btn btn-sm text-nowrap ${activePage === item.key ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={{ borderRadius: '2rem', fontSize: '0.78rem' }}
                    onClick={() => setActivePage(item.key)}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Página con animación de entrada */}
            <div key={activePage} className="sp-page-enter">
              {renderPage(activePage)}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    );
  }

  // ── Pantalla de autenticación ─────────────────────────────────────────────
  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AuthScreen
        mode={authMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        loading={loading}
        onSwitchToRegister={() => setAuthMode('register')}
        onSwitchToLogin={() => setAuthMode('login')}
      />
    </>
  );
}
