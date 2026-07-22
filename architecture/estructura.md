# Estructura del Repositorio

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

```
SistemaPractica/
│
├── backend/                        # API REST — Node.js + Express + Sequelize
│   ├── src/
│   │   ├── app.js                  # Configuración Express (middlewares, rutas)
│   │   ├── server.js               # Arranque del servidor HTTP
│   │   ├── config/
│   │   │   └── database.js         # Conexión Sequelize a MySQL
│   │   ├── models/                 # Modelos de datos (Sequelize)
│   │   │   ├── index.js            # Relaciones y syncAll()
│   │   │   ├── Usuario.js
│   │   │   ├── Estudiante.js
│   │   │   ├── Convocatoria.js
│   │   │   └── Postulacion.js
│   │   ├── middlewares/
│   │   │   └── auth.js             # JWT + control de roles
│   │   ├── routes/                 # Definición de endpoints (thin routers)
│   │   │   ├── login.js
│   │   │   ├── usuarios.js
│   │   │   ├── perfil.js
│   │   │   ├── convocatorias.js
│   │   │   ├── postulaciones.js
│   │   │   ├── postular.js
│   │   │   └── empresas.js
│   │   ├── controllers/            # Manejo HTTP por módulo
│   │   │   ├── auth.controller.js
│   │   │   ├── convocatoria.controller.js
│   │   │   ├── postulacion.controller.js
│   │   │   ├── empresa.controller.js
│   │   │   └── usuario.controller.js
│   │   ├── services/               # Lógica de negocio
│   │   │   ├── auth.service.js
│   │   │   ├── convocatoria.service.js
│   │   │   ├── postulacion.service.js
│   │   │   ├── empresa.service.js
│   │   │   └── usuario.service.js
│   │   └── validations/            # Validación de datos de entrada
│   │       ├── auth.validations.js
│   │       └── convocatoria.validations.js
│   ├── .env                        # Variables locales (NO en git)
│   ├── .env.example                # Plantilla de variables requeridas
│   ├── .gitignore
│   └── package.json
│
├── frontend/                       # SPA — React 18 + Vite + Bootstrap 5
│   ├── src/
│   │   ├── main.jsx                # Punto de entrada React
│   │   ├── App.jsx                 # Componente raíz con estado y navegación
│   │   ├── Dashboard.jsx           # Panel de navegación y estadísticas
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Estado global de autenticación
│   │   ├── hooks/
│   │   │   └── useApi.js           # Hook genérico para peticiones HTTP
│   │   ├── services/               # Capa de acceso a datos del frontend
│   │   │   ├── convocatoria.service.js
│   │   │   ├── postulacion.service.js
│   │   │   ├── usuario.service.js
│   │   │   └── empresa.service.js
│   │   ├── utils/
│   │   │   ├── api.js              # Cliente HTTP centralizado
│   │   │   └── csv.js              # Exportador a CSV
│   │   └── components/
│   │       ├── layout/             # Shell de la aplicación
│   │       │   ├── AppLayout.jsx   # Contenedor principal (Navbar+Sidebar+Footer)
│   │       │   ├── Navbar.jsx
│   │       │   ├── Sidebar.jsx
│   │       │   └── Footer.jsx
│   │       ├── auth/               # Login y registro
│   │       ├── shared/             # Componentes reutilizables
│   │       ├── admin/              # Vistas del administrador
│   │       ├── empresa/            # Vistas de la organización
│   │       └── estudiante/         # Vistas del estudiante
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── database/                       # Todo lo relacionado con la BD
│   ├── scripts/
│   │   └── seed.js                 # Datos de demostración
│   ├── backup/                     # Respaldos (ignorados por git)
│   ├── modelo_er.md                # Diagrama entidad-relación
│   ├── relaciones.md               # Relaciones entre tablas
│   └── diccionario_datos.md        # Definición de cada campo
│
├── architecture/                   # Documentación de arquitectura
│   ├── arquitectura.md             # Visión general del sistema
│   ├── estructura.md               # Árbol del repositorio (este archivo)
│   ├── patrones.md                 # Patrones de diseño aplicados
│   ├── flujo_general.md            # Flujo de peticiones y datos
│   └── decisiones.md               # ADR — Registro de decisiones
│
├── specs/                          # Especificaciones funcionales y técnicas
│   ├── vision.md
│   ├── requerimientos_funcionales.md
│   ├── requerimientos_no_funcionales.md
│   ├── casos_de_uso.md
│   ├── historias_de_usuario.md
│   ├── reglas_de_negocio.md
│   ├── flujo_del_sistema.md
│   ├── permisos_por_roles.md
│   └── backlog.md
│
├── deployment/                     # Configuración de despliegue
│   ├── docker-compose.yml
│   ├── .env.production.example
│   └── README.md
│
├── docs/                           # Documentación de usuario y técnica
│   ├── API.md
│   ├── INSTALACION.md
│   ├── DECISIONES_TECNICAS.md
│   ├── BASE_DATOS.md
│   ├── HISTORIAL_CAMBIOS.md
│   ├── HISTORIAL_USUARIOS.md
│   └── manuales/
│       ├── ADMINISTRADOR.md
│       ├── EMPRESA.md
│       ├── ESTUDIANTE.md
│       └── README.md
│
├── tests/                          # Tests automatizados (próximos sprints)
│   ├── backend/
│   └── frontend/
│
├── resources/                      # Recursos estáticos del proyecto
│   ├── images/
│   └── assets/
│
├── README.md                       # Punto de entrada del repositorio
├── CHANGELOG.md                    # Historial de versiones
├── ROADMAP.md                      # Plan de desarrollo futuro
├── .gitignore
└── iniciar-proyecto.cmd            # Script de inicio rápido (Windows)
```
