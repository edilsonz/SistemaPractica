/**
 * Controlador de empresas / organizaciones colaboradoras.
 */

const empresaService = require('../services/empresa.service');

async function listarPendientes(req, res) {
  try {
    const empresas = await empresaService.listarPendientes();
    return res.status(200).json({ empresas });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function aprobar(req, res) {
  try {
    const empresa = await empresaService.aprobar(req.params.id);
    return res.status(200).json({ message: 'Empresa aprobada correctamente.', empresa });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { listarPendientes, aprobar };
