/**
 * Controlador de autenticación.
 * Delega la lógica al servicio correspondiente y formatea las respuestas HTTP.
 */

const authService = require('../services/auth.service');
const { validarLogin, validarRegistro } = require('../validations/auth.validations');

async function register(req, res) {
  const errores = validarRegistro(req.body || {});
  if (errores.length) {
    return res.status(400).json({ message: errores[0] });
  }

  try {
    const resultado = await authService.registrar(req.body);
    return res.status(201).json(resultado);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password, rol } = req.body || {};
  const errores = validarLogin({ email, password });
  if (errores.length) {
    return res.status(400).json({ message: errores[0] });
  }

  try {
    const resultado = await authService.login(email, password, rol);
    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { register, login };
