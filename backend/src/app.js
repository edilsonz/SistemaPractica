/**
 * app.js — Configuración de la aplicación Express.
 * Separado de server.js para facilitar testing y reutilización.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// Rutas
const loginRoutes = require('./routes/login');
const usuariosRoutes = require('./routes/usuarios');
const perfilRoutes = require('./routes/perfil');
const convocatoriasRoutes = require('./routes/convocatorias');
const postulacionesRoutes = require('./routes/postulaciones');
const postularRoutes = require('./routes/postular');
const empresasRoutes = require('./routes/empresas');

const app = express();

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: false,
}));

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.status(200).json({ ok: true, env: process.env.NODE_ENV }));

// ── Rutas de la API ───────────────────────────────────────────────────────────
app.use('/api', loginRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', perfilRoutes);
app.use('/api', convocatoriasRoutes);
app.use('/api', postulacionesRoutes);
app.use('/api', postularRoutes);
app.use('/api', empresasRoutes);

// ── Manejo de rutas no encontradas ────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado.' });
});

// ── Manejo centralizado de errores ────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Error interno del servidor.' });
});

module.exports = app;
