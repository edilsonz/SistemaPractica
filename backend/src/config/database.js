const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV,
} = process.env;

const missing = [
  !DB_HOST ? 'DB_HOST' : null,
  !DB_PORT ? null : null,
  !DB_NAME ? 'DB_NAME' : null,
  !DB_USER ? 'DB_USER' : null,
  !DB_PASSWORD ? 'DB_PASSWORD' : null,
].filter(Boolean);

if (missing.length) {
  // Evita que falle con user ''@'localhost' y ayuda a diagnosticar.
  console.error('[DB CONFIG] Faltan variables de entorno:', missing.join(', '));
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
});

module.exports = sequelize;

