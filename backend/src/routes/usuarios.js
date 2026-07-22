const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { listar } = require('../controllers/usuario.controller');

const router = express.Router();

router.get('/usuarios', authenticateJWT, requireRole(['admin']), listar);

module.exports = router;
