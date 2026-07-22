# Sistema de Gestión de Prácticas Preprofesionales — UNSCH

Plataforma web que centraliza y automatiza el proceso de prácticas preprofesionales de la Universidad Nacional de San Cristóbal de Huamanga (UNSCH): desde el registro de estudiantes y organizaciones hasta el seguimiento de postulaciones.

---

## Roles del Sistema

| Rol | Descripción |
|---|---|
| **Administrador** | Supervisa todo el sistema, aprueba organizaciones y gestiona usuarios |
| **Estudiante** | Consulta convocatorias, completa su perfil y realiza postulaciones |
| **Organización Colaboradora** | Publica convocatorias y evalúa postulantes |

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + Vite + Bootstrap 5 |
| Backend | Node.js + Express 4 + JWT + bcrypt |
| Base de datos | MySQL 8 + Sequelize 6 |
| Despliegue | Docker Compose |

---

## Estructura del Repositorio

```
SistemaPractica/
├── backend/          # API REST (Express + Sequelize)
├── frontend/         # SPA (React + Vite)
├── database/         # Modelo ER, diccionario de datos, scripts
├── architecture/     # Documentación de arquitectura y decisiones técnicas
├── specs/            # Especificaciones funcionales y técnicas
├── deployment/       # Docker Compose y guía de despliegue
├── docs/             # Manuales de usuario y documentación técnica
├── tests/            # Tests automatizados (próximos sprints)
├── resources/        # Recursos estáticos del proyecto
├── CHANGELOG.md      # Historial de versiones
└── ROADMAP.md        # Plan de desarrollo futuro
```

---

## Inicio Rápido (Desarrollo)

### Prerrequisitos

- Node.js >= 18
- MySQL 8 corriendo localmente
- npm >= 9

### 1. Configurar la base de datos

```bash
# Crear la base de datos en MySQL
mysql -u root -p -e "CREATE DATABASE unsch_practicas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. Configurar y arrancar el backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de MySQL

npm install
npm run dev
# API disponible en http://localhost:4000
```

### 3. Configurar y arrancar el frontend

```bash
cd frontend
npm install
npm run dev
# App disponible en http://localhost:5173
```

### 4. Cargar datos de demostración (opcional)

```bash
cd backend
node src/migrations/seed.js
```

### Credenciales de demo

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@unsch.edu.pe | admin123 |
| Organización | empresa@unsch.edu.pe | empresa123 |
| Estudiante | demo@unsch.edu.pe | estudiante123 |

> En Windows puedes hacer doble clic en `iniciar-proyecto.cmd` para abrir ambos servidores en terminales separadas.

---

## Documentación

| Documento | Descripción |
|---|---|
| [Arquitectura](architecture/arquitectura.md) | Visión general del sistema y sus capas |
| [Estructura del repositorio](architecture/estructura.md) | Árbol completo de carpetas y archivos |
| [Patrones de diseño](architecture/patrones.md) | Patrones y principios aplicados |
| [Flujo general](architecture/flujo_general.md) | Diagramas de flujo de datos |
| [Decisiones técnicas](architecture/decisiones.md) | Registro de decisiones (ADR) |
| [Especificaciones funcionales](specs/vision.md) | Visión, requerimientos y casos de uso |
| [Backlog](specs/backlog.md) | Estado y plan de desarrollo |
| [Modelo ER](database/modelo_er.md) | Diagrama entidad-relación |
| [Diccionario de datos](database/diccionario_datos.md) | Definición de cada campo |
| [API Reference](docs/API.md) | Endpoints disponibles |
| [Guía de despliegue](deployment/README.md) | Instrucciones para producción |
| [Manual del administrador](docs/manuales/ADMINISTRADOR.md) | Guía de uso para admins |
| [Manual del estudiante](docs/manuales/ESTUDIANTE.md) | Guía de uso para estudiantes |
| [Manual de la empresa](docs/manuales/EMPRESA.md) | Guía de uso para organizaciones |

---

## Seguridad

- Las contraseñas se almacenan con hash bcrypt (12 rondas).
- La autenticación usa JWT con expiración de 2 horas.
- Cada endpoint valida el rol del usuario antes de ejecutar la operación.
- El archivo `backend/.env` contiene credenciales sensibles y está excluido del repositorio.

---

## Contribuir

1. Antes de implementar una funcionalidad nueva, documentarla en `specs/`.
2. Seguir la arquitectura MVC: lógica en `services/`, HTTP en `controllers/`, datos en `models/`.
3. Reutilizar componentes existentes en el frontend antes de crear nuevos.
4. Actualizar `CHANGELOG.md` con cada cambio relevante.
