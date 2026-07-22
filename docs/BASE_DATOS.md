# Modelo de datos

## Entidades principales

| Entidad | Descripción |
| --- | --- |
| `usuarios` | Cuenta de acceso, rol, estado de aprobación y datos de empresa. |
| `estudiantes` | Perfil académico y datos de contacto vinculados a un usuario. |
| `convocatorias` | Oferta de práctica publicada por una empresa o administración. |
| `postulaciones` | Relación entre un estudiante y una convocatoria, con su estado. |

## Relaciones

```text
Usuario 1 ─── 0..N Estudiante
Estudiante 1 ─── 0..N Postulación
Convocatoria 1 ─── 0..N Postulación
```

Una postulación es única por par `estudiante_id` y `convocatoria_id`, evitando registros duplicados.

## Estados de postulación

`Enviado` → `En Evaluación` → `Seleccionado` o `Rechazado`

La organización propietaria de la convocatoria y el administrador pueden actualizar el estado. El estudiante solo consulta el resultado.
