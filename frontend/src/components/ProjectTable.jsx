import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const statusBadgeStyles = {
  not_started: 'bg-gray-100 text-gray-800 border-gray-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  waiting_feedback: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  revision: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
};

const statusLabels = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  waiting_feedback: 'Waiting Feedback',
  revision: 'Revision',
  completed: 'Completed',
};

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  const [confirmId, setConfirmId] = useState(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        No projects found.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div>
                  <p className="font-semibold text-gray-900">{project.name}</p>
                  {project.description && (
                    <p className="text-xs text-gray-400 font-normal truncate max-w-xs">{project.description}</p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.client ? project.client.name : 'Unknown Client'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeStyles[project.status] || 'bg-gray-100 text-gray-800'}`}>
                  {statusLabels[project.status] || project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(project.deadline)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button
                  onClick={() => {
                    setConfirmId(null);
                    onEdit(project);
                  }}
                  className="text-primary hover:text-primary-dark inline-flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </button>
                {confirmId === project.id ? (
                  <span className="inline-flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onDelete(project.id);
                        setConfirmId(null);
                      }}
                      className="text-red-700 hover:text-red-900 bg-red-50 px-2 py-1 rounded border border-red-200 inline-flex items-center text-xs font-semibold"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-gray-500 hover:text-gray-700 text-xs font-normal"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={() => setConfirmId(project.id)}
                    className="text-red-600 hover:text-red-800 inline-flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
