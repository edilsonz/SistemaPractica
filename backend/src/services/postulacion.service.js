/**
 * Servicio de postulaciones.
 * Contiene la lógica de negocio para postular y gestionar postulaciones.
 */

const { Convocatoria, Estudiante, Postulacion, Usuario } = require('../models');

const ESTADOS_VALIDOS = ['Enviado', 'En Evaluación', 'Seleccionado', 'Rechazado'];

/**
 * Registra una nueva postulación de un estudiante.
 */
async function postular({ usuarioId, convocatoriaId }) {
  const estudiante = await Estudiante.findOne({ where: { usuario_id: usuarioId } });
  if (!estudiante) {
    const error = new Error('No existe perfil de estudiante para este usuario.');
    error.statusCode = 404;
    throw error;
  }

  if (!convocatoriaId) {
    const error = new Error('convocatoriaId es requerido.');
    error.statusCode = 400;
    throw error;
  }

  const convocatoria = await Convocatoria.findByPk(convocatoriaId);
  if (!convocatoria) {
    const error = new Error('Convocatoria no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (!convocatoria.activo || (convocatoria.fecha_fin && new Date(convocatoria.fecha_fin) < new Date())) {
    const error = new Error('La convocatoria no está disponible para postular.');
    error.statusCode = 400;
    throw error;
  }

  return Postulacion.create({
    estudiante_id: estudiante.id,
    convocatoria_id: convocatoriaId,
  });
}

/**
 * Lista postulaciones según el rol del usuario.
 */
async function listar({ rol, usuarioId }) {
  if (rol === 'estudiante') {
    const estudiante = await Estudiante.findOne({ where: { usuario_id: usuarioId } });
    if (!estudiante) {
      const error = new Error('No existe perfil de estudiante para este usuario.');
      error.statusCode = 404;
      throw error;
    }

    return Postulacion.findAll({
      where: { estudiante_id: estudiante.id },
      include: [{
        model: Convocatoria,
        attributes: ['id', 'titulo', 'empresa', 'descripcion', 'modalidad', 'activo', 'fecha_inicio', 'fecha_fin'],
      }],
      order: [['created_at', 'DESC']],
    });
  }

  if (rol === 'empresa') {
    const usuario = await Usuario.findByPk(usuarioId);
    const convocatorias = await Convocatoria.findAll({
      where: { empresa: usuario.nombre },
      attributes: ['id'],
    });
    const convocatoriaIds = convocatorias.map((c) => c.id);

    return Postulacion.findAll({
      where: { convocatoria_id: convocatoriaIds },
      include: [
        { model: Estudiante, attributes: ['id', 'nombre', 'email', 'escuela', 'telefono', 'cv_url'] },
        { model: Convocatoria, attributes: ['id', 'titulo', 'empresa', 'modalidad', 'activo'] },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  // Admin: todas las postulaciones
  return Postulacion.findAll({
    include: [
      { model: Estudiante, attributes: ['id', 'nombre', 'email', 'escuela'] },
      { model: Convocatoria, attributes: ['id', 'titulo', 'empresa', 'modalidad', 'activo'] },
    ],
    order: [['created_at', 'DESC']],
  });
}

/**
 * Actualiza el estado de una postulación.
 */
async function actualizarEstado({ id, estado, usuarioId, rol }) {
  if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
    const error = new Error(`Estado inválido. Valores permitidos: ${ESTADOS_VALIDOS.join(', ')}.`);
    error.statusCode = 400;
    throw error;
  }

  const postulacion = await Postulacion.findByPk(id, {
    include: [{ model: Convocatoria, attributes: ['empresa'] }],
  });

  if (!postulacion) {
    const error = new Error('Postulación no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (rol === 'empresa') {
    const usuario = await Usuario.findByPk(usuarioId);
    if (postulacion.Convocatoria.empresa !== usuario.nombre) {
      const error = new Error('No autorizado para cambiar esta postulación.');
      error.statusCode = 403;
      throw error;
    }
  }

  postulacion.estado = estado;
  return postulacion.save();
}

module.exports = { postular, listar, actualizarEstado, ESTADOS_VALIDOS };
