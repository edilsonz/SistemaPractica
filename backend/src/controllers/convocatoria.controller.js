/**
 * Controlador de convocatorias.
 */

const convocatoriaService = require('../services/convocatoria.service');
const { validarCrearConvocatoria } = require('../validations/convocatoria.validations');

async function listar(req, res) {
  try {
    const { modalidad, activo } = req.query;
    const convocatorias = await convocatoriaService.listar({
      rol: req.user.rol,
      usuarioId: req.user.sub,
      modalidad,
      activo,
    });
    return res.status(200).json({ convocatorias });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function crear(req, res) {
  const errores = validarCrearConvocatoria(req.body || {});
  if (errores.length) {
    return res.status(400).json({ message: errores[0] });
  }

  try {
    const convocatoria = await convocatoriaService.crear({
      usuarioId: req.user.sub,
      rol: req.user.rol,
      ...req.body,
    });
    return res.status(201).json({ convocatoria, message: 'Convocatoria creada correctamente.' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function actualizar(req, res) {
  try {
    const convocatoria = await convocatoriaService.actualizar({
      id: req.params.id,
      usuarioId: req.user.sub,
      rol: req.user.rol,
      cambios: req.body || {},
    });
    return res.status(200).json({ convocatoria, message: 'Convocatoria actualizada correctamente.' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { listar, crear, actualizar };
