# Reglas de Negocio

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## RN-01 — Registro de Usuarios

- **RN-01.1** No se puede registrar un administrador desde el portal público. Solo pueden crearse mediante seed o directamente en la base de datos.
- **RN-01.2** El email de un usuario debe ser único en el sistema.
- **RN-01.3** La contraseña debe tener un mínimo de 8 caracteres.
- **RN-01.4** Al registrarse como estudiante, se crea automáticamente un perfil en la tabla `estudiantes`.
- **RN-01.5** Al registrarse como organización, la cuenta queda en estado `approved = false` hasta que el administrador la apruebe.

---

## RN-02 — Autenticación y Sesión

- **RN-02.1** El token JWT es válido por 2 horas desde su emisión.
- **RN-02.2** Una organización con `approved = false` no puede iniciar sesión aunque tenga credenciales válidas.
- **RN-02.3** Cada petición a un endpoint protegido debe incluir el token en el encabezado `Authorization: Bearer <token>`.
- **RN-02.4** Si el token está expirado o es inválido, el sistema devuelve HTTP 401.

---

## RN-03 — Convocatorias

- **RN-03.1** Solo las organizaciones aprobadas o el administrador pueden crear convocatorias.
- **RN-03.2** Una organización solo puede editar y ver sus propias convocatorias.
- **RN-03.3** El administrador puede ver y editar cualquier convocatoria.
- **RN-03.4** Un estudiante solo puede ver convocatorias con `activo = true`.
- **RN-03.5** Si se especifica `fecha_fin`, no puede ser anterior a `fecha_inicio`.
- **RN-03.6** Una convocatoria se considera cerrada si `activo = false` o si `fecha_fin` es anterior a la fecha actual.
- **RN-03.7** No se puede postular a una convocatoria cerrada.

---

## RN-04 — Postulaciones

- **RN-04.1** Un estudiante no puede postular dos veces a la misma convocatoria. La combinación `(estudiante_id, convocatoria_id)` es única.
- **RN-04.2** Solo un estudiante (rol `estudiante`) puede crear una postulación.
- **RN-04.3** El estado inicial de toda postulación es `Enviado`.
- **RN-04.4** Los estados válidos son: `Enviado`, `En Evaluación`, `Seleccionado`, `Rechazado`.
- **RN-04.5** Solo una organización (para sus propias convocatorias) o el administrador pueden cambiar el estado de una postulación.
- **RN-04.6** Una organización no puede cambiar el estado de postulaciones vinculadas a convocatorias de otra organización.

---

## RN-05 — Perfiles

- **RN-05.1** Un estudiante solo puede editar su propio perfil.
- **RN-05.2** Una organización solo puede editar su propio perfil institucional.
- **RN-05.3** El administrador puede consultar cualquier perfil pero no editarlo desde el módulo de perfil.
- **RN-05.4** El campo `email` no puede modificarse una vez registrado.

---

## RN-06 — Roles y Permisos

- **RN-06.1** El sistema tiene tres roles: `admin`, `empresa`, `estudiante`.
- **RN-06.2** Un usuario solo puede tener un rol.
- **RN-06.3** Los endpoints de la API validan el rol antes de ejecutar cualquier operación.
- **RN-06.4** El frontend oculta las opciones de menú no autorizadas según el rol activo.

---

## RN-07 — Reportes

- **RN-07.1** Solo el administrador y las organizaciones pueden generar reportes.
- **RN-07.2** Una organización solo puede generar reportes de sus propias convocatorias y postulantes.
- **RN-07.3** Los reportes CSV se generan completamente en el cliente (navegador).
