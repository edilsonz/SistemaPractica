const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { listar, crear, actualizar } = require('../controllers/convocatoria.controller');

const router = express.Router();

router.get('/convocatorias', authenticateJWT, requireRole(['admin', 'empresa', 'estudiante']), listar);
router.post('/convocatorias', authenticateJWT, requireRole(['empresa', 'admin']), crear);
router.patch('/convocatorias/:id', authenticateJWT, requireRole(['empresa', 'admin']), actualizar);

module.exports = router;
