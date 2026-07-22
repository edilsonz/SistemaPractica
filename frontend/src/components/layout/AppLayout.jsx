/**
 * AppLayout — Shell principal de la aplicación autenticada.
 * Compone: Navbar + Sidebar + área de contenido + Footer.
 */

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const NAV_ITEMS = {
  estudiante: [
    { key: 'inicio',            label: 'Resumen personal',   icon: '🏠' },
    { key: 'convocatorias',     label: 'Convocatorias',       icon: '📋' },
    { key: 'mis-postulaciones', label: 'Mis postulaciones',   icon: '📝' },
    { key: 'mi-perfil',         label: 'Mi perfil',           icon: '👤' },
    { key: 'documentos',        label: 'Documentación',       icon: '📄' },
    { key: 'notificaciones',    label: 'Notificaciones',      icon: '🔔' },
  ],
  empresa: [
    { key: 'inicio',              label: 'Dashboard institucional', icon: '🏢' },
    { key: 'mi-perfil',           label: 'Perfil institucional',    icon: '🏷️' },
    { key: 'mis-convocatorias',   label: 'Mis convocatorias',       icon: '📋' },
    { key: 'crear-convocatoria',  label: 'Crear convocatoria',      icon: '➕' },
    { key: 'postulantes',         label: 'Postulantes',             icon: '👥' },
    { key: 'reportes',            label: 'Reportes',                icon: '📊' },
    { key: 'notificaciones',      label: 'Notificaciones',          icon: '🔔' },
  ],
  admin: [
    { key: 'dashboard',               label: 'Dashboard',              icon: '📊' },
    { key: 'usuarios',                label: 'Gestión de usuarios',    icon: '👥' },
    { key: 'estudiantes',             label: 'Estudiantes',            icon: '🎓' },
    { key: 'gestionar-empresas',      label: 'Organizaciones',         icon: '🏢' },
    { key: 'gestionar-convocatorias', label: 'Convocatorias',          icon: '📋' },
    { key: 'postulaciones',           label: 'Postulaciones',          icon: '📝' },
    { key: 'reportes',                label: 'Reportes',               icon: '📈' },
    { key: 'configuracion',           label: 'Configuración',          icon: '⚙️' },
  ],
};

const DEFAULT_PAGE = { admin: 'dashboard', empresa: 'inicio', estudiante: 'inicio' };

export default function AppLayout({ userRole, children, renderPage }) {
  const [activePage, setActivePage] = useState(DEFAULT_PAGE[userRole] || 'inicio');
  const navItems = NAV_ITEMS[userRole] || [];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar */}
          <aside className="col-12 col-md-3 col-lg-2 py-3 bg-light border-end">
            <Sidebar
              userRole={userRole}
              navItems={navItems}
              activePage={activePage}
              onNavigate={setActivePage}
            />
          </aside>

          {/* Contenido principal */}
          <main className="col-12 col-md-9 col-lg-10 py-4 px-4">
            {renderPage ? renderPage(activePage, setActivePage) : children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { NAV_ITEMS, DEFAULT_PAGE };
