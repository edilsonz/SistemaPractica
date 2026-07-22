# Historial y gestión de usuarios

## Perfiles del sistema

| Perfil | Alta de cuenta | Aprobación | Actividad registrada |
| --- | --- | --- | --- |
| Estudiante | Registro público | No requerida | Perfil y postulaciones propias. |
| Empresa | Registro público | Requerida por administrador | Perfil, convocatorias y decisiones sobre postulantes. |
| Administrador | Alta controlada | No aplica | Aprobaciones y supervisión global. |

## Historial disponible actualmente

El sistema conserva la fecha de creación y actualización de sus entidades mediante los campos automáticos de Sequelize (`created_at` y `updated_at`). Las postulaciones, convocatorias y cuentas se pueden consultar según los permisos del rol.

## Política de auditoría propuesta

Para una versión institucional se recomienda incorporar una entidad `auditoria_usuarios` con los campos:

- usuario responsable;
- fecha y hora;
- acción realizada (inicio de sesión, edición, aprobación, cambio de estado);
- entidad afectada e identificador;
- valores anterior y nuevo cuando aplique;
- dirección IP, si la política de privacidad lo permite.

El historial de auditoría debe ser de solo lectura para usuarios comunes y accesible únicamente al administrador autorizado.
