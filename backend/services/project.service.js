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
 * Create a new project.
 * @param {object} data
 */
const createProject = async (data) => {
  await checkClientExists(data.clientId);

  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description || null,
      status: data.status || 'not_started',
      startDate: data.startDate ? new Date(data.startDate) : null,
      deadline: data.deadline ? new Date(data.deadline) : null,
      clientId: data.clientId,
    },
    include: {
      client: true,
    },
  });
};

/**
 * Get all projects ordered by name.
 */
const getProjects = async () => {
  return prisma.project.findMany({
    orderBy: { name: 'asc' },
    include: {
      client: true,
    },
  });
};

/**
 * Get a single project by ID.
 * @param {string} id
 */
const getProjectById = async (id) => {
  return prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
    },
  });
};

/**
 * Update a project by ID.
 * @param {string} id
 * @param {object} data
 */
const updateProject = async (id, data) => {
  if (data.clientId !== undefined) {
    await checkClientExists(data.clientId);
  }

  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.startDate !== undefined) {
    updateData.startDate = data.startDate ? new Date(data.startDate) : null;
  }
  if (data.deadline !== undefined) {
    updateData.deadline = data.deadline ? new Date(data.deadline) : null;
  }
  if (data.clientId !== undefined) updateData.clientId = data.clientId;

  return prisma.project.update({
    where: { id },
    data: updateData,
    include: {
      client: true,
    },
  });
};

/**
 * Delete a project by ID.
 * @param {string} id
 */
const deleteProject = async (id) => {
  return prisma.project.delete({
    where: { id },
    include: {
      client: true,
    },
  });
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
