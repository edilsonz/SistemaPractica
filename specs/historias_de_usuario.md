# Historias de Usuario

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

Formato: `Como [rol], quiero [acción] para [beneficio].`

---

## Autenticación

**HU-01**
Como **estudiante**, quiero iniciar sesión con mi email y contraseña para acceder a las convocatorias disponibles.
- **Criterio de aceptación:** El sistema devuelve un token JWT y redirige al panel del estudiante.

**HU-02**
Como **organización**, quiero registrar mi empresa en el sistema para poder publicar convocatorias de prácticas.
- **Criterio de aceptación:** La cuenta se crea con estado pendiente y no permite login hasta ser aprobada.

**HU-03**
Como **usuario**, quiero poder cerrar sesión desde cualquier pantalla para proteger mi cuenta.
- **Criterio de aceptación:** Al cerrar sesión el token se invalida y se redirige al login.

**HU-04**
Como **usuario**, quiero recuperar mi contraseña por email para no perder el acceso a mi cuenta.
- **Criterio de aceptación:** Se envía un enlace de recuperación al email registrado. *(Pendiente)*

---

## Estudiante

**HU-05**
Como **estudiante**, quiero completar mi perfil con mis datos académicos para que las organizaciones conozcan mi información.
- **Criterio de aceptación:** Puedo guardar nombre, escuela, teléfono y URL del CV.

**HU-06**
Como **estudiante**, quiero ver solo las convocatorias activas para no postular a oportunidades cerradas.
- **Criterio de aceptación:** El listado filtra automáticamente por `activo = true`.

**HU-07**
Como **estudiante**, quiero postular a una convocatoria con un clic para simplificar el proceso.
- **Criterio de aceptación:** Se registra la postulación con estado "Enviado" y se muestra confirmación.

**HU-08**
Como **estudiante**, quiero ver el estado de mis postulaciones para saber si fui seleccionado.
- **Criterio de aceptación:** El listado muestra el estado actualizado de cada postulación.

**HU-09**
Como **estudiante**, quiero filtrar convocatorias por modalidad y palabras clave para encontrar las más relevantes para mí.
- **Criterio de aceptación:** El filtro en tiempo real actualiza el listado sin recargar la página.

---

## Organización Colaboradora

**HU-10**
Como **organización**, quiero publicar una convocatoria con descripción y fecha límite para atraer postulantes.
- **Criterio de aceptación:** La convocatoria aparece en el listado de estudiantes de forma inmediata.

**HU-11**
Como **organización**, quiero editar mis convocatorias para corregir datos o cerrarlas cuando se cubran las vacantes.
- **Criterio de aceptación:** Solo puedo editar mis propias convocatorias.

**HU-12**
Como **organización**, quiero ver los datos del estudiante que postuló para evaluar su perfil.
- **Criterio de aceptación:** El listado de postulantes muestra nombre, escuela, teléfono y enlace al CV.

**HU-13**
Como **organización**, quiero cambiar el estado de una postulación para comunicar al estudiante el avance del proceso.
- **Criterio de aceptación:** Puedo cambiar el estado a: En Evaluación, Seleccionado o Rechazado.

---

## Administrador

**HU-14**
Como **administrador**, quiero ver la lista de organizaciones pendientes para aprobarlas oportunamente.
- **Criterio de aceptación:** El panel muestra todas las organizaciones con `approved = false`.

**HU-15**
Como **administrador**, quiero aprobar una organización para que pueda iniciar sesión y publicar convocatorias.
- **Criterio de aceptación:** Al aprobar, el campo `approved` cambia a `true` y la organización puede autenticarse.

**HU-16**
Como **administrador**, quiero listar todos los usuarios del sistema para gestionar cuentas y roles.
- **Criterio de aceptación:** El listado muestra id, nombre, email, rol, estado y fecha de registro.

**HU-17**
Como **administrador**, quiero ver todas las postulaciones del sistema para supervisar el proceso global.
- **Criterio de aceptación:** El listado incluye el nombre del estudiante, la convocatoria y el estado.

**HU-18**
Como **administrador**, quiero exportar un reporte de postulaciones en CSV para analizarlo en una hoja de cálculo.
- **Criterio de aceptación:** El archivo CSV se descarga con los datos completos y codificación UTF-8.
