# Decisiones técnicas

## Stack

- **React + Vite:** interfaz rápida y modular.
- **Express:** API ligera y organizada por rutas.
- **Sequelize + MySQL:** persistencia relacional y modelos centralizados.
- **JWT:** autenticación sin estado para el cliente web.
- **bcrypt:** almacenamiento seguro de contraseñas.

## Criterios aplicados

1. Las reglas de autorización se validan en el backend, no solo en la interfaz.
2. Las empresas requieren aprobación antes de iniciar sesión.
3. Los administradores no se registran desde el portal público.
4. Solo un estudiante puede crear su propia postulación y no puede repetirla.
5. Las convocatorias inactivas o vencidas no aceptan postulaciones.

## Próximas mejoras recomendadas

- Migraciones versionadas en lugar de `sequelize.sync({ alter: true })`.
- Registro de auditoría persistente para accesos y cambios de estado.
- Recuperación de contraseña y verificación de correo.
- Pruebas automatizadas de API e interfaz.
