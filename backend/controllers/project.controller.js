const projectService = require('../services/project.service');

const VALID_STATUSES = ['not_started', 'in_progress', 'waiting_feedback', 'revision', 'completed'];

const toProjectData = (project) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  status: project.status,
  startDate: project.startDate,
  deadline: project.deadline,
  clientId: project.clientId,
  client: project.client ? {
    id: project.client.id,
    name: project.client.name,
    email: project.client.email,
    phone: project.client.phone,
  } : undefined,
});

const createProject = async (req, res) => {
  try {
    const { name, description, status, startDate, deadline, clientId } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!clientId || !String(clientId).trim()) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid project status' });
    }

    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: 'Invalid start date format' });
    }

    if (deadline && isNaN(Date.parse(deadline))) {
      return res.status(400).json({ message: 'Invalid deadline format' });
    }

    const project = await projectService.createProject({
      name: String(name).trim(),
      description: description ? String(description).trim() : null,
      status: status || 'not_started',
      startDate: startDate || null,
      deadline: deadline || null,
      clientId: String(clientId).trim(),
    });

    return res.status(201).json({
      message: 'Project created successfully',
      data: toProjectData(project),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error('Create project error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();

    return res.status(200).json({
      message: 'Projects retrieved successfully',
      data: projects.map(toProjectData),
    });
  } catch (error) {
    console.error('Get projects error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const project = await projectService.getProjectById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({
      message: 'Project retrieved successfully',
      data: toProjectData(project),
    });
  } catch (error) {
    console.error('Get project error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, startDate, deadline, clientId } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    if (
      name === undefined &&
      description === undefined &&
      status === undefined &&
      startDate === undefined &&
      deadline === undefined &&
      clientId === undefined
    ) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid project status' });
    }

    if (startDate !== undefined && startDate !== null && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: 'Invalid start date format' });
    }

    if (deadline !== undefined && deadline !== null && isNaN(Date.parse(deadline))) {
      return res.status(400).json({ message: 'Invalid deadline format' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = String(name).trim();
    if (description !== undefined) updateData.description = description ? String(description).trim() : null;
    if (status !== undefined) updateData.status = status;
    if (startDate !== undefined) updateData.startDate = startDate || null;
    if (deadline !== undefined) updateData.deadline = deadline || null;
    if (clientId !== undefined) updateData.clientId = String(clientId).trim();

    const project = await projectService.updateProject(id, updateData);

    return res.status(200).json({
      message: 'Project updated successfully',
      data: toProjectData(project),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Project not found' });
    }
    console.error('Update project error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const project = await projectService.deleteProject(id);

    return res.status(200).json({
      message: 'Project deleted successfully',
      data: toProjectData(project),
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Project not found' });
    }
    console.error('Delete project error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
