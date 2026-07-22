/**
 * Servicio de autenticación.
 * Contiene la lógica de negocio para registro y login.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Estudiante } = require('../models');

const JWT_SECRET = () => process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = '2h';
const SALT_ROUNDS = 12;

/**
 * Registra un nuevo usuario (estudiante o empresa).
 * @param {object} datos - Datos del formulario de registro.
 * @returns {object} Usuario creado y mensaje de respuesta.
 */
async function registrar(datos) {
  const {
    email, password, rol, nombre,
    razon_social, ruc, descripcion, logo_url,
    escuela, telefono, cv_url,
  } = datos;

  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    const error = new Error('Ya existe un usuario con ese email.');
    error.statusCode = 409;
    throw error;
  }

  const nombreUsuario =
    rol === 'empresa'
      ? razon_social || nombre || email.split('@')[0]
      : nombre || email.split('@')[0];

  const nuevoUsuario = await Usuario.create({
    nombre: nombreUsuario,
    email,
    passwordHash: await bcrypt.hash(password, SALT_ROUNDS),
    rol,
    approved: rol !== 'empresa',
    razon_social: razon_social || null,
    ruc: ruc || null,
    descripcion: descripcion || null,
    logo_url: logo_url || null,
  });

  if (rol === 'estudiante') {
    const estudiante = await Estudiante.create({
      usuario_id: nuevoUsuario.id,
      nombre: nombre || email.split('@')[0],
      email,
      escuela: escuela || null,
      telefono: telefono || null,
      cv_url: cv_url || null,
    });

    return {
      message: 'Cuenta de estudiante creada correctamente. Ya puedes iniciar sesión.',
      user: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, rol: nuevoUsuario.rol, email: nuevoUsuario.email },
      estudiante,
    };
  }

  return {
    message:
      rol === 'empresa'
        ? 'Cuenta de empresa creada. El administrador debe aprobarla antes de poder iniciar sesión.'
        : 'Cuenta creada correctamente. Ya puedes iniciar sesión.',
    user: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, rol: nuevoUsuario.rol, email: nuevoUsuario.email },
  };
}

/**
 * Autentica un usuario y devuelve un token JWT.
 * @param {string} email
 * @param {string} password
 * @param {string|undefined} rolRequerido - Rol opcional para validación adicional.
 * @returns {object} Token y datos del usuario.
 */
async function login(email, password, rolRequerido) {
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario || (rolRequerido && usuario.rol !== rolRequerido)) {
    const error = new Error('Credenciales inválidas.');
    error.statusCode = 401;
    throw error;
  }

  if (usuario.rol === 'empresa' && !usuario.approved) {
    const error = new Error('Empresa pendiente de aprobación por el administrador.');
    error.statusCode = 403;
    throw error;
  }

  let passwordOk = await bcrypt.compare(password, usuario.passwordHash);

  // Migración transparente de cuentas creadas en la versión demo (password en texto plano).
  if (!passwordOk && usuario.passwordHash === password) {
    usuario.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await usuario.save();
    passwordOk = true;
  }

  if (!passwordOk) {
    const error = new Error('Credenciales inválidas.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { sub: usuario.id, rol: usuario.rol, email: usuario.email },
    JWT_SECRET(),
    { expiresIn: JWT_EXPIRES }
  );

  return {
    message: 'Login exitoso.',
    token,
    user: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol, email: usuario.email },
  };
}

module.exports = { registrar, login };
