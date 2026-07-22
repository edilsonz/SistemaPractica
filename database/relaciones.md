# Relaciones entre Tablas

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Resumen de Relaciones

```
usuarios ──────────────── 1:N ─────────────── estudiantes
                                                    │
                                                   1:N
                                                    │
                                              postulaciones
                                                    │
                                                   N:1
                                                    │
convocatorias ──────────── 1:N ─────────────────────┘
```

---

## Detalle de cada Relación

### usuarios → estudiantes (1:N)

- **FK:** `estudiantes.usuario_id` → `usuarios.id`
- **Sequelize:**
  ```js
  Usuario.hasMany(Estudiante, { foreignKey: 'usuario_id' });
  Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id' });
  ```
- **Semántica:** Un usuario con `rol = 'estudiante'` tiene exactamente un perfil en `estudiantes`. La relación es N:1 en la práctica (un usuario → un perfil de estudiante), pero se modela como 1:N para flexibilidad futura.
- **Nullable:** `usuario_id` es nullable para soportar estudiantes ingresados directamente sin cuenta (caso de datos históricos).

---

### estudiantes → postulaciones (1:N)

- **FK:** `postulaciones.estudiante_id` → `estudiantes.id`
- **Sequelize:**
  ```js
  Estudiante.hasMany(Postulacion, { foreignKey: 'estudiante_id' });
  Postulacion.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });
  ```
- **Semántica:** Un estudiante puede postular a múltiples convocatorias. Cada postulación pertenece a un único estudiante.
- **Restricción:** La combinación `(estudiante_id, convocatoria_id)` es única.

---

### convocatorias → postulaciones (1:N)

- **FK:** `postulaciones.convocatoria_id` → `convocatorias.id`
- **Sequelize:**
  ```js
  Convocatoria.hasMany(Postulacion, { foreignKey: 'convocatoria_id' });
  Postulacion.belongsTo(Convocatoria, { foreignKey: 'convocatoria_id' });
  ```
- **Semántica:** Una convocatoria puede recibir múltiples postulaciones. Cada postulación está vinculada a una sola convocatoria.

---

## Consultas JOIN más Frecuentes

### Postulaciones de un estudiante (con datos de convocatoria)
```sql
SELECT p.*, c.titulo, c.empresa, c.modalidad
FROM postulaciones p
INNER JOIN convocatorias c ON p.convocatoria_id = c.id
WHERE p.estudiante_id = ?
ORDER BY p.created_at DESC;
```

### Postulantes a las convocatorias de una empresa (con datos del estudiante)
```sql
SELECT p.*, e.nombre, e.email, e.escuela, c.titulo
FROM postulaciones p
INNER JOIN estudiantes e ON p.estudiante_id = e.id
INNER JOIN convocatorias c ON p.convocatoria_id = c.id
WHERE c.empresa = ?
ORDER BY p.created_at DESC;
```

### Todos los usuarios con su perfil de estudiante (admin)
```sql
SELECT u.*, es.escuela, es.telefono
FROM usuarios u
LEFT JOIN estudiantes es ON es.usuario_id = u.id
ORDER BY u.created_at DESC;
```
