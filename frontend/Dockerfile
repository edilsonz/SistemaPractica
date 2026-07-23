# ── Frontend — Dockerfile multietapa ─────────────────────────────────────────
# Etapa 1: build con Node
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar fuente y compilar
# VITE_API_URL debe pasarse como build arg para que Vite lo incruste en el bundle
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Etapa 2: servir con nginx
FROM nginx:1.27-alpine

# Configuración nginx para SPA (React Router / rutas del cliente)
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config mínima: sirve la SPA y hace proxy a /api/
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Rutas de la SPA\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache para assets compilados (Vite genera hashes)\n\
    location /assets/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
