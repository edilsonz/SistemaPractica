/**
 * Controlador de postulaciones.
 */

const postulacionService = require('../services/postulacion.service');

async function postular(req, res) {
  try {
    await postulacionService.postular({
      usuarioId: req.user.sub,
      convocatoriaId: req.body?.convocatoriaId,
    });
    return res.status(201).json({ message: 'Postulación registrada correctamente.' });
  } catch (err) {
    // Duplicado: devuelve 200 para no romper el flujo del cliente
    const isDuplicate =
      err?.name === 'SequelizeUniqueConstraintError' ||
      err?.original?.code === 'ER_DUP_ENTRY';

    if (isDuplicate) {
      return res.status(200).json({
        message: 'Ya postulaste a esta convocatoria (no se permiten duplicados).',
        alreadyPostulated: true,
      });
    }

    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function listar(req, res) {
  try {
    const postulaciones = await postulacionService.listar({
      rol: req.user.rol,
      usuarioId: req.user.sub,
    });
    return res.status(200).json({ postulaciones });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function actualizarEstado(req, res) {
  try {
    const postulacion = await postulacionService.actualizarEstado({
      id: req.params.id,
      estado: req.body?.estado,
      usuarioId: req.user.sub,
      rol: req.user.rol,
    });
    return res.status(200).json({ message: 'Estado de la postulación actualizado.', postulacion });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { postular, listar, actualizarEstado };
