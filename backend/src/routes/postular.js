const express = require('express');
const { authenticateJWT, requireRole } = require('../middlewares/auth');
const { postular } = require('../controllers/postulacion.controller');

const router = express.Router();

router.post('/postular', authenticateJWT, requireRole(['estudiante']), postular);

module.exports = router;
