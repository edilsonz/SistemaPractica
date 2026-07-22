# Instalación y ejecución local

## Requisitos

- Node.js 18 o superior.
- MySQL 8 o compatible.
- npm.

## Base de datos

1. Crea una base de datos, por ejemplo `Practicas_Ayacucho`.
2. Copia `backend/.env.example` como `backend/.env`.
3. Completa `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y define una clave segura en `JWT_SECRET`.

Ejemplo local:

```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_NAME=Practicas_Ayacucho
DB_USER=root
DB_PASSWORD=tu_password
JWT_SECRET=una_clave_larga_y_unica
```

## Ejecutar el backend

En Windows, el archivo `iniciar-proyecto.cmd` ubicado en la raíz abre ambos servicios automáticamente. También puedes iniciarlos manualmente:

```bash
cd backend
npm install
npm run dev
```

Verifica la disponibilidad con `http://localhost:4000/health`.

## Cargar datos de demostración

Con la API detenida o en una terminal adicional:

```bash
cd backend
node src/migrations/seed.js
```

Credenciales iniciales:

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@unsch.edu.pe | admin123 |
| Empresa | empresa@unsch.edu.pe | empresa123 |
| Estudiante | demo@unsch.edu.pe | estudiante123 |

> Cambia estas contraseñas antes de utilizar el sistema fuera de desarrollo.

## Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. Para otra URL de API, crea `frontend/.env` con `VITE_API_URL=http://localhost:4000`.
