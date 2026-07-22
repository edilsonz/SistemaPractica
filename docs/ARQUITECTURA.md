# Arquitectura del sistema

El proyecto adopta una arquitectura cliente-servidor con responsabilidades separadas.

```text
Navegador
    │
    ▼
Frontend React + Vite (puerto 5173)
    │  HTTP/JSON + JWT
    ▼
Backend Express (puerto 4000)
    │
    ▼
MySQL + Sequelize
```

## Frontend

`frontend/` contiene la interfaz React. `App.jsx` administra autenticación, navegación por rol, convocatorias, perfiles y postulaciones. Bootstrap aporta la base visual adaptable.

## Backend

`backend/src/` contiene la API Express:

- `routes/`: endpoints por dominio funcional.
- `middlewares/auth.js`: validación de JWT y autorización por roles.
- `models/`: entidades Sequelize y relaciones.
- `config/database.js`: conexión a MySQL mediante variables de entorno.
- `migrations/seed.js`: datos demostrativos opcionales.

## Roles y autorización

| Rol | Capacidades principales |
| --- | --- |
| Estudiante | Editar perfil, consultar ofertas activas y postular. |
| Empresa | Completar datos institucionales, crear convocatorias y evaluar postulantes propios. |
| Administrador | Aprobar empresas y supervisar convocatorias y postulaciones. |

La interfaz oculta opciones no autorizadas, pero la API también valida cada operación. Esta segunda validación es la que protege los datos.
