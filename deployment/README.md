# Guía de Despliegue

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH

---

## Despliegue con Docker Compose (Recomendado)

### Prerrequisitos

- Docker >= 24
- Docker Compose >= 2.20
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-org/SistemaPractica.git
cd SistemaPractica

# 2. Configurar variables de entorno de producción
cp deployment/.env.production.example deployment/.env
# Editar deployment/.env con los valores reales

# 3. Construir y levantar los servicios
cd deployment
docker compose --env-file .env up -d --build

# 4. (Primera vez) Ejecutar el seed de datos iniciales
docker exec unsch_backend node database/scripts/seed.js

# 5. Verificar que los servicios están activos
docker compose ps
```

### Verificar el despliegue

```bash
# Health check del backend
curl http://localhost:4000/health

# Logs del backend
docker logs unsch_backend -f

# Logs de la base de datos
docker logs unsch_db -f
```

### Detener los servicios

```bash
docker compose down          # Detiene y elimina contenedores
docker compose down -v       # Detiene y elimina contenedores + volúmenes (¡borra datos!)
```

---

## Despliegue Manual (Sin Docker)

### Backend

```bash
cd backend
cp .env.example .env
# Editar .env con los valores de producción

npm install --omit=dev
NODE_ENV=production node src/server.js
```

Para producción, usar un gestor de procesos:

```bash
# Con PM2
npm install -g pm2
pm2 start src/server.js --name unsch-backend
pm2 save
pm2 startup
```

### Frontend

```bash
cd frontend
cp .env.example .env
# Configurar VITE_API_URL con la URL del backend en producción

npm install
npm run build
# Los archivos estáticos quedan en frontend/dist/
```

Servir `dist/` con nginx o Apache. Ejemplo nginx mínimo:

```nginx
server {
    listen 80;
    server_name tu-dominio.edu.pe;
    root /var/www/unsch-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto del backend | `4000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `unsch_practicas` |
| `DB_USER` | Usuario de MySQL | `unsch_user` |
| `DB_PASSWORD` | Contraseña de MySQL | *(valor seguro)* |
| `JWT_SECRET` | Clave para firmar JWT | *(64+ caracteres aleatorios)* |
| `FRONTEND_URL` | URL del frontend (CORS) | `https://practicas.unsch.edu.pe` |
| `VITE_API_URL` | URL de la API (frontend) | `https://api.practicas.unsch.edu.pe` |

---

## Checklist de Producción

- [ ] `JWT_SECRET` es una cadena aleatoria de al menos 64 caracteres
- [ ] `DB_PASSWORD` es una contraseña robusta
- [ ] El archivo `.env` no está en el repositorio
- [ ] HTTPS habilitado con certificado SSL válido
- [ ] Respaldos automáticos de la base de datos configurados
- [ ] PM2 o equivalente configurado para reinicio automático
- [ ] Firewall configurado (solo puertos 80, 443 y SSH expuestos)
