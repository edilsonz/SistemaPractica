# Flujo General de Datos y Peticiones

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Flujo de Autenticación

```
 ┌──────────┐                              ┌──────────────┐            ┌──────────┐
 │ Frontend │                              │   Backend    │            │  MySQL   │
 └────┬─────┘                              └──────┬───────┘            └────┬─────┘
      │                                           │                         │
      │  POST /api/login {email, password}        │                         │
      │──────────────────────────────────────────▶│                         │
      │                                           │  SELECT * FROM usuarios │
      │                                           │  WHERE email = ?        │
      │                                           │────────────────────────▶│
      │                                           │  ◀── usuario row ───────│
      │                                           │                         │
      │                                           │  bcrypt.compare()       │
      │                                           │  jwt.sign({ sub, rol }) │
      │                                           │                         │
      │  ◀── { token, user } ─────────────────────│                         │
      │                                           │                         │
      │  Guarda token en React state              │                         │
      │  Redirige al panel del rol                │                         │
```

---

## Flujo de una Petición Protegida

```
 ┌──────────┐         ┌────────┐    ┌──────────────┐    ┌───────────┐    ┌────────┐
 │ Frontend │         │ Router │    │  Middleware   │    │Controller │    │Service │
 └────┬─────┘         └───┬────┘    └──────┬───────┘    └─────┬─────┘    └───┬────┘
      │                   │                │                   │              │
      │ GET /api/          │                │                   │              │
      │ convocatorias      │                │                   │              │
      │ Bearer <token>     │                │                   │              │
      │───────────────────▶│                │                   │              │
      │                   │ authenticateJWT │                   │              │
      │                   │───────────────▶│                   │              │
      │                   │                │ verify(token)      │              │
      │                   │                │ req.user = payload │              │
      │                   │ requireRole()  │                   │              │
      │                   │───────────────▶│                   │              │
      │                   │                │ rol permitido?     │              │
      │                   │                │───────────────────▶│              │
      │                   │                │                   │ listar()     │
      │                   │                │                   │─────────────▶│
      │                   │                │                   │              │ DB query
      │                   │                │                   │  ◀─ datos ───│
      │                   │                │                   │              │
      │ ◀── { convocatorias: [...] } ───────────────────────────│              │
```

---

## Flujo de Registro de Organización y Aprobación

```
  Organización                Sistema               Administrador
  ────────────                ───────               ─────────────

  POST /api/register
  { rol: 'empresa', ... }  →  Usuario creado
                               approved = false

                                                    GET /api/empresas/pending
                                                ←── { empresas: [...] }

                                                    PATCH /api/empresas/:id/approve
                                                 →  approved = true

  POST /api/login          →  Login exitoso
  (ahora permitido)            Token JWT emitido
```

---

## Flujo Completo de Postulación

```
  Estudiante          Frontend           Backend              DB
  ──────────          ────────           ───────              ──

  Clic "Postular"  →  handlePostular()
                      POST /api/postular
                      { convocatoriaId }  →  authenticateJWT
                                             requireRole(['estudiante'])
                                             postulacionController.postular()
                                             postulacionService.postular()
                                              ├─ Busca Estudiante por usuario_id
                                              ├─ Verifica convocatoria activa
                                              └─ Postulacion.create()  →  INSERT
                                         ←── { message: 'Registrado' }
                   ←  Alerta de éxito
                      Recarga postulaciones
```

---

## Flujo de Exportación CSV

```
  Usuario (Admin/Empresa)
        │
        │ Clic "Exportar CSV"
        ▼
  Frontend lee los datos ya cargados en estado React
        │
        ▼
  exportarCSV(nombre, filas)   ← utils/csv.js
        │
        ├── Genera Blob con contenido CSV (UTF-8 con BOM)
        ├── Crea URL temporal con URL.createObjectURL()
        ├── Simula clic en <a download>
        └── Revoca la URL temporal
        │
        ▼
  Navegador descarga el archivo .csv
  (sin llamada al backend)
```

---

## Gestión del Estado en el Frontend

```
  AuthContext (global)
  ├── token        → se pasa a todos los services
  ├── user         → datos del usuario autenticado
  ├── loading      → estado de carga del login
  └── alert        → mensaje de feedback global

  Estado local por componente
  ├── convocatorias[]     → lista cargada desde la API
  ├── postulaciones[]     → historial del usuario
  ├── empresasPendientes  → solo admin
  └── perfil              → datos del perfil activo
```
