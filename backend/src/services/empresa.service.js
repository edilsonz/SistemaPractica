/**
 * Servicio de empresas / organizaciones colaboradoras.
 */

const { Usuario } = require('../models');

/**
 * Lista empresas pendientes de aprobación.
 */
async function listarPendientes() {
  return Usuario.findAll({
    where: { rol: 'empresa', approved: false },
    attributes: ['id', 'nombre', 'email', 'razon_social', 'ruc', 'descripcion', 'logo_url', 'approved'],
  });
}

/**
 * Aprueba una empresa por su ID.
 */
async function aprobar(id) {
  const empresa = await Usuario.findByPk(id);

  if (!empresa || empresa.rol !== 'empresa') {
    const error = new Error('Empresa no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  empresa.approved = true;
  return empresa.save();
}

module.exports = { listarPendientes, aprobar };
