/**
 * Tests unitarios — Servicios de negocio con mocks de Sequelize
 * Cubre: auth.service, convocatoria.service, postulacion.service, empresa.service
 */

const { describe, test, expect, beforeEach } = require('@jest/globals');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// ── Mock de modelos Sequelize ─────────────────────────────────
jest.mock('../../src/models', () => ({
  Usuario:      { findOne: jest.fn(), findByPk: jest.fn(), create: jest.fn(), findAll: jest.fn() },
  Estudiante:   { findOne: jest.fn(), create: jest.fn() },
  Convocatoria: { findByPk: jest.fn(), create: jest.fn(), findAll: jest.fn() },
  Postulacion:  { create: jest.fn(), findAll: jest.fn(), findByPk: jest.fn() },
}));

const { Usuario, Estudiante, Convocatoria, Postulacion } = require('../../src/models');
const authService         = require('../../src/services/auth.service');
const convocatoriaService = require('../../src/services/convocatoria.service');
const postulacionService  = require('../../src/services/postulacion.service');
const empresaService      = require('../../src/services/empresa.service');

beforeEach(() => jest.clearAllMocks());

// ─────────────────────────────────────────────────────────────
// AUTH SERVICE
// ─────────────────────────────────────────────────────────────
describe('authService.registrar()', () => {
  test('lanza 409 si el email ya existe', async () => {
    Usuario.findOne.mockResolvedValue({ id: 1, email: 'dup@test.com' });

    await expect(
      authService.registrar({ email: 'dup@test.com', password: 'pass1234', rol: 'estudiante', nombre: 'Test' })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  test('crea usuario y estudiante correctamente', async () => {
    Usuario.findOne.mockResolvedValue(null);
    const usuarioMock = { id: 5, nombre: 'Juan', email: 'juan@test.com', rol: 'estudiante' };
    Usuario.create.mockResolvedValue(usuarioMock);
    Estudiante.create.mockResolvedValue({ id: 3, usuario_id: 5 });

    const result = await authService.registrar({
      email: 'juan@test.com', password: 'pass1234', rol: 'estudiante', nombre: 'Juan',
    });

    expect(Usuario.create).toHaveBeenCalledTimes(1);
    expect(Estudiante.create).toHaveBeenCalledTimes(1);
    expect(result.user.email).toBe('juan@test.com');
    expect(result.message).toMatch(/creada/i);
  });

  test('crea empresa sin crear Estudiante', async () => {
    Usuario.findOne.mockResolvedValue(null);
    Usuario.create.mockResolvedValue({ id: 6, nombre: 'Empresa SA', email: 'emp@test.com', rol: 'empresa' });

    await authService.registrar({
      email: 'emp@test.com', password: 'pass1234', rol: 'empresa', razon_social: 'Empresa SA',
    });

    expect(Estudiante.create).not.toHaveBeenCalled();
  });
});

describe('authService.login()', () => {
  test('lanza 401 si usuario no existe', async () => {
    Usuario.findOne.mockResolvedValue(null);
    await expect(authService.login('noexiste@test.com', 'pass1234')).rejects.toMatchObject({ statusCode: 401 });
  });

  test('lanza 401 si la contraseña es incorrecta', async () => {
    const hash = await bcrypt.hash('correcta123', 10);
    Usuario.findOne.mockResolvedValue({
      id: 1, rol: 'estudiante', email: 'a@b.com', passwordHash: hash, approved: true,
      save: jest.fn(),
    });
    await expect(authService.login('a@b.com', 'incorrecta')).rejects.toMatchObject({ statusCode: 401 });
  });

  test('lanza 403 si empresa no está aprobada', async () => {
    const hash = await bcrypt.hash('pass1234', 10);
    Usuario.findOne.mockResolvedValue({
      id: 2, rol: 'empresa', email: 'emp@test.com', passwordHash: hash, approved: false,
      save: jest.fn(),
    });
    await expect(authService.login('emp@test.com', 'pass1234')).rejects.toMatchObject({ statusCode: 403 });
  });

  test('devuelve token y datos de usuario con credenciales correctas', async () => {
    const hash = await bcrypt.hash('pass1234', 10);
    Usuario.findOne.mockResolvedValue({
      id: 3, nombre: 'Admin', rol: 'admin', email: 'admin@test.com',
      passwordHash: hash, approved: true, save: jest.fn(),
    });

    const result = await authService.login('admin@test.com', 'pass1234');

    expect(result.token).toBeDefined();
    expect(result.user.rol).toBe('admin');
    // Verifica que el token sea válido
    const payload = jwt.verify(result.token, process.env.JWT_SECRET);
    expect(payload.sub).toBe(3);
  });
});

// ─────────────────────────────────────────────────────────────
// CONVOCATORIA SERVICE
// ─────────────────────────────────────────────────────────────
describe('convocatoriaService.crear()', () => {
  test('lanza 404 si el usuario no existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);
    await expect(
      convocatoriaService.crear({ usuarioId: 99, rol: 'empresa', titulo: 'T', descripcion: 'D' })
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  test('crea convocatoria correctamente como empresa', async () => {
    Usuario.findByPk.mockResolvedValue({ id: 1, nombre: 'Empresa XYZ' });
    const convMock = { id: 10, titulo: 'Práctica TI', empresa: 'Empresa XYZ' };
    Convocatoria.create.mockResolvedValue(convMock);

    const result = await convocatoriaService.crear({
      usuarioId: 1, rol: 'empresa', titulo: 'Práctica TI', descripcion: 'Desc',
      modalidad: 'Virtual', fecha_inicio: '2026-08-01',
    });

    expect(Convocatoria.create).toHaveBeenCalledTimes(1);
    expect(result.empresa).toBe('Empresa XYZ');
  });
});

describe('convocatoriaService.actualizar()', () => {
  test('lanza 404 si la convocatoria no existe', async () => {
    Usuario.findByPk.mockResolvedValue({ id: 1, nombre: 'Empresa A' });
    Convocatoria.findByPk.mockResolvedValue(null);

    await expect(
      convocatoriaService.actualizar({ id: 999, usuarioId: 1, rol: 'empresa', cambios: { activo: false } })
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  test('lanza 403 si empresa intenta editar convocatoria de otra empresa', async () => {
    Usuario.findByPk.mockResolvedValue({ id: 1, nombre: 'Empresa A' });
    Convocatoria.findByPk.mockResolvedValue({
      id: 5, empresa: 'Empresa B', save: jest.fn(),
    });

    await expect(
      convocatoriaService.actualizar({ id: 5, usuarioId: 1, rol: 'empresa', cambios: { activo: false } })
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  test('actualiza campo activo correctamente', async () => {
    Usuario.findByPk.mockResolvedValue({ id: 1, nombre: 'Empresa A' });
    const convMock = { id: 5, empresa: 'Empresa A', activo: true, save: jest.fn().mockResolvedValue(true) };
    Convocatoria.findByPk.mockResolvedValue(convMock);

    await convocatoriaService.actualizar({ id: 5, usuarioId: 1, rol: 'empresa', cambios: { activo: false } });

    expect(convMock.activo).toBe(false);
    expect(convMock.save).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────────────────────
// POSTULACION SERVICE
// ─────────────────────────────────────────────────────────────
describe('postulacionService.postular()', () => {
  test('lanza 404 si no existe perfil de estudiante', async () => {
    Estudiante.findOne.mockResolvedValue(null);
    await expect(postulacionService.postular({ usuarioId: 1, convocatoriaId: 2 }))
      .rejects.toMatchObject({ statusCode: 404 });
  });

  test('lanza 404 si la convocatoria no existe', async () => {
    Estudiante.findOne.mockResolvedValue({ id: 3 });
    Convocatoria.findByPk.mockResolvedValue(null);
    await expect(postulacionService.postular({ usuarioId: 1, convocatoriaId: 999 }))
      .rejects.toMatchObject({ statusCode: 404 });
  });

  test('lanza 400 si la convocatoria no está activa', async () => {
    Estudiante.findOne.mockResolvedValue({ id: 3 });
    Convocatoria.findByPk.mockResolvedValue({ id: 2, activo: false, fecha_fin: null });
    await expect(postulacionService.postular({ usuarioId: 1, convocatoriaId: 2 }))
      .rejects.toMatchObject({ statusCode: 400 });
  });

  test('lanza 400 si la convocatoria está expirada', async () => {
    Estudiante.findOne.mockResolvedValue({ id: 3 });
    Convocatoria.findByPk.mockResolvedValue({
      id: 2, activo: true, fecha_fin: new Date('2020-01-01'),
    });
    await expect(postulacionService.postular({ usuarioId: 1, convocatoriaId: 2 }))
      .rejects.toMatchObject({ statusCode: 400 });
  });

  test('crea postulación correctamente', async () => {
    Estudiante.findOne.mockResolvedValue({ id: 3 });
    Convocatoria.findByPk.mockResolvedValue({ id: 2, activo: true, fecha_fin: null });
    Postulacion.create.mockResolvedValue({ id: 10, estudiante_id: 3, convocatoria_id: 2 });

    const result = await postulacionService.postular({ usuarioId: 1, convocatoriaId: 2 });
    expect(result.id).toBe(10);
    expect(Postulacion.create).toHaveBeenCalledWith({ estudiante_id: 3, convocatoria_id: 2 });
  });
});

describe('postulacionService.actualizarEstado()', () => {
  test('lanza 400 con estado inválido', async () => {
    await expect(
      postulacionService.actualizarEstado({ id: 1, estado: 'Aprobado', usuarioId: 1, rol: 'admin' })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  test('lanza 404 si la postulación no existe', async () => {
    Postulacion.findByPk.mockResolvedValue(null);
    await expect(
      postulacionService.actualizarEstado({ id: 999, estado: 'Seleccionado', usuarioId: 1, rol: 'admin' })
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  test('actualiza estado correctamente como admin', async () => {
    const postMock = {
      id: 1, estado: 'Enviado',
      Convocatoria: { empresa: 'Empresa A' },
      save: jest.fn().mockResolvedValue(true),
    };
    Postulacion.findByPk.mockResolvedValue(postMock);

    await postulacionService.actualizarEstado({ id: 1, estado: 'Seleccionado', usuarioId: 99, rol: 'admin' });

    expect(postMock.estado).toBe('Seleccionado');
    expect(postMock.save).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────────────────────
// EMPRESA SERVICE
// ─────────────────────────────────────────────────────────────
describe('empresaService.aprobar()', () => {
  test('lanza 404 si la empresa no existe', async () => {
    Usuario.findByPk.mockResolvedValue(null);
    await expect(empresaService.aprobar(999)).rejects.toMatchObject({ statusCode: 404 });
  });

  test('lanza 404 si el usuario no es empresa', async () => {
    Usuario.findByPk.mockResolvedValue({ id: 1, rol: 'estudiante' });
    await expect(empresaService.aprobar(1)).rejects.toMatchObject({ statusCode: 404 });
  });

  test('aprueba la empresa correctamente', async () => {
    const empMock = { id: 2, rol: 'empresa', approved: false, save: jest.fn().mockResolvedValue(true) };
    Usuario.findByPk.mockResolvedValue(empMock);

    await empresaService.aprobar(2);

    expect(empMock.approved).toBe(true);
    expect(empMock.save).toHaveBeenCalledTimes(1);
  });
});
