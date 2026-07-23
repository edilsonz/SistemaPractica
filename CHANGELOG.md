# Changelog

Todos los cambios relevantes del proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [1.1.0] — Julio 2026

### Mejoras de Interfaz y Preparación para Producción

#### Agregado — UI/UX
- `frontend/src/index.css` — Sistema de diseño propio con variables CSS, clases `.sp-*`, scrollbar personalizado, fuente del sistema.
- `AuthScreen.jsx` — Pantalla de autenticación con layout split hero/formulario. Panel izquierdo con branding UNSCH, features y stats. Responsive: colapsa a formulario solo en móvil.
- `Toast.jsx` / `ToastContainer` — Cola de notificaciones flotante (fixed top-right) con animación slide-in/out, barra de progreso de 4s y auto-dismiss. Reemplaza el alert de barra completa.
- Animación de entrada de página (`sp-page-enter`) al cambiar de sección.
- Navegación móvil horizontal scrollable (antes el sidebar no era accesible en móvil sin menú hamburgesa).

#### Modificado — UI/UX
- `Navbar.jsx` — Avatar circular con inicial del usuario, coloreado por rol (admin/empresa/estudiante), badge numérico de pendientes, botón salir con icono SVG, responsive.
- `Sidebar.jsx` — Borde izquierdo en ítem activo, cabecera de rol con gradiente, badges de pendientes por ítem según rol, divisor antes de Configuración. Usa clases CSS del sistema de diseño.
- `LoadingSpinner.jsx` — Tres puntos pulsantes CSS. Prop `overlay` para superposición con blur.
- `EmptyState.jsx` — SVGs inline temáticos (búsqueda, lista, inbox, campana, usuarios, check). Emoji como fallback para retrocompatibilidad.
- `Convocatorias.jsx` — Indicador de días restantes (`DiasRestantesTag`): badge crítico parpadeante (≤3 días), cierre "Hoy", borde izquierdo amarillo, botón deshabilitado si plazo vencido.
- `App.jsx` — Integra `AuthScreen`, `ToastContainer`, nuevo `Navbar` con `pendingCount`, nuevo `Sidebar` con `sidebarBadges` calculados por rol. Ref para evitar doble carga en Strict Mode.

#### Agregado — Despliegue
- `backend/Dockerfile` — Node 20 Alpine, `npm ci --omit=dev`, expone puerto 4000.
- `frontend/Dockerfile` — Build multietapa (Node 20 builder → nginx 1.27 Alpine), `VITE_API_URL` como build arg, cache de assets con `immutable`.
- `backend/.dockerignore` y `frontend/.dockerignore`.
- `deployment/docker-compose.yml` — Corregido: `VITE_API_URL` pasa como `build arg` (no variable de entorno de runtime, ya que Vite la incrusta en el bundle durante el build).

---

## [1.0.0] — Julio 2026

### Reorganización y Arquitectura Profesional

#### Agregado
- Carpeta `architecture/` con documentación técnica completa (arquitectura, estructura, patrones, flujo, decisiones ADR).
- Carpeta `specs/` con especificaciones funcionales: visión, requerimientos, casos de uso, historias de usuario, reglas de negocio, flujo del sistema, permisos por roles y backlog.
- Carpeta `database/` con modelo ER, diccionario de datos, relaciones y scripts.
- Carpeta `deployment/` con Docker Compose, variables de producción y guía de despliegue.
- Carpeta `tests/` preparada para tests futuros.
- Capa `controllers/` en el backend: `auth`, `convocatoria`, `postulacion`, `empresa`, `usuario`.
- Capa `services/` en el backend con lógica de negocio separada del HTTP.
- Capa `validations/` en el backend para validación de datos de entrada.
- `app.js` como configuración pura de Express (separado del arranque).
- `AuthContext.jsx` para estado global de sesión en el frontend.
- `useApi.js` hook genérico para peticiones HTTP.
- Servicios del frontend: `convocatoria.service.js`, `postulacion.service.js`, `usuario.service.js`, `empresa.service.js`.
- Utilidades del frontend: `api.js` (cliente HTTP centralizado) y `csv.js` (exportador).
- Componentes de layout: `AppLayout`, `Navbar`, `Sidebar`, `Footer`.
- `CHANGELOG.md`, `ROADMAP.md` como documentos raíz.
- `JWT_SECRET` y `FRONTEND_URL` añadidos al `.env.example`.

#### Modificado
- `server.js` simplificado: solo importa `app` y arranca el servidor HTTP.
- Rutas del backend convertidas en thin routers (solo conectan middleware + controller).
- `README.md` completamente reescrito con estructura profesional.
- `.env.example` actualizado con todas las variables requeridas.

#### Mantenido (sin cambios funcionales)
- Modelos Sequelize: `Usuario`, `Estudiante`, `Convocatoria`, `Postulacion`.
- Middleware `auth.js` (`authenticateJWT`, `requireRole`).
- Toda la lógica de negocio existente — migrada a la capa `services/`.
- Frontend: `App.jsx` y `Dashboard.jsx` funcionales y sin regresiones.

---

## [0.9.0] — Junio 2026

### Funcionalidades Core

#### Agregado
- Autenticación con JWT y bcrypt.
- Registro de usuarios: estudiante y empresa.
- Aprobación de organizaciones por el administrador.
- CRUD de convocatorias con filtros por modalidad y estado.
- Proceso de postulación con prevención de duplicados.
- Cambio de estado de postulaciones: Enviado → En Evaluación → Seleccionado / Rechazado.
- Panel de control por rol (admin, empresa, estudiante).
- Exportación de reportes en CSV.
- Gestión de perfil para todos los roles.
- Listado de usuarios para el administrador.
- Script de seed con datos de demostración.
- Documentación inicial en `docs/`.
