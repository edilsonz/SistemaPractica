# Visión del Sistema

## Nombre del Proyecto
Sistema Web de Gestión de Prácticas Preprofesionales — UNSCH

## Institución
Universidad Nacional de San Cristóbal de Huamanga (UNSCH)

## Versión
1.0.0 — Julio 2026

---

## Declaración de Visión

Proporcionar a la UNSCH una plataforma web centralizada, segura y fácil de usar que automatice el proceso completo de prácticas preprofesionales: desde el registro de estudiantes y organizaciones colaboradoras, hasta el seguimiento del estado de cada postulación.

El sistema elimina la gestión manual en papel o por correo, reduce tiempos administrativos y brinda transparencia a todos los actores involucrados.

---

## Problema que Resuelve

| Situación actual | Con el sistema |
|---|---|
| Registro manual de postulaciones | Proceso digital autoservicio |
| Sin visibilidad del estado de postulación | Seguimiento en tiempo real |
| Validación de empresas sin flujo definido | Aprobación formal por el administrador |
| Reportes generados manualmente | Exportación automática |
| Documentos enviados por correo | Carga directa en el perfil |

---

## Actores del Sistema

| Actor | Descripción |
|---|---|
| **Administrador** | Personal UNSCH. Supervisa todo el sistema, aprueba organizaciones y gestiona usuarios. |
| **Estudiante** | Alumno UNSCH. Crea perfil, consulta convocatorias y realiza postulaciones. |
| **Organización Colaboradora** | Empresa o institución externa. Publica convocatorias y evalúa postulantes. |

---

## Alcance de la Versión 1.0

### Incluido
- Registro y autenticación con JWT por rol
- Gestión de perfil para los tres roles
- Publicación y gestión de convocatorias
- Proceso de postulación con seguimiento de estados
- Aprobación administrativa de organizaciones
- Panel de estadísticas por rol
- Exportación de reportes en CSV
- Documentación técnica y funcional completa

### Fuera de alcance (versiones futuras)
- Notificaciones por correo electrónico (SMTP)
- Exportación a PDF y Excel
- Upload real de archivos (CV, carta de presentación)
- Firma digital de documentos
- Integración con sistema académico UNSCH
- Aplicación móvil

---

## Principios de Diseño

1. **Simplicidad** — Interfaz clara, sin pasos innecesarios.
2. **Seguridad** — JWT, bcrypt, control de acceso por rol.
3. **Modularidad** — Cada módulo es independiente y extensible.
4. **Trazabilidad** — Cada cambio de estado queda registrado.
5. **Escalabilidad** — Preparado para crecer sin refactorizaciones mayores.
