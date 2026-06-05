const invoiceService = require('../services/invoice.service');

const toInvoiceData = (invoice) => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber,
  amount: invoice.amount,
  dueDate: invoice.dueDate,
  paid: invoice.paid,
  description: invoice.description,
  clientId: invoice.clientId,
  client: invoice.client ? {
    id: invoice.client.id,
    name: invoice.client.name,
    email: invoice.client.email,
  } : undefined,
});

const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, amount, dueDate, paid, description, clientId } = req.body;

    // Creation validation: Required fields
    if (invoiceNumber === undefined || invoiceNumber === null || String(invoiceNumber).trim() === '') {
      return res.status(400).json({ message: 'Invoice number is required' });
    }

    if (amount === undefined || amount === null) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    if (dueDate === undefined || dueDate === null) {
      return res.status(400).json({ message: 'Due date is required' });
    }

    if (clientId === undefined || clientId === null || String(clientId).trim() === '') {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    // Validation: amount is numeric and greater than zero
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: 'Amount must be a numeric value greater than zero' });
    }

    // Validation: dueDate is a valid date
    if (isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ message: 'Invalid due date format' });
    }

    // Validation: paid is boolean if provided
    if (paid !== undefined && paid !== null && typeof paid !== 'boolean') {
      return res.status(400).json({ message: 'Paid must be a boolean' });
    }

    const invoice = await invoiceService.createInvoice({
      invoiceNumber: String(invoiceNumber).trim(),
      amount: parsedAmount,
      dueDate,
      paid,
      description: description ? String(description).trim() : null,
      clientId: String(clientId).trim(),
    });

    return res.status(201).json({
      message: 'Invoice created successfully',
      data: toInvoiceData(invoice),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Invoice number already exists' });
    }
    console.error('Create invoice error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getInvoices();

    return res.status(200).json({
      message: 'Invoices retrieved successfully',
      data: invoices.map(toInvoiceData),
    });
  } catch (error) {
    console.error('Get invoices error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Invoice ID is required' });
    }

    const invoice = await invoiceService.getInvoiceById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    return res.status(200).json({
      message: 'Invoice retrieved successfully',
      data: toInvoiceData(invoice),
    });
  } catch (error) {
    console.error('Get invoice error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceNumber, amount, dueDate, paid, description, clientId } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Invoice ID is required' });
    }

    // Allow partial updates; validate supplied fields only
    if (
      invoiceNumber === undefined &&
      amount === undefined &&
      dueDate === undefined &&
      paid === undefined &&
      description === undefined &&
      clientId === undefined
    ) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    const updateData = {};

    if (invoiceNumber !== undefined) {
      if (invoiceNumber === null || String(invoiceNumber).trim() === '') {
        return res.status(400).json({ message: 'Invoice number cannot be empty' });
      }
      updateData.invoiceNumber = String(invoiceNumber).trim();
    }

    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'Amount must be a numeric value greater than zero' });
      }
      updateData.amount = parsedAmount;
    }

    if (dueDate !== undefined) {
      if (dueDate === null || isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ message: 'Invalid due date format' });
      }
      updateData.dueDate = dueDate;
    }

    if (paid !== undefined) {
      if (paid === null || typeof paid !== 'boolean') {
        return res.status(400).json({ message: 'Paid must be a boolean' });
      }
      updateData.paid = paid;
    }

    if (description !== undefined) {
      updateData.description = description ? String(description).trim() : null;
    }

    if (clientId !== undefined) {
      if (clientId === null || String(clientId).trim() === '') {
        return res.status(400).json({ message: 'Client ID cannot be empty' });
      }
      updateData.clientId = String(clientId).trim();
    }

    const invoice = await invoiceService.updateInvoice(id, updateData);

    return res.status(200).json({
      message: 'Invoice updated successfully',
      data: toInvoiceData(invoice),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Invoice number already exists' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    console.error('Update invoice error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Invoice ID is required' });
    }

    const invoice = await invoiceService.deleteInvoice(id);

    return res.status(200).json({
      message: 'Invoice deleted successfully',
      data: toInvoiceData(invoice),
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    console.error('Delete invoice error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
