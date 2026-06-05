import React, { useState, useEffect } from 'react';
import { clientAPI } from '../services/api';
import ClientTable from '../components/ClientTable';
import { Plus, X } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editClient, setEditClient] = useState(null); // client object if editing, null if creating
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await clientAPI.getClients();
      setClients(res.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
      setError('Failed to load clients. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenCreate = () => {
    setEditClient(null);
    setFormData({ name: '', email: '', phone: '' });
    setValidationError('');
    setIsOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditClient(client);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
    });
    setValidationError('');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValidationError('');
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name.trim()) {
      setValidationError('Name is required');
      return;
    }
    if (!email.trim()) {
      setValidationError('Email is required');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    try {
      if (editClient) {
        // Edit flow
        await clientAPI.updateClient(editClient.id, {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
        });
        setSuccessMsg('Client updated successfully');
      } else {
        // Create flow
        await clientAPI.createClient({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
        });
        setSuccessMsg('Client created successfully');
      }
      handleClose();
      fetchClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setValidationError(err.response?.data?.message || 'Failed to save client. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await clientAPI.deleteClient(id);
      setSuccessMsg('Client deleted successfully');
      fetchClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete client.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-sm text-gray-500 mt-1">Manage corporate and individual clients</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

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
          <div className="text-gray-500 font-medium">Loading clients...</div>
        </div>
      ) : (
        <ClientTable
          clients={clients}
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
                {editClient ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {validationError && (
                <div className="rounded-md bg-red-50 p-3 border border-red-200 text-xs font-semibold text-red-700">
                  {validationError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="contact@acme.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="555-0199"
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

export default Clients;
