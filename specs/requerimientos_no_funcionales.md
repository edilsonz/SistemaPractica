# Requerimientos No Funcionales

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## RNF-01 — Seguridad

| ID | Requerimiento |
|---|---|
| RNF-01.1 | Las contraseñas deben almacenarse con hash bcrypt (mínimo 12 rondas) |
| RNF-01.2 | Toda ruta protegida debe validar el token JWT en el encabezado Authorization |
| RNF-01.3 | El token JWT debe expirar en 2 horas |
| RNF-01.4 | El secreto JWT debe configurarse como variable de entorno y no estar en el código |
| RNF-01.5 | El archivo `.env` nunca debe incluirse en el repositorio |
| RNF-01.6 | La API debe implementar CORS restringido al dominio del frontend |
| RNF-01.7 | Cada endpoint debe verificar el rol del usuario antes de ejecutar la operación |

---

## RNF-02 — Rendimiento

| ID | Requerimiento |
|---|---|
| RNF-02.1 | El tiempo de respuesta de la API no debe superar 500ms en operaciones normales |
| RNF-02.2 | El frontend debe cargar en menos de 3 segundos en una conexión estándar |
| RNF-02.3 | Las consultas a la base de datos deben usar índices en campos frecuentemente filtrados |
| RNF-02.4 | La paginación debe implementarse en listados con más de 50 registros |

---

## RNF-03 — Disponibilidad

| ID | Requerimiento |
|---|---|
| RNF-03.1 | El sistema debe estar disponible al menos el 99% del tiempo en horario laboral |
| RNF-03.2 | El backend debe reiniciarse automáticamente ante fallas (gestor de procesos como PM2) |
| RNF-03.3 | La base de datos debe contar con respaldos automáticos diarios |

---

## RNF-04 — Usabilidad

| ID | Requerimiento |
|---|---|
| RNF-04.1 | La interfaz debe ser responsiva y funcionar en dispositivos móviles y escritorio |
| RNF-04.2 | Los mensajes de error deben ser claros y en español |
| RNF-04.3 | El sistema debe mostrar confirmación visual ante cada acción importante |
| RNF-04.4 | La navegación debe ser coherente entre todos los roles |
| RNF-04.5 | La interfaz debe seguir los patrones de Bootstrap 5 de forma consistente |

---

## RNF-05 — Mantenibilidad

| ID | Requerimiento |
|---|---|
| RNF-05.1 | El código debe seguir los principios SOLID, DRY y KISS |
| RNF-05.2 | Cada módulo (frontend y backend) debe tener responsabilidad única |
| RNF-05.3 | La lógica de negocio debe residir en la capa de servicios, no en rutas ni vistas |
| RNF-05.4 | Los componentes de UI deben ser reutilizables y parametrizables |
| RNF-05.5 | El código debe incluir comentarios en funciones complejas |
| RNF-05.6 | Las decisiones técnicas importantes deben documentarse en `architecture/decisiones.md` |

---

## RNF-06 — Escalabilidad

| ID | Requerimiento |
|---|---|
| RNF-06.1 | La arquitectura debe permitir agregar nuevos módulos sin modificar los existentes |
| RNF-06.2 | La base de datos debe soportar al menos 10.000 usuarios y 100.000 postulaciones |
| RNF-06.3 | El backend debe poder escalarse horizontalmente en el futuro |

---

## RNF-07 — Compatibilidad

| ID | Requerimiento |
|---|---|
| RNF-07.1 | El frontend debe funcionar en Chrome, Firefox, Edge y Safari (últimas 2 versiones) |
| RNF-07.2 | La API debe seguir los principios REST |
| RNF-07.3 | Los datos intercambiados deben estar en formato JSON |
| RNF-07.4 | La base de datos debe ser MySQL 8+ |

---

## RNF-08 — Portabilidad y Despliegue

| ID | Requerimiento |
|---|---|
| RNF-08.1 | El proyecto debe poder desplegarse con Docker Compose |
| RNF-08.2 | Las variables de entorno deben estar separadas por entorno (development / production) |
| RNF-08.3 | El repositorio debe incluir instrucciones claras de instalación y despliegue |
| RNF-08.4 | El proyecto debe estar preparado para GitHub con `.gitignore` apropiado |
