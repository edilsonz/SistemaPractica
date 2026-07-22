# Permisos por Roles

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Matriz de Permisos

`✅ Permitido` | `❌ Denegado` | `🔲 Pendiente de implementar`

### Módulo de Autenticación

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Iniciar sesión | ✅ | ✅ | ✅ |
| Registrar cuenta | ❌ | ✅ | ✅ |
| Cerrar sesión | ✅ | ✅ | ✅ |
| Recuperar contraseña | 🔲 | 🔲 | 🔲 |
| Cambiar contraseña | 🔲 | 🔲 | 🔲 |

### Módulo de Usuarios

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Listar todos los usuarios | ✅ | ❌ | ❌ |
| Ver datos de un usuario | ✅ | ❌ | ❌ |
| Editar usuario | 🔲 | ❌ | ❌ |
| Eliminar usuario | 🔲 | ❌ | ❌ |
| Activar / desactivar cuenta | 🔲 | ❌ | ❌ |

### Módulo de Perfil

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Ver propio perfil | ✅ | ✅ | ✅ |
| Editar propio perfil | ❌ | ✅ | ✅ |
| Ver perfil de otro usuario | ✅ | ❌ | ❌ |
| Cambiar fotografía | 🔲 | 🔲 | 🔲 |
| Cambiar contraseña | 🔲 | 🔲 | 🔲 |

### Módulo de Organizaciones

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Listar organizaciones pendientes | ✅ | ❌ | ❌ |
| Aprobar organización | ✅ | ❌ | ❌ |
| Ver perfil institucional | ✅ | ✅ (propio) | ❌ |
| Editar perfil institucional | ❌ | ✅ (propio) | ❌ |

### Módulo de Convocatorias

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Ver todas las convocatorias | ✅ | ❌ | ❌ |
| Ver convocatorias propias | — | ✅ | ❌ |
| Ver convocatorias activas | ❌ | ❌ | ✅ |
| Crear convocatoria | ✅ | ✅ | ❌ |
| Editar convocatoria propia | ✅ | ✅ | ❌ |
| Editar convocatoria ajena | ✅ | ❌ | ❌ |
| Cerrar convocatoria | ✅ | ✅ (propia) | ❌ |
| Eliminar convocatoria | 🔲 | 🔲 | ❌ |

### Módulo de Postulaciones

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Ver todas las postulaciones | ✅ | ❌ | ❌ |
| Ver postulaciones de sus convocatorias | ❌ | ✅ | ❌ |
| Ver propias postulaciones | ❌ | ❌ | ✅ |
| Crear postulación | ❌ | ❌ | ✅ |
| Cambiar estado de postulación | ✅ | ✅ (propias) | ❌ |
| Cancelar postulación | ❌ | ❌ | 🔲 |

### Módulo de Reportes

| Acción | Admin | Empresa | Estudiante |
|---|:---:|:---:|:---:|
| Reporte de postulaciones (global) | ✅ | ❌ | ❌ |
| Reporte de postulantes (propios) | ❌ | ✅ | ❌ |
| Reporte de convocatorias | ✅ | 🔲 | ❌ |
| Exportar CSV | ✅ | ✅ | ❌ |

---

## Endpoints de la API y Roles Permitidos

| Método | Endpoint | Admin | Empresa | Estudiante |
|---|---|:---:|:---:|:---:|
| POST | /api/register | ❌ | ✅ | ✅ |
| POST | /api/login | ✅ | ✅ | ✅ |
| GET | /api/perfil | ✅ | ✅ | ✅ |
| PATCH | /api/perfil | ❌ | ✅ | ✅ |
| GET | /api/usuarios | ✅ | ❌ | ❌ |
| GET | /api/convocatorias | ✅ | ✅ | ✅ |
| POST | /api/convocatorias | ✅ | ✅ | ❌ |
| PATCH | /api/convocatorias/:id | ✅ | ✅ | ❌ |
| GET | /api/postulaciones | ✅ | ✅ | ✅ |
| PATCH | /api/postulaciones/:id | ✅ | ✅ | ❌ |
| POST | /api/postular | ❌ | ❌ | ✅ |
| GET | /api/empresas/pending | ✅ | ❌ | ❌ |
| PATCH | /api/empresas/:id/approve | ✅ | ❌ | ❌ |
