const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { listarPendientes, aprobar } = require('../controllers/empresa.controller');

const router = express.Router();

router.get('/empresas/pending', authenticateJWT, requireRole(['admin']), listarPendientes);
router.patch('/empresas/:id/approve', authenticateJWT, requireRole(['admin']), aprobar);

module.exports = router;
