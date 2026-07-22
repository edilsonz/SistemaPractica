/**
 * Validaciones para autenticación y registro.
 */

const ROLES_VALIDOS = ['empresa', 'estudiante'];
const MODALIDADES_VALIDAS = ['Presencial', 'Virtual', 'Híbrida'];

function validarLogin({ email, password }) {
  const errores = [];
  if (!email) errores.push('email es requerido.');
  if (!password) errores.push('password es requerido.');
  return errores;
}

function validarRegistro({ email, password, rol }) {
  const errores = [];
  if (!email) errores.push('email es requerido.');
  if (!password) errores.push('password es requerido.');
  if (!rol) errores.push('rol es requerido.');
  if (password && password.length < 8) errores.push('La contraseña debe tener al menos 8 caracteres.');
  if (rol && !ROLES_VALIDOS.includes(rol)) {
    errores.push('No está permitido registrar administradores desde el portal.');
  }
  return errores;
}

module.exports = { validarLogin, validarRegistro, ROLES_VALIDOS, MODALIDADES_VALIDAS };
