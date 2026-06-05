const prisma = require('../prisma/client');

/**
 * Helper function to verify if a client exists.
 * Throws a custom error if not found.
 * @param {string} clientId
 */
const checkClientExists = async (clientId) => {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });
  if (!client) {
    const error = new Error('Client not found');
    error.statusCode = 404;
    throw error;
  }
};

/**
 * Create a new invoice.
 * @param {object} data
 */
const createInvoice = async (data) => {
  await checkClientExists(data.clientId);

  return prisma.invoice.create({
    data: {
      invoiceNumber: data.invoiceNumber,
      amount: parseFloat(data.amount),
      dueDate: new Date(data.dueDate),
      paid: data.paid === undefined ? false : !!data.paid,
      description: data.description || null,
      clientId: data.clientId,
    },
    include: {
      client: true,
    },
  });
};

/**
 * Get all invoices ordered by dueDate ascending.
 */
const getInvoices = async () => {
  return prisma.invoice.findMany({
    orderBy: { dueDate: 'asc' },
    include: {
      client: true,
    },
  });
};

/**
 * Get a single invoice by ID.
 * @param {string} id
 */
const getInvoiceById = async (id) => {
  return prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
    },
  });
};

/**
 * Update an invoice by ID.
 * @param {string} id
 * @param {object} data
 */
const updateInvoice = async (id, data) => {
  if (data.clientId !== undefined) {
    await checkClientExists(data.clientId);
  }

  const updateData = {};
  if (data.invoiceNumber !== undefined) updateData.invoiceNumber = data.invoiceNumber;
  if (data.amount !== undefined) updateData.amount = parseFloat(data.amount);
  if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);
  if (data.paid !== undefined) updateData.paid = !!data.paid;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.clientId !== undefined) updateData.clientId = data.clientId;

  return prisma.invoice.update({
    where: { id },
    data: updateData,
    include: {
      client: true,
    },
  });
};

/**
 * Delete an invoice by ID.
 * @param {string} id
 */
const deleteInvoice = async (id) => {
  return prisma.invoice.delete({
    where: { id },
    include: {
      client: true,
    },
  });
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
