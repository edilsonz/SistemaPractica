# Registro de Decisiones de Arquitectura (ADR)

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Formato:** Architecture Decision Record

---

## ADR-001 — Node.js + Express como backend

**Fecha:** Inicio del proyecto
**Estado:** Aceptado

**Contexto:** Se necesita un backend ligero, rápido de desarrollar y con amplio ecosistema npm para una aplicación web universitaria.

**Decisión:** Usar Node.js con Express 4.

**Consecuencias:**
- `+` Mismo lenguaje (JS) en frontend y backend, reduciendo la curva de aprendizaje.
- `+` Ecosistema maduro: JWT, bcrypt, Sequelize, morgan disponibles como paquetes estables.
- `-` No incluye estructura por defecto; se debe definir explícitamente (resuelta con la capa MVC).

---

## ADR-002 — MySQL como base de datos

**Fecha:** Inicio del proyecto
**Estado:** Aceptado

**Contexto:** La UNSCH ya cuenta con infraestructura MySQL disponible.

**Decisión:** Usar MySQL 8 con Sequelize como ORM.

**Consecuencias:**
- `+` Compatibilidad con la infraestructura existente de la universidad.
- `+` Sequelize abstrae las diferencias de dialecto y permite migraciones.
- `-` Sequelize puede generar consultas subóptimas; se mitiga con índices explícitos.

---

## ADR-003 — JWT para autenticación (sin sesiones de servidor)

**Fecha:** Inicio del proyecto
**Estado:** Aceptado

**Contexto:** Se requiere autenticación stateless compatible con una futura separación de servicios.

**Decisión:** JWT firmado con HS256, expiración de 2 horas, secret en variable de entorno.

**Consecuencias:**
- `+` Sin estado en el servidor; cada petición es autónoma.
- `+` El payload incluye `sub`, `rol` y `email`, evitando consultas adicionales a la DB en la mayoría de los middlewares.
- `-` No es posible invalidar un token antes de su expiración (a resolver con lista negra en sprint futuro).

---

## ADR-004 — React + Vite como frontend

**Fecha:** Inicio del proyecto
**Estado:** Aceptado

**Contexto:** Se necesita una SPA moderna con HMR rápido durante el desarrollo.

**Decisión:** React 18 con Vite como bundler y Bootstrap 5 para estilos.

**Consecuencias:**
- `+` HMR instantáneo durante el desarrollo.
- `+` Bootstrap 5 provee componentes responsivos listos para usar.
- `-` Sin enrutador declarativo (React Router); la navegación se maneja con estado local. A migrar en sprint 2.

---

## ADR-005 — Separación app.js / server.js en el backend

**Fecha:** Julio 2026 (Reorganización v1.0)
**Estado:** Aceptado

**Contexto:** El servidor y la configuración de Express estaban en un único `server.js`, dificultando el testing.

**Decisión:** `app.js` contiene la configuración de Express (middlewares, rutas, error handlers). `server.js` importa `app` y arranca el servidor HTTP.

**Consecuencias:**
- `+` Los tests pueden importar `app` sin iniciar el servidor ni la DB.
- `+` Separación de responsabilidades más clara.

---

## ADR-006 — Capa de servicios separada de los controladores

**Fecha:** Julio 2026 (Reorganización v1.0)
**Estado:** Aceptado

**Contexto:** La lógica de negocio estaba directamente en las rutas, mezclando HTTP con operaciones de base de datos.

**Decisión:** Crear `services/` con la lógica pura y `controllers/` que solo manejan HTTP.

**Consecuencias:**
- `+` La lógica es testeable sin HTTP.
- `+` Los controladores son predecibles y fáciles de leer.
- `+` Un servicio puede ser reutilizado por múltiples controladores en el futuro.

---

## ADR-007 — Errores con statusCode adjunto

**Fecha:** Julio 2026 (Reorganización v1.0)
**Estado:** Aceptado

**Contexto:** Se necesitaba una forma consistente de propagar el código HTTP correcto desde el servicio al controlador sin acoplarlos.

**Decisión:** Los servicios lanzan `Error` con propiedad `.statusCode`. Los controladores hacen `res.status(err.statusCode || 500)`.

**Consecuencias:**
- `+` Un solo patrón `catch` en todos los controladores.
- `+` El servicio controla semánticamente qué código corresponde a cada error.

---

## ADR-008 — Bootstrap 5 sin librería de componentes adicional

**Fecha:** Inicio del proyecto
**Estado:** Aceptado

**Contexto:** Se evaluó usar MUI o Ant Design pero se priorizó la simplicidad y el control total del markup.

**Decisión:** Bootstrap 5 + react-bootstrap para componentes que requieren JS (modales, tooltips).

**Consecuencias:**
- `+` Sin dependencias pesadas ni curva de aprendizaje adicional.
- `+` Compatible con el conocimiento existente del equipo.
- `-` Menor cantidad de componentes avanzados listos para usar que MUI.
