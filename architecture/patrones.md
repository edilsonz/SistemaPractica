# Patrones de Diseño Aplicados

**Proyecto:** Sistema de Prácticas Preprofesionales UNSCH
**Versión:** 1.0.0 | **Fecha:** Julio 2026

---

## Patrones Arquitectónicos

### MVC Adaptado (Model — Controller — Service)

El backend sigue una variante del patrón MVC donde la vista es reemplazada por respuestas JSON:

| Capa | Responsabilidad | Carpeta |
|---|---|---|
| **Model** | Definición de tablas y relaciones | `models/` |
| **Controller** | Recibe la petición HTTP, valida entrada, forma la respuesta | `controllers/` |
| **Service** | Lógica de negocio pura, independiente de HTTP | `services/` |
| **Route** | Thin router: conecta URL + middleware + controller | `routes/` |

**Beneficio:** La lógica de negocio en `services/` puede probarse sin levantar el servidor.

---

### Repository Pattern (implícito via Sequelize)

Los servicios acceden a los datos exclusivamente a través de los modelos Sequelize, que actúan como repositorios. No hay SQL directo en controllers ni rutas.

```js
// service llama al modelo, no a la DB directamente
const convocatorias = await Convocatoria.findAll({ where, order });
```

---

### Context + Provider (Frontend)

El estado de autenticación se gestiona con React Context, evitando el prop drilling a través de toda la jerarquía de componentes:

```
<AuthProvider>           ← provee token, user, login, logout
  <AppLayout>
    <Sidebar>
    <PaginaConvocatorias> ← consume useAuth() directamente
```

---

## Patrones de Código

### Thin Router

Las rutas solo registran la URL, los middlewares y el handler. Ninguna lógica de negocio reside en ellas:

```js
// routes/convocatorias.js
router.get('/convocatorias',
  authenticateJWT,
  requireRole(['admin', 'empresa', 'estudiante']),
  listar   // ← controller
);
```

---

### Error propagation por statusCode

Los servicios lanzan errores con un `statusCode` adjunto. El controller los captura y devuelve el código HTTP correcto sin duplicar lógica:

```js
// service
const error = new Error('Convocatoria no encontrada.');
error.statusCode = 404;
throw error;

// controller
} catch (err) {
  return res.status(err.statusCode || 500).json({ message: err.message });
}
```

---

### Single Responsibility en Validaciones

Las funciones de validación están en `validations/` y se llaman antes de invocar al servicio. El servicio asume que los datos ya llegaron válidos:

```js
// controller
const errores = validarCrearConvocatoria(req.body);
if (errores.length) return res.status(400).json({ message: errores[0] });

const conv = await convocatoriaService.crear({ ... });
```

---

### Service Layer en Frontend

El frontend tiene su propia capa de servicios que encapsula las llamadas a la API. Los componentes no usan `fetch` directamente:

```js
// componente
const { data } = await getConvocatorias(token, { activo: true });

// servicio (encapsula fetch)
export async function getConvocatorias(token, params) {
  return apiFetch(`/api/convocatorias?${query}`, {}, token);
}
```

---

## Principios Aplicados

| Principio | Aplicación concreta |
|---|---|
| **SRP** (Single Responsibility) | Routes / Controllers / Services / Models tienen una sola función |
| **OCP** (Open/Closed) | Nuevos módulos se agregan sin modificar los existentes |
| **DRY** (Don't Repeat Yourself) | `apiFetch` centraliza fetch; `requireRole` centraliza la autorización |
| **KISS** (Keep It Simple) | Sin frameworks de estado complejos; Context API nativo de React |
| **Separation of Concerns** | HTTP ≠ negocio ≠ datos en el backend; UI ≠ lógica en el frontend |
