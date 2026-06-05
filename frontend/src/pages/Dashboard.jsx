import React, { useState, useEffect } from 'react';
import { clientAPI, projectAPI, invoiceAPI } from '../services/api';
import { Users, FolderKanban, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [invoicesCount, setInvoicesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
          clientAPI.getClients(),
          projectAPI.getProjects(),
          invoiceAPI.getInvoices(),
        ]);

        setClientsCount(clientsRes.data.length);
        setProjectsCount(projectsRes.data.length);
        setInvoicesCount(invoicesRes.data.length);
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
        setError('Failed to load dashboard metrics. Please check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500 font-medium">Loading metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 border border-red-200">
        <p className="text-sm text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  const stats = [
    { name: 'Total Clients', value: clientsCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/clients' },
    { name: 'Total Projects', value: projectsCount, icon: FolderKanban, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/projects' },
    { name: 'Total Invoices', value: invoicesCount, icon: FileText, color: 'text-green-600', bg: 'bg-green-50', link: '/invoices' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of SP Web Solutions management entities</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg border border-gray-200 flex flex-col justify-between">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.name}</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link to={stat.link} className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center">
                Manage all
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
