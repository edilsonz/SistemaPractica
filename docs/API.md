# Referencia breve de API

Base local: `http://localhost:4000/api`.

Las rutas protegidas requieren el encabezado `Authorization: Bearer <token>`.

| Método | Ruta | Uso |
| --- | --- | --- |
| POST | `/register` | Registra estudiante o empresa. |
| POST | `/login` | Inicia sesión y devuelve un JWT. |
| GET/PATCH | `/perfil` | Consulta o actualiza el perfil propio. |
| GET/POST | `/convocatorias` | Lista convocatorias o crea una nueva. |
| PATCH | `/convocatorias/:id` | Edita una convocatoria autorizada. |
| POST | `/postular` | Registra una postulación del estudiante autenticado. |
| GET/PATCH | `/postulaciones` | Lista postulaciones; el PATCH actualiza un estado. |
| GET | `/empresas/pending` | Lista empresas pendientes (administrador). |
| PATCH | `/empresas/:id/approve` | Aprueba una empresa (administrador). |

También está disponible `GET /health` fuera del prefijo `/api` para comprobar el backend.
