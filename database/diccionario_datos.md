# Diccionario de Datos

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Tabla: `usuarios`

Almacena todos los usuarios del sistema independientemente de su rol.

| Campo | Tipo | Nulo | Por defecto | Descripción |
|---|---|:---:|---|---|
| `id` | INT, AUTO_INCREMENT, PK | No | — | Identificador único |
| `nombre` | VARCHAR(120) | No | — | Nombre completo o razón social |
| `email` | VARCHAR(160), UNIQUE | No | — | Correo electrónico (login) |
| `passwordHash` | VARCHAR(255) | No | — | Hash bcrypt de la contraseña |
| `rol` | ENUM('admin','empresa','estudiante') | No | — | Rol del usuario en el sistema |
| `approved` | BOOLEAN | No | `false` | Solo relevante para empresas; debe ser `true` para acceder |
| `razon_social` | VARCHAR(200) | Sí | NULL | Nombre legal de la empresa (solo rol empresa) |
| `ruc` | VARCHAR(20) | Sí | NULL | RUC de la empresa (solo rol empresa) |
| `descripcion` | TEXT | Sí | NULL | Descripción institucional (solo rol empresa) |
| `logo_url` | VARCHAR(255) | Sí | NULL | URL pública del logo (solo rol empresa) |
| `created_at` | DATETIME | No | NOW() | Fecha de creación (automático Sequelize) |
| `updated_at` | DATETIME | No | NOW() | Fecha de última actualización (automático) |

---

## Tabla: `estudiantes`

Perfil extendido del usuario con rol `estudiante`. Vinculado a `usuarios` mediante `usuario_id`.

| Campo | Tipo | Nulo | Por defecto | Descripción |
|---|---|:---:|---|---|
| `id` | INT, AUTO_INCREMENT, PK | No | — | Identificador único del perfil |
| `usuario_id` | INT, FK → usuarios.id | Sí | NULL | Referencia al usuario de autenticación |
| `nombre` | VARCHAR(120) | No | — | Nombre completo del estudiante |
| `email` | VARCHAR(160) | No | — | Email del estudiante (denormalizado para búsquedas) |
| `escuela` | VARCHAR(180) | Sí | NULL | Escuela profesional (ej: Ingeniería Informática) |
| `telefono` | VARCHAR(40) | Sí | NULL | Número de contacto |
| `cv_url` | VARCHAR(255) | Sí | NULL | URL pública del Curriculum Vitae |
| `created_at` | DATETIME | No | NOW() | Fecha de creación |
| `updated_at` | DATETIME | No | NOW() | Fecha de última actualización |

---

## Tabla: `convocatorias`

Oportunidades de prácticas publicadas por organizaciones colaboradoras.

| Campo | Tipo | Nulo | Por defecto | Descripción |
|---|---|:---:|---|---|
| `id` | INT, AUTO_INCREMENT, PK | No | — | Identificador único |
| `titulo` | VARCHAR(200) | No | — | Nombre de la convocatoria |
| `empresa` | VARCHAR(160) | No | — | Nombre de la organización publicante |
| `descripcion` | TEXT | No | — | Descripción detallada de la práctica |
| `modalidad` | ENUM('Presencial','Virtual','Híbrida') | Sí | NULL | Modalidad de trabajo |
| `activo` | BOOLEAN | No | `true` | `true` = visible para estudiantes |
| `fecha_inicio` | DATE | Sí | NULL | Fecha de inicio de la convocatoria |
| `fecha_fin` | DATE | Sí | NULL | Fecha límite para postular |
| `created_at` | DATETIME | No | NOW() | Fecha de publicación |
| `updated_at` | DATETIME | No | NOW() | Fecha de última modificación |

---

## Tabla: `postulaciones`

Registro de cada postulación de un estudiante a una convocatoria.

| Campo | Tipo | Nulo | Por defecto | Descripción |
|---|---|:---:|---|---|
| `id` | INT, AUTO_INCREMENT, PK | No | — | Identificador único |
| `estudiante_id` | INT, FK → estudiantes.id | No | — | Estudiante que postula |
| `convocatoria_id` | INT, FK → convocatorias.id | No | — | Convocatoria a la que se postula |
| `estado` | ENUM('Enviado','En Evaluación','Seleccionado','Rechazado') | No | `'Enviado'` | Estado actual del proceso |
| `created_at` | DATETIME | No | NOW() | Fecha de postulación |
| `updated_at` | DATETIME | No | NOW() | Fecha de último cambio de estado |

**Índice único:** `(estudiante_id, convocatoria_id)` — previene postulaciones duplicadas.

---

## Enumeraciones

### `usuarios.rol`
| Valor | Descripción |
|---|---|
| `admin` | Administrador del sistema UNSCH |
| `empresa` | Organización colaboradora |
| `estudiante` | Alumno de la UNSCH |

### `convocatorias.modalidad`
| Valor | Descripción |
|---|---|
| `Presencial` | Trabajo en las instalaciones de la organización |
| `Virtual` | Trabajo completamente remoto |
| `Híbrida` | Combinación de presencial y virtual |

### `postulaciones.estado`
| Valor | Descripción | Quién lo asigna |
|---|---|---|
| `Enviado` | Estado inicial al postular | Sistema |
| `En Evaluación` | El postulante está siendo evaluado | Empresa / Admin |
| `Seleccionado` | El postulante fue elegido | Empresa / Admin |
| `Rechazado` | El postulante no fue seleccionado | Empresa / Admin |
