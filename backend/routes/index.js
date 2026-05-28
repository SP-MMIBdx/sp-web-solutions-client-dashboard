const express = require('express');
const clientRoutes = require('./client.routes');

const healthRoutes = require('./health');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);

module.exports = router;