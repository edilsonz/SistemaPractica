# Flujo General del Sistema

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Flujo Completo del Proceso de Prácticas

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUJO GENERAL DEL SISTEMA                   │
└─────────────────────────────────────────────────────────────────┘

  ORGANIZACIÓN                SISTEMA                  ESTUDIANTE
  ────────────                ───────                  ──────────
  1. Registro            →  Cuenta creada (pendiente)
                             ↓
  2. Admin aprueba       ←  [ADMIN] Aprobación
                             ↓
  3. Login               →  Token JWT (rol: empresa)
     ↓
  4. Completa perfil     →  Datos guardados en DB
     ↓
  5. Crea convocatoria   →  Convocatoria activa ────────→  6. Estudiante ve convocatoria
                                                               ↓
                                                          7. Se registra / login
                                                               ↓
                                                          8. Completa perfil
                                                               ↓
                                                          9. Postula          →  Postulación "Enviado"
                                                                                      ↓
 10. Ve postulantes      ←  Lista de postulantes          ←───────────────────────────┘
     ↓
 11. Revisa CV / info
     ↓
 12. Cambia estado       →  "En Evaluación"   ──────────→ 13. Estudiante consulta estado
     ↓                                                         (actualizado en tiempo real)
 14. Decisión final      →  "Seleccionado"
                          o "Rechazado"       ──────────→ 15. Estudiante ve resultado

                         [ADMIN] supervisa todo el proceso
                         mediante dashboard y reportes
```

---

## Estados de una Postulación

```
  [Enviado] ──→ [En Evaluación] ──→ [Seleccionado]
                      └──────────→ [Rechazado]
```

| Estado | Quién lo asigna | Descripción |
|---|---|---|
| Enviado | Sistema (automático) | Postulación recién creada |
| En Evaluación | Organización / Admin | El postulante está siendo revisado |
| Seleccionado | Organización / Admin | El postulante fue elegido |
| Rechazado | Organización / Admin | El postulante no fue seleccionado |

---

## Flujo de Registro y Aprobación de Organización

```
  1. Organización completa formulario de registro
     ↓
  2. Sistema crea cuenta con approved = false
     ↓
  3. Admin recibe alerta en panel de pendientes
     ↓
  4. Admin revisa información de la organización
     ↓
  5a. Aprueba → approved = true → organización puede iniciar sesión
  5b. (Futura mejora) Rechaza → organización recibe notificación
```

---

## Flujo de Autenticación (JWT)

```
  Cliente                                    Servidor
  ───────                                    ────────
  POST /api/login  {email, password}  ──→   Valida credenciales
                                             Verifica approved (empresas)
                                             Genera JWT firmado
                                       ←──  {token, user}
  
  Guarda token en estado (React)
  
  GET /api/convocatorias  ──────────→  Middleware authenticateJWT
  Authorization: Bearer <token>        Middleware requireRole(['estudiante'])
                                       Ejecuta lógica del controller
                                 ←──  {convocatorias: [...]}
```

---

## Flujo de la API REST

Todas las peticiones siguen el patrón:

```
  Request  →  Router  →  Middleware (JWT + Rol)  →  Controller  →  Service  →  Model/DB
                                                                        ↓
  Response ←  Router  ←  Controller  ←────────────────────────── Service
```

---

## Módulos y sus Interacciones

```
  ┌──────────┐     ┌──────────────┐     ┌───────────────┐
  │ Auth     │────▶│ Usuario      │────▶│ Estudiante    │
  └──────────┘     └──────────────┘     └───────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │ Organización │
                   └──────┬───────┘
                          │ publica
                          ▼
                   ┌──────────────┐     ┌───────────────┐
                   │ Convocatoria │────▶│ Postulación   │
                   └──────────────┘     └───────────────┘
                                               │
                                         consulta/cambia
                                               │
                                   ┌───────────┴──────────┐
                                   │ Organización / Admin │
                                   └──────────────────────┘
```
