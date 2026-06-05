import React, { useState, useEffect } from 'react';
import { invoiceAPI, clientAPI } from '../services/api';
import InvoiceTable from '../components/InvoiceTable';
import { Plus, X } from 'lucide-react';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    dueDate: '',
    paid: false,
    description: '',
    clientId: '',
  });
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchInvoicesAndClients = async () => {
    try {
      setLoading(true);
      const [invoicesRes, clientsRes] = await Promise.all([
        invoiceAPI.getInvoices(),
        clientAPI.getClients(),
      ]);
      setInvoices(invoicesRes.data);
      setClients(clientsRes.data);
    } catch (err) {
      console.error('Failed to load invoices/clients:', err);
      setError('Failed to load invoice details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoicesAndClients();
  }, []);

  const handleOpenCreate = () => {
    setEditInvoice(null);
    setFormData({
      invoiceNumber: '',
      amount: '',
      dueDate: '',
      paid: false,
      description: '',
      clientId: clients.length > 0 ? clients[0].id : '',
    });
    setValidationError('');
    setIsOpen(true);
  };

  const handleOpenEdit = (invoice) => {
    setEditInvoice(invoice);
    
    // Format dates to YYYY-MM-DD for standard html date inputs
    const formatDateInput = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toISOString().split('T')[0];
    };

    setFormData({
      invoiceNumber: invoice.invoiceNumber || '',
      amount: invoice.amount !== undefined ? invoice.amount.toString() : '',
      dueDate: formatDateInput(invoice.dueDate),
      paid: !!invoice.paid,
      description: invoice.description || '',
      clientId: invoice.clientId || '',
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
    const { invoiceNumber, amount, dueDate, paid, description, clientId } = formData;

    if (!invoiceNumber.trim()) {
      setValidationError('Invoice number is required');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setValidationError('Amount must be a numeric value greater than zero');
      return;
    }
    if (!dueDate) {
      setValidationError('Due date is required');
      return;
    }
    if (!clientId) {
      setValidationError('Please select a client');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    const payload = {
      invoiceNumber: invoiceNumber.trim(),
      amount: Number(amount),
      dueDate,
      paid,
      description: description.trim() || null,
      clientId,
    };

    try {
      if (editInvoice) {
        await invoiceAPI.updateInvoice(editInvoice.id, payload);
        setSuccessMsg('Invoice updated successfully');
      } else {
        await invoiceAPI.createInvoice(payload);
        setSuccessMsg('Invoice created successfully');
      }
      handleClose();
      fetchInvoicesAndClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setValidationError(err.response?.data?.message || 'Failed to save invoice.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePaid = async (invoice) => {
    try {
      await invoiceAPI.updateInvoice(invoice.id, {
        paid: !invoice.paid,
      });
      setSuccessMsg(`Invoice ${invoice.invoiceNumber} payment status updated`);
      fetchInvoicesAndClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Toggle paid error:', err);
      setError(err.response?.data?.message || 'Failed to update payment status.');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await invoiceAPI.deleteInvoice(id);
      setSuccessMsg('Invoice deleted successfully');
      fetchInvoicesAndClients();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete invoice.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <p className="text-sm text-gray-500 mt-1">Manage billing, payments, and due dates</p>
        </div>
        <button
          onClick={handleOpenCreate}
          disabled={clients.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          title={clients.length === 0 ? 'Create a client first before creating an invoice' : ''}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Invoice
        </button>
      </div>

      {clients.length === 0 && !loading && (
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
          <p className="text-sm text-yellow-700 font-medium">
            You must create at least one Client before you can manage Invoices.
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
          <div className="text-gray-500 font-medium">Loading invoices...</div>
        </div>
      ) : (
        <InvoiceTable
          invoices={invoices}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onTogglePaid={handleTogglePaid}
        />
      )}

      {/* CRUD Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-gray-150 flex items-center justify-between bg-gray-50">
              <h3 className="text-base font-bold text-gray-900">
                {editInvoice ? 'Edit Invoice' : 'Add New Invoice'}
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
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Invoice Number *</label>
                <input
                  type="text"
                  required
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="INV-2026-001"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Amount (EUR) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                    placeholder="1500.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="paid-checkbox"
                  checked={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                  className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="paid-checkbox" className="text-sm font-semibold text-gray-700 select-none">
                  Mark as Paid
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder="Billing items or notes..."
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

export default Invoices;
