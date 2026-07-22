# Despliegue en Render

El sistema se despliega en **dos servicios separados** en Render.

---

## Servicio 1 — Backend (Web Service)

### Configuración en Render

| Campo | Valor |
|---|---|
| **Name** | `unsch-practicas-backend` |
| **Repository** | `https://github.com/edilsonz/SistemaPractica` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Variables de entorno (Environment Variables)

Agregar en el panel de Render → Environment:

| Variable | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `DB_HOST` | (host de tu MySQL externo) |
| `DB_PORT` | `3306` |
| `DB_NAME` | (nombre de tu base de datos) |
| `DB_USER` | (usuario de tu base de datos) |
| `DB_PASSWORD` | (contraseña de tu base de datos) |
| `JWT_SECRET` | (cadena aleatoria larga — mínimo 32 caracteres) |
| `FRONTEND_URL` | (URL del frontend una vez desplegado) |

---

## Servicio 2 — Frontend (Static Site)

### Configuración en Render

| Campo | Valor |
|---|---|
| **Name** | `unsch-practicas-frontend` |
| **Repository** | `https://github.com/edilsonz/SistemaPractica` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `frontend/dist` |
| **Plan** | Free |

### Variables de entorno

| Variable | Valor |
|---|---|
| `VITE_API_URL` | URL del backend (ej: `https://unsch-practicas-backend.onrender.com`) |

---

## Orden de despliegue

1. Despliega primero el **backend**
2. Copia la URL que te da Render (ej: `https://unsch-practicas-backend.onrender.com`)
3. Úsala como `VITE_API_URL` al desplegar el **frontend**
4. Copia la URL del frontend y úsala como `FRONTEND_URL` en el backend

---

## Base de datos

Render tiene **MySQL gratuito limitado** (solo PostgreSQL gratuito).

Opciones para MySQL gratuito:
- **PlanetScale** — https://planetscale.com (recomendado)
- **Clever Cloud** — https://www.clever-cloud.com
- **Aiven** — https://aiven.io (trial gratuito)

Una vez tengas las credenciales, ponlas en las variables de entorno del backend.

---

## Verificar el despliegue

Una vez desplegado, verifica:

```
GET https://unsch-practicas-backend.onrender.com/health
# Debe responder: { "ok": true, "env": "production" }
```
