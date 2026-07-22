# Casos de Uso

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## CU-01 — Iniciar Sesión

- **Actor:** Administrador, Estudiante, Organización
- **Precondición:** El usuario tiene una cuenta registrada y activa.
- **Flujo principal:**
  1. El usuario ingresa email y contraseña.
  2. El sistema valida las credenciales contra la base de datos.
  3. El sistema genera un token JWT con el rol del usuario.
  4. El sistema redirige al panel correspondiente según el rol.
- **Flujo alternativo:**
  - 2a. Credenciales inválidas → el sistema muestra mensaje de error.
  - 2b. Organización no aprobada → el sistema informa que está pendiente de aprobación.
- **Postcondición:** El usuario queda autenticado con una sesión activa.

---

## CU-02 — Registrar Cuenta

- **Actor:** Estudiante, Organización
- **Precondición:** El usuario no tiene cuenta registrada.
- **Flujo principal:**
  1. El usuario selecciona el rol (estudiante u organización).
  2. Completa el formulario con los datos requeridos.
  3. El sistema valida el email (único), la contraseña (mínimo 8 caracteres) y el rol.
  4. El sistema crea la cuenta y redirige al login.
- **Flujo alternativo:**
  - 3a. Email ya registrado → el sistema muestra error 409.
  - 3b. Organización → el sistema marca la cuenta como pendiente de aprobación.
- **Postcondición:** La cuenta queda creada. Las organizaciones quedan en estado pendiente.

---

## CU-03 — Aprobar Organización

- **Actor:** Administrador
- **Precondición:** Existe al menos una organización pendiente de aprobación.
- **Flujo principal:**
  1. El administrador accede al panel de organizaciones pendientes.
  2. Consulta los datos de la organización.
  3. Hace clic en "Aprobar".
  4. El sistema actualiza el campo `approved = true`.
  5. La organización puede iniciar sesión a partir de ese momento.
- **Postcondición:** La organización queda habilitada para acceder al sistema.

---

## CU-04 — Completar Perfil de Estudiante

- **Actor:** Estudiante
- **Precondición:** El estudiante ha iniciado sesión.
- **Flujo principal:**
  1. El estudiante accede a "Mi perfil".
  2. Completa o actualiza: nombre, escuela, teléfono, URL del CV.
  3. Guarda los cambios.
  4. El sistema actualiza el registro en la tabla `estudiantes`.
- **Postcondición:** El perfil queda actualizado y visible para las organizaciones al postular.

---

## CU-05 — Publicar Convocatoria

- **Actor:** Organización, Administrador
- **Precondición:** El usuario ha iniciado sesión con rol empresa o admin.
- **Flujo principal:**
  1. El usuario accede a "Crear convocatoria".
  2. Ingresa título, descripción, modalidad, fecha de inicio y fecha límite.
  3. El sistema valida los datos y crea la convocatoria como activa.
- **Flujo alternativo:**
  - Fecha fin anterior a fecha inicio → el sistema muestra error de validación.
- **Postcondición:** La convocatoria queda publicada y visible para los estudiantes.

---

## CU-06 — Postular a una Convocatoria

- **Actor:** Estudiante
- **Precondición:** El estudiante ha iniciado sesión y la convocatoria está activa.
- **Flujo principal:**
  1. El estudiante consulta las convocatorias disponibles.
  2. Selecciona una convocatoria y hace clic en "Postular".
  3. El sistema verifica que el estudiante no haya postulado previamente.
  4. El sistema registra la postulación con estado "Enviado".
  5. Se muestra confirmación.
- **Flujo alternativo:**
  - 3a. Postulación duplicada → el sistema informa sin crear un registro nuevo.
  - 3b. Convocatoria vencida → el sistema bloquea la postulación.
- **Postcondición:** La postulación queda registrada con estado inicial "Enviado".

---

## CU-07 — Cambiar Estado de Postulación

- **Actor:** Organización, Administrador
- **Precondición:** Existe al menos una postulación activa vinculada a la organización.
- **Flujo principal:**
  1. El usuario accede a "Postulantes".
  2. Selecciona una postulación.
  3. Elige un nuevo estado: `En Evaluación`, `Seleccionado` o `Rechazado`.
  4. El sistema actualiza el estado en la base de datos.
- **Flujo alternativo:**
  - Organización intenta modificar postulación de otra empresa → el sistema devuelve error 403.
- **Postcondición:** El estado de la postulación queda actualizado. El estudiante puede consultarlo.

---

## CU-08 — Consultar Estado de Postulaciones

- **Actor:** Estudiante
- **Precondición:** El estudiante ha realizado al menos una postulación.
- **Flujo principal:**
  1. El estudiante accede a "Mis postulaciones".
  2. El sistema lista todas sus postulaciones con el estado actual.
- **Postcondición:** El estudiante conoce el estado actualizado de cada postulación.

---

## CU-09 — Exportar Reporte

- **Actor:** Administrador, Organización
- **Precondición:** Existen datos en el sistema.
- **Flujo principal:**
  1. El usuario accede al módulo de reportes.
  2. Selecciona el tipo de reporte y aplica filtros opcionales.
  3. El sistema genera el archivo CSV.
  4. El navegador descarga el archivo.
- **Postcondición:** El usuario tiene el reporte descargado localmente.

---

## CU-10 — Cerrar Sesión

- **Actor:** Administrador, Estudiante, Organización
- **Precondición:** El usuario tiene sesión activa.
- **Flujo principal:**
  1. El usuario hace clic en "Cerrar sesión".
  2. El sistema elimina el token del estado local.
  3. El sistema redirige al formulario de login.
- **Postcondición:** La sesión queda cerrada. El token ya no es válido para nuevas peticiones.
