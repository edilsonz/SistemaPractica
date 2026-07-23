/**
 * Tests unitarios — Middlewares de autenticación y autorización
 * Cubre: authenticateJWT y requireRole
 */

const { describe, test, expect, beforeEach } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const { authenticateJWT, requireRole } = require('../../src/middlewares/auth');

const SECRET = process.env.JWT_SECRET || 'test_secret_jwt_unsch_2026';

// ── Helpers para simular req/res/next de Express ──────────────
function mockReq(overrides = {}) {
  return { headers: {}, user: null, ...overrides };
}

function mockRes() {
  const res = {};
  res.status = (code) => { res.statusCode = code; return res; };
  res.json   = (body) => { res.body = body; return res; };
  return res;
}

// ─────────────────────────────────────────────────────────────
// authenticateJWT
// ─────────────────────────────────────────────────────────────
describe('authenticateJWT', () => {
  test('llama next() con token válido y adjunta payload en req.user', () => {
    const payload = { sub: 1, rol: 'estudiante', email: 'e@unsch.edu.pe' };
    const token   = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    const req     = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res     = mockRes();
    const next    = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user.sub).toBe(1);
    expect(req.user.rol).toBe('estudiante');
  });

  test('devuelve 401 cuando no hay header Authorization', () => {
    const req  = mockReq();
    const res  = mockRes();
    const next = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Bearer/i);
  });

  test('devuelve 401 cuando el token está mal firmado', () => {
    const token = jwt.sign({ sub: 1, rol: 'admin' }, 'secreto_incorrecto');
    const req   = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res   = mockRes();
    const next  = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  test('devuelve 401 cuando el token está expirado', () => {
    const token = jwt.sign({ sub: 1, rol: 'admin' }, SECRET, { expiresIn: '-1s' });
    const req   = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res   = mockRes();
    const next  = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  test('devuelve 401 cuando el header no empieza con Bearer', () => {
    const req  = mockReq({ headers: { authorization: 'Basic dXNlcjpwYXNz' } });
    const res  = mockRes();
    const next = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────
// requireRole
// ─────────────────────────────────────────────────────────────
describe('requireRole()', () => {
  test('llama next() cuando el rol está en la lista permitida', () => {
    const req  = mockReq({ user: { rol: 'admin' } });
    const res  = mockRes();
    const next = jest.fn();

    requireRole(['admin', 'empresa'])(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('devuelve 403 cuando el rol no está en la lista', () => {
    const req  = mockReq({ user: { rol: 'estudiante' } });
    const res  = mockRes();
    const next = jest.fn();

    requireRole(['admin', 'empresa'])(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(403);
  });

  test('devuelve 403 cuando req.user es null', () => {
    const req  = mockReq({ user: null });
    const res  = mockRes();
    const next = jest.fn();

    requireRole(['admin'])(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(403);
  });

  test('permite todos los roles si la lista incluye todos', () => {
    ['admin', 'empresa', 'estudiante'].forEach((rol) => {
      const req  = mockReq({ user: { rol } });
      const res  = mockRes();
      const next = jest.fn();

      requireRole(['admin', 'empresa', 'estudiante'])(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
