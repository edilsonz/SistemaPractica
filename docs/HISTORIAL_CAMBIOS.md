# Historial de cambios

Este documento registra cambios funcionales y técnicos relevantes. Usa el formato `AAAA-MM-DD` al añadir nuevas entradas.

## 2026-07-20

- Se añadió documentación raíz y estructura técnica en `docs/`.
- Se documentaron roles, API, instalación, modelo de datos y manuales de usuario.
- Se corrigió la URL predeterminada de la API en el frontend para usar el puerto 4000.
- Se reforzó la autenticación con hashes bcrypt y migración de contraseñas demo antiguas.
- Se limitó el registro público a estudiantes y empresas; las cuentas de administrador no se crean desde el portal.
- Se validó que solo estudiantes postulen a convocatorias activas y vigentes.
- Se agregaron validaciones de modalidad y fechas al crear convocatorias.
- Se ampliaron los menús por rol con módulos de usuarios, estudiantes, documentación, notificaciones, reportes y configuración.
- Se añadió la consulta administrativa de usuarios y exportación CSV de postulaciones.
