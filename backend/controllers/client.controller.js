const clientService = require('../services/client.service');

const toClientData = (client) => ({
  id: client.id,
  name: client.name,
  email: client.email,
  phone: client.phone,
});

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
      data: toClientData(client),
    });
  } catch (error) {
    console.error('Create client error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();

    return res.status(200).json({
      message: 'Clients retrieved successfully',
      data: clients.map(toClientData),
    });
  } catch (error) {
    console.error('Get clients error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    const client = await clientService.getClientById(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.status(200).json({
      message: 'Client retrieved successfully',
      data: toClientData(client),
    });
  } catch (error) {
    console.error('Get client error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    if (name === undefined && email === undefined && phone === undefined) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }

    if (email !== undefined && !String(email).trim()) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = String(name).trim();
    if (email !== undefined) updateData.email = String(email).trim();
    if (phone !== undefined) updateData.phone = phone ? String(phone).trim() : null;

    const client = await clientService.updateClient(id, updateData);

    return res.status(200).json({
      message: 'Client updated successfully',
      data: toClientData(client),
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Client not found' });
    }

    console.error('Update client error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    const client = await clientService.deleteClient(id);

    return res.status(200).json({
      message: 'Client deleted successfully',
      data: toClientData(client),
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Client not found' });
    }

    console.error('Delete client error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
