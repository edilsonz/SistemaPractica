# Arquitectura del Sistema

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Estilo Arquitectónico

El sistema sigue una arquitectura **cliente-servidor de tres capas** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                  │
│          React 18 + Vite + Bootstrap 5                  │
│              http://localhost:5173                       │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP/JSON (REST API)
                          │ Authorization: Bearer JWT
┌─────────────────────────▼───────────────────────────────┐
│                  CAPA DE LÓGICA DE NEGOCIO               │
│           Node.js + Express 4 + JWT + bcrypt            │
│                 http://localhost:4000                    │
│                                                         │
│  Router → Middleware (auth/rol) → Controller → Service  │
└─────────────────────────┬───────────────────────────────┘
                          │ Sequelize ORM
┌─────────────────────────▼───────────────────────────────┐
│                   CAPA DE DATOS                         │
│              MySQL 8 — Base de datos relacional         │
│               Base: unsch_practicas                     │
└─────────────────────────────────────────────────────────┘
```

---

## Componentes del Backend

```
backend/src/
├── app.js              ← Configuración Express (middlewares, rutas, manejo de errores)
├── server.js           ← Punto de entrada: sincroniza DB y arranca el servidor HTTP
├── config/
│   └── database.js     ← Instancia Sequelize, lee variables de entorno
├── models/
│   ├── index.js        ← Registra modelos y define relaciones
│   ├── Usuario.js      ← Modelo: usuarios (todos los roles)
│   ├── Estudiante.js   ← Modelo: perfil extendido del estudiante
│   ├── Convocatoria.js ← Modelo: oportunidades de prácticas
│   └── Postulacion.js  ← Modelo: postulaciones (estudiante ↔ convocatoria)
├── middlewares/
│   └── auth.js         ← authenticateJWT + requireRole
├── routes/             ← Thin routers: solo conectan middleware + controller
│   ├── login.js
│   ├── usuarios.js
│   ├── perfil.js
│   ├── convocatorias.js
│   ├── postulaciones.js
│   ├── postular.js
│   └── empresas.js
├── controllers/        ← Manejo HTTP: valida entrada, llama service, forma respuesta
│   ├── auth.controller.js
│   ├── convocatoria.controller.js
│   ├── postulacion.controller.js
│   ├── empresa.controller.js
│   └── usuario.controller.js
├── services/           ← Lógica de negocio pura (sin HTTP)
│   ├── auth.service.js
│   ├── convocatoria.service.js
│   ├── postulacion.service.js
│   ├── empresa.service.js
│   └── usuario.service.js
└── validations/        ← Funciones de validación de datos de entrada
    ├── auth.validations.js
    └── convocatoria.validations.js
```

---

## Componentes del Frontend

```
frontend/src/
├── main.jsx            ← Punto de entrada React
├── App.jsx             ← Raíz: rutas y proveedores de contexto
├── context/
│   └── AuthContext.jsx ← Estado global de sesión (token, user)
├── hooks/
│   └── useApi.js       ← Hook genérico para peticiones HTTP
├── services/           ← Acceso a datos (wrappea apiFetch)
│   ├── convocatoria.service.js
│   ├── postulacion.service.js
│   ├── usuario.service.js
│   └── empresa.service.js
├── utils/
│   ├── api.js          ← Cliente HTTP centralizado (fetch + token)
│   └── csv.js          ← Exportación a CSV
├── components/
│   ├── layout/         ← Shell de la app: Navbar, Sidebar, Footer, AppLayout
│   ├── auth/           ← Formularios de login y registro
│   ├── shared/         ← Componentes reutilizables (alertas, tarjetas, tablas)
│   ├── admin/          ← Páginas del panel administrador
│   ├── empresa/        ← Páginas del panel empresa
│   └── estudiante/     ← Páginas del panel estudiante
└── Dashboard.jsx       ← Componente de navegación y estadísticas rápidas
```

---

## Flujo de una Petición

```
Frontend (React)
    │
    │  fetch('/api/convocatorias', { headers: { Authorization: 'Bearer <jwt>' } })
    ▼
Backend (Express)
    │
    ├─ CORS middleware
    ├─ express.json()
    ├─ morgan (logging)
    │
    ├─ Router /api/convocatorias
    │       ├─ authenticateJWT  → verifica y decodifica el token
    │       ├─ requireRole([…]) → valida que el rol tenga permiso
    │       └─ convocatoriaController.listar()
    │                   └─ convocatoriaService.listar()
    │                               └─ Convocatoria.findAll(…)  [Sequelize → MySQL]
    │
    └─ res.json({ convocatorias: [...] })
```

---

## Seguridad

| Capa | Mecanismo |
|---|---|
| Contraseñas | bcrypt (12 rondas) |
| Autenticación | JWT firmado con HS256 (expira en 2h) |
| Autorización | Middleware `requireRole` en cada endpoint |
| CORS | Restringido al origen del frontend |
| Variables sensibles | Almacenadas en `.env`, excluidas del repositorio |
| Validación de entrada | Funciones en `validations/` antes de llegar al servicio |
