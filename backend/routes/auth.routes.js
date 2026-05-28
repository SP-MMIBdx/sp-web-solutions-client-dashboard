const express = require('express');
const router = express.Router();

const {
  register,
  login,
  me,
  adminOnly,
  clientOrAdmin,
} = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);
router.get('/admin-only', authenticate, requireRole('admin'), adminOnly);
router.get('/client-or-admin', authenticate, requireRole('admin', 'client'), clientOrAdmin);

module.exports = router;
