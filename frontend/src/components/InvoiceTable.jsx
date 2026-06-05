import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const InvoiceTable = ({ invoices, onEdit, onDelete, onTogglePaid }) => {
  const [confirmId, setConfirmId] = useState(null);

  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        No invoices found.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice Number</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid Status</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {invoice.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {invoice.client ? invoice.client.name : 'Unknown Client'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(invoice.dueDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => onTogglePaid(invoice)}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors cursor-pointer select-none ${
                    invoice.paid
                      ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                  }`}
                  title="Click to toggle status"
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${invoice.paid ? 'bg-green-500' : 'bg-red-500'}`} />
                  {invoice.paid ? 'Paid' : 'Unpaid'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button
                  onClick={() => {
                    setConfirmId(null);
                    onEdit(invoice);
                  }}
                  className="text-primary hover:text-primary-dark inline-flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </button>
                {confirmId === invoice.id ? (
                  <span className="inline-flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onDelete(invoice.id);
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
                    onClick={() => setConfirmId(invoice.id)}
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

export default InvoiceTable;
