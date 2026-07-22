const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { listar, actualizarEstado } = require('../controllers/postulacion.controller');

const router = express.Router();

router.get('/postulaciones', authenticateJWT, requireRole(['admin', 'empresa', 'estudiante']), listar);
router.patch('/postulaciones/:id', authenticateJWT, requireRole(['admin', 'empresa']), actualizarEstado);

module.exports = router;
