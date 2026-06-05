const express = require('express');
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoice.controller');

// Optional authentication / authorization middlewares can be placed here in the future:
// router.post('/', [authenticate, requireRole('admin')], createInvoice);
router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
