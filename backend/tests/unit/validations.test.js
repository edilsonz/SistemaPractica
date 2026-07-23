/**
 * Tests unitarios — Validaciones de entrada
 * Cubre: auth.validations.js y convocatoria.validations.js
 */

const { describe, test, expect } = require('@jest/globals');
const { validarLogin, validarRegistro } = require('../../src/validations/auth.validations');
const { validarCrearConvocatoria }       = require('../../src/validations/convocatoria.validations');

// ─────────────────────────────────────────────────────────────
// validarLogin
// ─────────────────────────────────────────────────────────────
describe('validarLogin()', () => {
  test('sin errores cuando email y password están presentes', () => {
    const errores = validarLogin({ email: 'a@b.com', password: '12345678' });
    expect(errores).toHaveLength(0);
  });

  test('error cuando falta email', () => {
    const errores = validarLogin({ email: '', password: '12345678' });
    expect(errores).toContain('email es requerido.');
  });

  test('error cuando falta password', () => {
    const errores = validarLogin({ email: 'a@b.com', password: '' });
    expect(errores).toContain('password es requerido.');
  });

  test('dos errores cuando faltan ambos campos', () => {
    const errores = validarLogin({ email: '', password: '' });
    expect(errores).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────────────────────
// validarRegistro
// ─────────────────────────────────────────────────────────────
describe('validarRegistro()', () => {
  test('sin errores con datos válidos de estudiante', () => {
    const errores = validarRegistro({ email: 'est@unsch.edu.pe', password: 'segura123', rol: 'estudiante' });
    expect(errores).toHaveLength(0);
  });

  test('sin errores con datos válidos de empresa', () => {
    const errores = validarRegistro({ email: 'emp@empresa.com', password: 'segura123', rol: 'empresa' });
    expect(errores).toHaveLength(0);
  });

  test('error cuando password tiene menos de 8 caracteres', () => {
    const errores = validarRegistro({ email: 'a@b.com', password: 'corta', rol: 'estudiante' });
    expect(errores).toContain('La contraseña debe tener al menos 8 caracteres.');
  });

  test('error cuando rol es admin (no permitido desde portal)', () => {
    const errores = validarRegistro({ email: 'a@b.com', password: 'segura123', rol: 'admin' });
    expect(errores).toContain('No está permitido registrar administradores desde el portal.');
  });

  test('error cuando falta el rol', () => {
    const errores = validarRegistro({ email: 'a@b.com', password: 'segura123', rol: '' });
    expect(errores).toContain('rol es requerido.');
  });

  test('error cuando falta email', () => {
    const errores = validarRegistro({ email: '', password: 'segura123', rol: 'estudiante' });
    expect(errores).toContain('email es requerido.');
  });
});

// ─────────────────────────────────────────────────────────────
// validarCrearConvocatoria
// ─────────────────────────────────────────────────────────────
describe('validarCrearConvocatoria()', () => {
  const base = {
    titulo:      'Práctica en TI',
    descripcion: 'Descripción de la práctica',
    modalidad:   'Presencial',
    fecha_inicio: '2026-08-01',
    fecha_fin:    '2026-12-01',
  };

  test('sin errores con datos completos y válidos', () => {
    const errores = validarCrearConvocatoria(base);
    expect(errores).toHaveLength(0);
  });

  test('sin errores sin fecha_fin (es opcional)', () => {
    const errores = validarCrearConvocatoria({ ...base, fecha_fin: undefined });
    expect(errores).toHaveLength(0);
  });

  test('error cuando falta título', () => {
    const errores = validarCrearConvocatoria({ ...base, titulo: '' });
    expect(errores).toContain('titulo es requerido.');
  });

  test('error cuando falta descripción', () => {
    const errores = validarCrearConvocatoria({ ...base, descripcion: '' });
    expect(errores).toContain('descripcion es requerida.');
  });

  test('error cuando modalidad no es válida', () => {
    const errores = validarCrearConvocatoria({ ...base, modalidad: 'Remota' });
    expect(errores.some((e) => e.includes('Modalidad inválida'))).toBe(true);
  });

  test('error cuando fecha_fin es anterior a fecha_inicio', () => {
    const errores = validarCrearConvocatoria({
      ...base,
      fecha_inicio: '2026-12-01',
      fecha_fin:    '2026-08-01',
    });
    expect(errores).toContain('fecha_fin no puede ser anterior a fecha_inicio.');
  });

  test('acepta las tres modalidades válidas', () => {
    ['Presencial', 'Virtual', 'Híbrida'].forEach((modalidad) => {
      const errores = validarCrearConvocatoria({ ...base, modalidad });
      expect(errores).toHaveLength(0);
    });
  });
});
