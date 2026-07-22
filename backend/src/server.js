/**
 * server.js — Punto de entrada del servidor.
 * Importa la app Express y arranca el servidor HTTP.
 */

const app = require('./app');
const { syncAll } = require('./models');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await syncAll();
    app.listen(PORT, () => {
      console.log(`[SERVER] Backend escuchando en http://localhost:${PORT}`);
      console.log(`[SERVER] Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('[SERVER] No se pudo iniciar el servidor:', err);
    process.exit(1);
  }
}

start();
