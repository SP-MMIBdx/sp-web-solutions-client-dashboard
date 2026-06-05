import React, { useState, useEffect } from 'react';
import { projectAPI, clientAPI } from '../services/api';
import ProjectTable from '../components/ProjectTable';
import { Plus, X } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'not_started',
    startDate: '',
    deadline: '',
    clientId: '',
  });
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProjectsAndClients = async () => {
    try {
      setLoading(true);
      const [projectsRes, clientsRes] = await Promise.all([
        projectAPI.getProjects(),
        clientAPI.getClients(),
      ]);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
    } catch (err) {
      console.error('Failed to load projects/clients:', err);
      setError('Failed to load project details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndClients();
  }, []);

  const handleOpenCreate = () => {
    setEditProject(null);
    setFormData({
      name: '',
      description: '',
      status: 'not_started',
      startDate: '',
      deadline: '',
      clientId: clients.length > 0 ? clients[0].id : '',
    });
    setValidationError('');
    setIsOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditProject(project);
    
    // Format dates to YYYY-MM-DD for standard html date inputs
    const formatDateInput = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toISOString().split('T')[0];
    };

    setFormData({
      name: project.name || '',
      description: project.description || '',
      status: project.status || 'not_started',
      startDate: formatDateInput(project.startDate),
      deadline: formatDateInput(project.deadline),
      clientId: project.clientId || '',
    });
    setValidationError('');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, status, startDate, deadline, clientId } = formData;

    if (!name.trim()) {
      setValidationError('Name is required');
      return;
    }
    if (!clientId) {
      setValidationError('Please select a client');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      status,
      startDate: startDate || null,
      deadline: deadline || null,
      clientId,
    };

    try {
      if (editProject) {
        await projectAPI.updateProject(editProject.id, payload);
        setSuccessMsg('Project updated successfully');
      } else {
        await projectAPI.createProject(payload);
        setSuccessMsg('Project created successfully');
      }
      handleClose();
      fetchProjectsAndClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setValidationError(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectAPI.deleteProject(id);
      setSuccessMsg('Project deleted successfully');
      fetchProjectsAndClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete project.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Track deadlines and status of customer operations</p>
        </div>
        <button
          onClick={handleOpenCreate}
          disabled={clients.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          title={clients.length === 0 ? 'Create a client first before creating a project' : ''}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {clients.length === 0 && !loading && (
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
          <p className="text-sm text-yellow-700 font-medium">
            You must create at least one Client before you can manage Projects.
          </p>
        </div>
      )}

      {successMsg && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <p className="text-sm text-green-700 font-medium">{successMsg}</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 font-medium">Loading projects...</div>
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      {/* CRUD Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-gray-150 flex items-center justify-between bg-gray-50">
              <h3 className="text-base font-bold text-gray-900">
                {editProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {validationError && (
                <div className="rounded-md bg-red-50 p-3 border border-red-200 text-xs font-semibold text-red-700">
                  {validationError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="Website Redesign"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Client *</label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                >
                  <option value="" disabled>Select a client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_feedback">Waiting Feedback</option>
                  <option value="revision">Revision</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="Additional project details..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors disabled:bg-primary/50"
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
