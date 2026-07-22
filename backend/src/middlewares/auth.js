const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado. Falta Bearer token.' });
  }

  const token = authHeader.substring('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
    // payload esperado: { sub: usuarioId, rol, email }
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}

function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user?.rol) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'Rol no permitido para esta acción.' });
    }

    return next();
  };
}

module.exports = { authenticateJWT, requireRole };

