# Roadmap

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH

Este documento refleja el plan de desarrollo previsto. Las prioridades pueden ajustarse según las necesidades de la universidad.

---

## ✅ v1.0 — Base funcional + Arquitectura profesional (Completado — Julio 2026)

- Autenticación JWT por rol (admin, empresa, estudiante)
- Registro de estudiantes y organizaciones
- Aprobación de organizaciones por el administrador
- CRUD de convocatorias con control de acceso por rol
- Proceso de postulación con seguimiento de estados
- Panel de estadísticas por rol
- Exportación de reportes en CSV
- Gestión de perfiles
- Arquitectura MVC (routes → controllers → services → models)
- Documentación técnica y funcional completa

---

## 🔵 v1.1 — Mejoras de gestión de usuarios (Próximo)

Estimado: Sprint 2

- [ ] Recuperación de contraseña por email
- [ ] Cambio de contraseña desde el perfil
- [ ] Activar / desactivar cuentas de usuario (admin)
- [ ] Editar y eliminar usuarios (admin)
- [ ] Código universitario y ciclo académico en perfil de estudiante
- [ ] Dirección y sector en perfil de organización
- [ ] Número de vacantes en convocatorias
- [ ] Cancelar postulación en estado "Enviado"
- [ ] Filtrar postulantes por convocatoria y estado
- [ ] Paginación en listados

---

## 🔵 v1.2 — Documentos y notificaciones

Estimado: Sprint 3

- [ ] Upload real de archivos (CV, carta de presentación) con almacenamiento en servidor o S3
- [ ] Notificaciones internas persistentes en la plataforma
- [ ] Notificaciones por email (SMTP) ante cambios de estado
- [ ] Requisitos específicos por convocatoria
- [ ] Historial de convenios por organización

---

## 🔵 v1.3 — Reportes avanzados y dashboard

Estimado: Sprint 4

- [ ] Reportes filtrados por fechas
- [ ] Exportación a PDF
- [ ] Exportación a Excel (xlsx)
- [ ] Actividad reciente en el dashboard del administrador
- [ ] Gráficas estadísticas (Chart.js o Recharts)
- [ ] Fotografía de perfil (upload de imagen)

---

## 🔵 v2.0 — Producción robusta

Estimado: Sprint 5-6

- [ ] Tests unitarios del backend (Jest + Supertest)
- [ ] Tests de integración de la API
- [ ] Rate limiting y protección contra fuerza bruta
- [ ] Auditoría de acciones (log de eventos en DB)
- [ ] HTTPS + certificado SSL en producción
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Integración con sistema académico UNSCH

---

## 🔮 Futuro (sin fecha definida)

- Aplicación móvil (React Native)
- Firma digital de cartas de presentación
- Soporte multi-idioma (español / inglés)
- Sistema de calificación y feedback post-práctica
- Panel de estadísticas avanzadas con inteligencia de datos

---

> Para ver el estado detallado de cada ítem, consultar [specs/backlog.md](specs/backlog.md).
