# Modelo Entidad-Relación

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Diagrama ER (Notación textual)

```
┌─────────────────────────┐         ┌──────────────────────────┐
│         USUARIOS         │         │        ESTUDIANTES        │
├─────────────────────────┤         ├──────────────────────────┤
│ PK  id          INT      │◄──────┐ │ PK  id          INT      │
│     nombre      VARCHAR  │       └─┤ FK  usuario_id  INT      │
│     email       VARCHAR  │         │     nombre      VARCHAR  │
│     passwordHash VARCHAR  │         │     email       VARCHAR  │
│     rol         ENUM     │         │     escuela     VARCHAR  │
│     approved    BOOLEAN  │         │     telefono    VARCHAR  │
│     razon_social VARCHAR  │         │     cv_url      VARCHAR  │
│     ruc         VARCHAR  │         │     created_at  DATETIME │
│     descripcion TEXT     │         │     updated_at  DATETIME │
│     logo_url    VARCHAR  │         └──────────┬───────────────┘
│     created_at  DATETIME │                    │
│     updated_at  DATETIME │                    │ 1:N
└─────────────────────────┘                    ▼
                                    ┌──────────────────────────┐
                                    │       POSTULACIONES       │
┌─────────────────────────┐         ├──────────────────────────┤
│       CONVOCATORIAS      │         │ PK  id             INT   │
├─────────────────────────┤         │ FK  estudiante_id  INT   │
│ PK  id          INT      │◄────────┤ FK  convocatoria_id INT  │
│     titulo      VARCHAR  │  1:N    │     estado         ENUM  │
│     empresa     VARCHAR  │         │     created_at  DATETIME │
│     descripcion TEXT     │         │     updated_at  DATETIME │
│     modalidad   ENUM     │         └──────────────────────────┘
│     activo      BOOLEAN  │
│     fecha_inicio DATE    │         UNIQUE(estudiante_id, convocatoria_id)
│     fecha_fin   DATE     │
│     created_at  DATETIME │
│     updated_at  DATETIME │
└─────────────────────────┘
```

---

## Relaciones

| Tabla origen | Relación | Tabla destino | Descripción |
|---|---|---|---|
| `usuarios` | 1:N | `estudiantes` | Un usuario puede tener un perfil de estudiante |
| `estudiantes` | 1:N | `postulaciones` | Un estudiante puede tener muchas postulaciones |
| `convocatorias` | 1:N | `postulaciones` | Una convocatoria puede recibir muchas postulaciones |

---

## Restricciones de Integridad

- `postulaciones(estudiante_id, convocatoria_id)` — índice UNIQUE (evita duplicados)
- `usuarios.email` — UNIQUE
- `usuarios.rol` — ENUM('admin', 'empresa', 'estudiante')
- `convocatorias.modalidad` — ENUM('Presencial', 'Virtual', 'Híbrida')
- `postulaciones.estado` — ENUM('Enviado', 'En Evaluación', 'Seleccionado', 'Rechazado')
- `postulaciones.estado` — DEFAULT 'Enviado'
- `usuarios.approved` — DEFAULT false
- `convocatorias.activo` — DEFAULT true
