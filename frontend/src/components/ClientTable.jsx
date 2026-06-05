import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const ClientTable = ({ clients, onEdit, onDelete }) => {
  const [confirmId, setConfirmId] = useState(null);

  if (!clients || clients.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        No clients found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button
                  onClick={() => {
                    setConfirmId(null);
                    onEdit(client);
                  }}
                  className="text-primary hover:text-primary-dark inline-flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </button>
                {confirmId === client.id ? (
                  <span className="inline-flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onDelete(client.id);
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
                    onClick={() => setConfirmId(client.id)}
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

export default ClientTable;
