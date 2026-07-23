/**
 * Tests de integración — API REST con Supertest
 * Levanta app.js sin servidor real ni BD (mockeamos los servicios y modelos).
 *
 * Estrategia:
 *   - Mockear la capa de servicios completa para aislar la API de la BD.
 *   - Verificar que los controllers devuelven los HTTP codes y bodies correctos.
 *   - Un test de /health SÍ usa la app real sin mocks.
 */

const { describe, test, expect, beforeEach } = require('@jest/globals');
const request = require('supertest');
const jwt     = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'test_secret_jwt_unsch_2026';

// ── Mocks de servicios ────────────────────────────────────────
jest.mock('../../src/services/auth.service');
jest.mock('../../src/services/convocatoria.service');
jest.mock('../../src/services/postulacion.service');
jest.mock('../../src/services/empresa.service');
jest.mock('../../src/services/usuario.service');

// Mock de modelos (para que app.js cargue sin BD)
jest.mock('../../src/models', () => ({
  Usuario:      { findOne: jest.fn(), findByPk: jest.fn(), findAll: jest.fn() },
  Estudiante:   { findOne: jest.fn() },
  Convocatoria: { findAll: jest.fn(), findByPk: jest.fn() },
  Postulacion:  { findAll: jest.fn(), findByPk: jest.fn() },
}));

const authService         = require('../../src/services/auth.service');
const convocatoriaService = require('../../src/services/convocatoria.service');
const postulacionService  = require('../../src/services/postulacion.service');
const app                 = require('../../src/app');

beforeEach(() => jest.clearAllMocks());

// ── Helper: genera un Bearer token de test ────────────────────
function tokenFor(payload) {
  return `Bearer ${jwt.sign(payload, SECRET, { expiresIn: '1h' })}`;
}

// ─────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────
describe('GET /health', () => {
  test('responde 200 con ok:true', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// Ruta no encontrada
// ─────────────────────────────────────────────────────────────
describe('Ruta inexistente', () => {
  test('devuelve 404', async () => {
    const res = await request(app).get('/api/ruta-que-no-existe');
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────────────────────
// POST /api/login
// ─────────────────────────────────────────────────────────────
describe('POST /api/login', () => {
  test('400 si faltan campos requeridos', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: '', password: '' });
    expect(res.status).toBe(400);
  });

  test('401 cuando las credenciales son incorrectas', async () => {
    authService.login.mockRejectedValue(Object.assign(new Error('Credenciales inválidas.'), { statusCode: 401 }));

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'malo@test.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/credenciales/i);
  });

  test('200 con token y datos de usuario cuando login es correcto', async () => {
    authService.login.mockResolvedValue({
      message: 'Login exitoso.',
      token: 'fake.jwt.token',
      user: { id: 1, nombre: 'Juan', rol: 'estudiante', email: 'juan@test.com' },
    });

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'juan@test.com', password: 'pass1234' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.rol).toBe('estudiante');
  });
});

// ─────────────────────────────────────────────────────────────
// POST /api/register
// ─────────────────────────────────────────────────────────────
describe('POST /api/register', () => {
  test('400 si password tiene menos de 8 caracteres', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'a@test.com', password: 'corta', rol: 'estudiante' });
    expect(res.status).toBe(400);
  });

  test('400 si el rol es admin', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'a@test.com', password: 'pass1234', rol: 'admin' });
    expect(res.status).toBe(400);
  });

  test('201 con registro exitoso de estudiante', async () => {
    authService.registrar.mockResolvedValue({
      message: 'Cuenta de estudiante creada correctamente.',
      user: { id: 10, nombre: 'Ana', rol: 'estudiante', email: 'ana@test.com' },
    });

    const res = await request(app)
      .post('/api/register')
      .send({ email: 'ana@test.com', password: 'pass1234', rol: 'estudiante', nombre: 'Ana' });

    expect(res.status).toBe(201);
    expect(res.body.user.rol).toBe('estudiante');
  });

  test('409 si el email ya existe', async () => {
    authService.registrar.mockRejectedValue(
      Object.assign(new Error('Ya existe un usuario con ese email.'), { statusCode: 409 })
    );

    const res = await request(app)
      .post('/api/register')
      .send({ email: 'dup@test.com', password: 'pass1234', rol: 'estudiante', nombre: 'Dup' });

    expect(res.status).toBe(409);
  });
});

// ─────────────────────────────────────────────────────────────
// GET /api/convocatorias
// ─────────────────────────────────────────────────────────────
describe('GET /api/convocatorias', () => {
  test('401 sin token', async () => {
    const res = await request(app).get('/api/convocatorias');
    expect(res.status).toBe(401);
  });

  test('200 con lista de convocatorias para estudiante autenticado', async () => {
    convocatoriaService.listar.mockResolvedValue([
      { id: 1, titulo: 'Práctica TI', empresa: 'UNSCH', activo: true },
      { id: 2, titulo: 'Práctica Finanzas', empresa: 'GORE', activo: true },
    ]);

    const res = await request(app)
      .get('/api/convocatorias')
      .set('Authorization', tokenFor({ sub: 1, rol: 'estudiante', email: 'est@test.com' }));

    expect(res.status).toBe(200);
    expect(res.body.convocatorias).toHaveLength(2);
    expect(res.body.convocatorias[0].titulo).toBe('Práctica TI');
  });
});

// ─────────────────────────────────────────────────────────────
// POST /api/postular
// ─────────────────────────────────────────────────────────────
describe('POST /api/postular', () => {
  test('401 sin token', async () => {
    const res = await request(app).post('/api/postular').send({ convocatoriaId: 1 });
    expect(res.status).toBe(401);
  });

  test('403 si el rol no es estudiante', async () => {
    const res = await request(app)
      .post('/api/postular')
      .set('Authorization', tokenFor({ sub: 1, rol: 'empresa', email: 'emp@test.com' }))
      .send({ convocatoriaId: 1 });
    expect(res.status).toBe(403);
  });

  test('201 postulación exitosa', async () => {
    postulacionService.postular.mockResolvedValue({ id: 5, estudiante_id: 1, convocatoria_id: 2 });

    const res = await request(app)
      .post('/api/postular')
      .set('Authorization', tokenFor({ sub: 1, rol: 'estudiante', email: 'est@test.com' }))
      .send({ convocatoriaId: 2 });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/registrada/i);
  });
});

// ─────────────────────────────────────────────────────────────
// GET /api/postulaciones
// ─────────────────────────────────────────────────────────────
describe('GET /api/postulaciones', () => {
  test('401 sin token', async () => {
    const res = await request(app).get('/api/postulaciones');
    expect(res.status).toBe(401);
  });

  test('200 devuelve postulaciones del estudiante', async () => {
    postulacionService.listar.mockResolvedValue([
      { id: 1, estado: 'Enviado', Convocatoria: { titulo: 'Práctica TI' } },
    ]);

    const res = await request(app)
      .get('/api/postulaciones')
      .set('Authorization', tokenFor({ sub: 1, rol: 'estudiante', email: 'est@test.com' }));

    expect(res.status).toBe(200);
    expect(res.body.postulaciones).toHaveLength(1);
  });
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/postulaciones/:id
// ─────────────────────────────────────────────────────────────
describe('PATCH /api/postulaciones/:id', () => {
  test('401 sin token', async () => {
    const res = await request(app).patch('/api/postulaciones/1').send({ estado: 'Seleccionado' });
    expect(res.status).toBe(401);
  });

  test('403 si el rol es estudiante (no puede cambiar estado)', async () => {
    const res = await request(app)
      .patch('/api/postulaciones/1')
      .set('Authorization', tokenFor({ sub: 1, rol: 'estudiante', email: 'est@test.com' }))
      .send({ estado: 'Seleccionado' });
    expect(res.status).toBe(403);
  });

  test('200 admin puede cambiar el estado', async () => {
    postulacionService.actualizarEstado.mockResolvedValue({ id: 1, estado: 'Seleccionado' });

    const res = await request(app)
      .patch('/api/postulaciones/1')
      .set('Authorization', tokenFor({ sub: 99, rol: 'admin', email: 'admin@test.com' }))
      .send({ estado: 'Seleccionado' });

    expect(res.status).toBe(200);
  });
});
