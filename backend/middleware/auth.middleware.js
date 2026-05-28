const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };
