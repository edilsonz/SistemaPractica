# Requerimientos Funcionales

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## RF-01 — Módulo de Autenticación

| ID | Requerimiento | Estado |
|---|---|---|
| RF-01.1 | El sistema debe permitir iniciar sesión con email y contraseña | ✅ Implementado |
| RF-01.2 | El sistema debe validar credenciales y devolver un token JWT | ✅ Implementado |
| RF-01.3 | El sistema debe redirigir al usuario según su rol | ✅ Implementado |
| RF-01.4 | El sistema debe permitir cerrar sesión | ✅ Implementado |
| RF-01.5 | El sistema debe permitir registrar una cuenta nueva (estudiante u organización) | ✅ Implementado |
| RF-01.6 | El sistema debe bloquear el acceso a organizaciones no aprobadas | ✅ Implementado |
| RF-01.7 | El sistema debe permitir recuperación de contraseña por email | 🔲 Pendiente |
| RF-01.8 | El sistema debe permitir cambio de contraseña desde el perfil | 🔲 Pendiente |
| RF-01.9 | El token JWT debe expirar a las 2 horas | ✅ Implementado |

---

## RF-02 — Módulo de Usuarios

| ID | Requerimiento | Estado |
|---|---|---|
| RF-02.1 | El administrador debe poder listar todos los usuarios registrados | ✅ Implementado |
| RF-02.2 | El administrador debe poder ver el rol y estado de cada usuario | ✅ Implementado |
| RF-02.3 | El administrador debe poder activar o desactivar cuentas | 🔲 Pendiente |
| RF-02.4 | El administrador debe poder eliminar usuarios | 🔲 Pendiente |
| RF-02.5 | El administrador debe poder editar datos de cualquier usuario | 🔲 Pendiente |
| RF-02.6 | El sistema debe impedir registrar administradores desde el portal público | ✅ Implementado |

---

## RF-03 — Módulo de Estudiantes

| ID | Requerimiento | Estado |
|---|---|---|
| RF-03.1 | El estudiante debe poder completar y actualizar su perfil | ✅ Implementado |
| RF-03.2 | El perfil debe incluir nombre, escuela, teléfono y URL del CV | ✅ Implementado |
| RF-03.3 | El estudiante debe poder registrar su código universitario | 🔲 Pendiente |
| RF-03.4 | El estudiante debe poder registrar su ciclo académico | 🔲 Pendiente |
| RF-03.5 | El estudiante debe poder subir Carta de Presentación | 🔲 Pendiente |
| RF-03.6 | El estudiante debe poder visualizar y actualizar sus documentos | 🔲 Pendiente |
| RF-03.7 | El administrador debe poder listar y consultar perfiles de estudiantes | ✅ Implementado |

---

## RF-04 — Módulo de Organizaciones Colaboradoras

| ID | Requerimiento | Estado |
|---|---|---|
| RF-04.1 | Una organización debe poder registrarse con razón social y RUC | ✅ Implementado |
| RF-04.2 | La organización debe poder editar su información institucional | ✅ Implementado |
| RF-04.3 | El administrador debe aprobar el registro de una organización antes de que pueda acceder | ✅ Implementado |
| RF-04.4 | La organización debe poder registrar dirección y sector | 🔲 Pendiente |
| RF-04.5 | La organización debe poder consultar su historial de convocatorias | ✅ Implementado |
| RF-04.6 | El sistema debe permitir gestionar convenios | 🔲 Pendiente |

---

## RF-05 — Módulo de Convocatorias

| ID | Requerimiento | Estado |
|---|---|---|
| RF-05.1 | Una organización o administrador debe poder crear una convocatoria | ✅ Implementado |
| RF-05.2 | Una convocatoria debe incluir título, descripción, modalidad, fechas | ✅ Implementado |
| RF-05.3 | Una convocatoria debe poder activarse o cerrarse | ✅ Implementado |
| RF-05.4 | La organización solo debe ver y editar sus propias convocatorias | ✅ Implementado |
| RF-05.5 | El estudiante solo debe ver convocatorias activas | ✅ Implementado |
| RF-05.6 | El administrador debe poder ver todas las convocatorias | ✅ Implementado |
| RF-05.7 | Debe poder definirse número de vacantes por convocatoria | 🔲 Pendiente |
| RF-05.8 | Debe poder definirse requisitos específicos por convocatoria | 🔲 Pendiente |
| RF-05.9 | Debe poder eliminarse una convocatoria | 🔲 Pendiente |

---

## RF-06 — Módulo de Postulaciones

| ID | Requerimiento | Estado |
|---|---|---|
| RF-06.1 | El estudiante debe poder postular a una convocatoria activa | ✅ Implementado |
| RF-06.2 | El sistema debe evitar postulaciones duplicadas | ✅ Implementado |
| RF-06.3 | El estudiante debe poder consultar el historial y estado de sus postulaciones | ✅ Implementado |
| RF-06.4 | La organización debe poder cambiar el estado de una postulación | ✅ Implementado |
| RF-06.5 | El administrador debe poder ver todas las postulaciones | ✅ Implementado |
| RF-06.6 | El estudiante debe poder adjuntar documentos al postular | 🔲 Pendiente |
| RF-06.7 | El estudiante debe poder cancelar una postulación en estado "Enviado" | 🔲 Pendiente |

---

## RF-07 — Módulo de Gestión de Postulantes (Organización)

| ID | Requerimiento | Estado |
|---|---|---|
| RF-07.1 | La organización debe visualizar todos los postulantes a sus convocatorias | ✅ Implementado |
| RF-07.2 | La organización debe poder consultar el CV del postulante | ✅ Implementado (URL) |
| RF-07.3 | La organización debe poder filtrar postulantes por convocatoria y estado | 🔲 Pendiente |
| RF-07.4 | La organización debe poder cambiar el estado: Enviado → En Evaluación → Seleccionado / Rechazado | ✅ Implementado |

---

## RF-08 — Módulo de Dashboard

| ID | Requerimiento | Estado |
|---|---|---|
| RF-08.1 | El administrador debe ver estadísticas globales del sistema | 🔲 Parcial |
| RF-08.2 | El estudiante debe ver sus convocatorias disponibles y estado de postulaciones | ✅ Implementado |
| RF-08.3 | La organización debe ver sus convocatorias publicadas y cantidad de postulantes | ✅ Implementado |
| RF-08.4 | El dashboard debe mostrar actividad reciente | 🔲 Pendiente |

---

## RF-09 — Módulo de Reportes

| ID | Requerimiento | Estado |
|---|---|---|
| RF-09.1 | El sistema debe permitir exportar reportes de postulaciones en CSV | ✅ Implementado |
| RF-09.2 | El sistema debe permitir exportar reportes de convocatorias | 🔲 Pendiente |
| RF-09.3 | Los reportes deben poder filtrarse por fechas | 🔲 Pendiente |
| RF-09.4 | Exportación a PDF y Excel | 🔲 Pendiente (futuro) |

---

## RF-10 — Módulo de Notificaciones

| ID | Requerimiento | Estado |
|---|---|---|
| RF-10.1 | El sistema debe mostrar alertas visuales ante eventos importantes | ✅ Implementado |
| RF-10.2 | Notificaciones por email (registro, cambio de estado) | 🔲 Pendiente |
| RF-10.3 | Notificaciones internas persistentes en la plataforma | 🔲 Pendiente |

---

## RF-11 — Módulo de Perfil

| ID | Requerimiento | Estado |
|---|---|---|
| RF-11.1 | Todo usuario puede visualizar y editar su perfil | ✅ Implementado |
| RF-11.2 | El perfil muestra datos específicos según el rol | ✅ Implementado |
| RF-11.3 | El usuario puede cambiar su fotografía de perfil | 🔲 Pendiente |
| RF-11.4 | El usuario puede cambiar su contraseña | 🔲 Pendiente |
