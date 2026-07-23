# ── Backend — Dockerfile ──────────────────────────────────────────────────────
# Node 20 LTS (Alpine para imagen mínima)
FROM node:20-alpine

LABEL org.opencontainers.image.title="UNSCH Prácticas — Backend"
LABEL org.opencontainers.image.description="API REST Sistema de Prácticas Preprofesionales UNSCH"

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias primero (capa cacheada si package.json no cambia)
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código fuente
COPY src/ ./src/

# El puerto que expone el backend
EXPOSE 4000

# Arrancar el servidor
CMD ["node", "src/server.js"]
