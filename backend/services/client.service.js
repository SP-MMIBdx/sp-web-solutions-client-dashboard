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
  return prisma.client.findMany({
    orderBy: { name: 'asc' },
  });
};

const getClientById = async (id) => {
  return prisma.client.findUnique({
    where: { id },
  });
};

const updateClient = async (id, data) => {
  return prisma.client.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
    },
  });
};

const deleteClient = async (id) => {
  return prisma.client.delete({
    where: { id },
  });
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
