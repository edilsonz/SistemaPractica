/**
 * Servicio de convocatorias.
 * Contiene la lógica de negocio para CRUD de convocatorias.
 */

const { Convocatoria, Usuario } = require('../models');

/**
 * Lista convocatorias según rol y filtros.
 */
async function listar({ rol, usuarioId, modalidad, activo }) {
  const where = {};

  if (modalidad) where.modalidad = modalidad;

  if (activo !== undefined) {
    where.activo = activo === 'true' || activo === true;
  } else if (rol === 'estudiante') {
    where.activo = true;
  }

  if (rol === 'empresa') {
    const usuario = await Usuario.findByPk(usuarioId);
    if (usuario) where.empresa = usuario.nombre;
  }

  return Convocatoria.findAll({
    where,
    order: [['fecha_inicio', 'DESC'], ['id', 'DESC']],
    attributes: ['id', 'titulo', 'empresa', 'descripcion', 'modalidad', 'activo', 'fecha_inicio', 'fecha_fin'],
  });
}

/**
 * Crea una nueva convocatoria.
 */
async function crear({ usuarioId, rol, titulo, descripcion, modalidad, fecha_inicio, fecha_fin, empresa: empresaBody }) {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const empresa = rol === 'empresa' ? usuario.nombre : empresaBody || 'Administración';
  const fechaInicio = fecha_inicio ? new Date(fecha_inicio) : new Date();
  const fechaFin = fecha_fin ? new Date(fecha_fin) : null;

  return Convocatoria.create({
    titulo,
    descripcion,
    modalidad: modalidad || 'Presencial',
    empresa,
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    activo: true,
  });
}

/**
 * Actualiza una convocatoria existente.
 */
async function actualizar({ id, usuarioId, rol, cambios }) {
  const usuario = await Usuario.findByPk(usuarioId);
  const convocatoria = await Convocatoria.findByPk(id);

  if (!convocatoria) {
    const error = new Error('Convocatoria no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (rol === 'empresa' && convocatoria.empresa !== usuario.nombre) {
    const error = new Error('No autorizado para editar esta convocatoria.');
    error.statusCode = 403;
    throw error;
  }

  const { titulo, descripcion, modalidad, activo, fecha_inicio, fecha_fin } = cambios;

  convocatoria.titulo = titulo ?? convocatoria.titulo;
  convocatoria.descripcion = descripcion ?? convocatoria.descripcion;
  convocatoria.modalidad = modalidad ?? convocatoria.modalidad;
  convocatoria.activo = activo === undefined ? convocatoria.activo : Boolean(activo);
  convocatoria.fecha_inicio = fecha_inicio ? new Date(fecha_inicio) : convocatoria.fecha_inicio;
  convocatoria.fecha_fin = fecha_fin ? new Date(fecha_fin) : convocatoria.fecha_fin;

  return convocatoria.save();
}

module.exports = { listar, crear, actualizar };
