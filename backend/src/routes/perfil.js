const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { obtenerPerfil, actualizarPerfil } = require('../controllers/usuario.controller');

const router = express.Router();

router.get('/perfil', authenticateJWT, requireRole(['admin', 'empresa', 'estudiante']), obtenerPerfil);
router.patch('/perfil', authenticateJWT, requireRole(['empresa', 'estudiante']), actualizarPerfil);

module.exports = router;
