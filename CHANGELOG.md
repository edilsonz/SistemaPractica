# Changelog

Todos los cambios relevantes del proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

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
