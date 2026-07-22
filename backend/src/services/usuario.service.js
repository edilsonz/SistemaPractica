/**
 * Servicio de usuarios.
 * Operaciones administrativas sobre cuentas de usuario.
 */

const { Usuario, Estudiante } = require('../models');

/**
 * Lista todos los usuarios con su perfil asociado (admin).
 */
async function listarTodos() {
  return Usuario.findAll({
    attributes: ['id', 'nombre', 'email', 'rol', 'approved', 'razon_social', 'created_at'],
    include: [{ model: Estudiante, attributes: ['id', 'escuela', 'telefono'] }],
    order: [['created_at', 'DESC']],
  });
}

/**
 * Obtiene el perfil completo de un usuario, incluyendo datos de estudiante si aplica.
 */
async function obtenerPerfil(id) {
  const usuario = await Usuario.findByPk(id, {
    attributes: ['id', 'nombre', 'email', 'rol', 'razon_social', 'ruc', 'descripcion', 'logo_url', 'approved'],
  });

  if (!usuario) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (usuario.rol === 'estudiante') {
    const estudiante = await Estudiante.findOne({ where: { usuario_id: usuario.id } });
    return { usuario, estudiante };
  }

  return { usuario };
}

/**
 * Actualiza el perfil de un usuario autenticado.
 */
async function actualizarPerfil(id, datos) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (usuario.rol === 'empresa') {
    const { razon_social, ruc, descripcion, logo_url } = datos;
    usuario.razon_social = razon_social ?? usuario.razon_social;
    usuario.ruc = ruc ?? usuario.ruc;
    usuario.descripcion = descripcion ?? usuario.descripcion;
    usuario.logo_url = logo_url ?? usuario.logo_url;
    await usuario.save();
    return { message: 'Perfil de empresa actualizado.', usuario };
  }

  // Estudiante
  const { nombre, escuela, telefono, cv_url } = datos;
  let estudiante = await Estudiante.findOne({ where: { usuario_id: usuario.id } });

  if (!estudiante) {
    estudiante = await Estudiante.create({
      usuario_id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      escuela: escuela || null,
      telefono: telefono || null,
      cv_url: cv_url || null,
    });
  } else {
    estudiante.nombre = nombre ?? estudiante.nombre;
    estudiante.escuela = escuela ?? estudiante.escuela;
    estudiante.telefono = telefono ?? estudiante.telefono;
    estudiante.cv_url = cv_url ?? estudiante.cv_url;
    await estudiante.save();
  }

  return { message: 'Perfil de estudiante actualizado.', estudiante };
}

module.exports = { listarTodos, obtenerPerfil, actualizarPerfil };
