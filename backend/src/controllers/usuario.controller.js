/**
 * Controlador de usuarios.
 */

const usuarioService = require('../services/usuario.service');

async function listar(req, res) {
  try {
    const usuarios = await usuarioService.listarTodos();
    return res.status(200).json({ usuarios });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function obtenerPerfil(req, res) {
  try {
    const resultado = await usuarioService.obtenerPerfil(req.user.sub);
    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function actualizarPerfil(req, res) {
  try {
    const resultado = await usuarioService.actualizarPerfil(req.user.sub, req.body || {});
    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { listar, obtenerPerfil, actualizarPerfil };
