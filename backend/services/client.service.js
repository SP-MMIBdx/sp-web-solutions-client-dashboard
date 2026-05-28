const prisma = require('../prisma/client');

const createClient = async (data) => {
  return prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
    },
  });
};

const getClients = async () => {
  // TODO: implement
};

const getClientById = async () => {
  // TODO: implement
};

const updateClient = async () => {
  // TODO: implement
};

const deleteClient = async () => {
  // TODO: implement
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
