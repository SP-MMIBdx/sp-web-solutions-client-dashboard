const express = require('express');
const clientRoutes = require('./client.routes');

const healthRoutes = require('./health');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);

// Safely mount project routes
try {
  const projectRoutes = require('./project.routes');
  router.use('/projects', projectRoutes);
} catch (error) {
  console.error('Failed to load project routes:', error.message);
}

// Safely mount invoice routes
try {
  const invoiceRoutes = require('./invoice.routes');
  router.use('/invoices', invoiceRoutes);
} catch (error) {
  console.error('Failed to load invoice routes:', error.message);
}

module.exports = router;