const clientService = require('../services/client.service');

const createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const client = await clientService.createClient({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
    });

    return res.status(201).json({
      message: 'Client created successfully',
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
      },
    });
  } catch (error) {
    console.error('Create client error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getClients = async (req, res) => {
  await clientService.getClients();
  return res.status(501).json({ message: 'Not implemented' });
};

const getClientById = async (req, res) => {
  await clientService.getClientById(req.params.id);
  return res.status(501).json({ message: 'Not implemented' });
};

const updateClient = async (req, res) => {
  await clientService.updateClient(req.params.id, req.body);
  return res.status(501).json({ message: 'Not implemented' });
};

const deleteClient = async (req, res) => {
  await clientService.deleteClient(req.params.id);
  return res.status(501).json({ message: 'Not implemented' });
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
