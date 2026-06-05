import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject Bearer token to requests if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry / unauthenticated responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Let components trigger logout / redirect via context if needed
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Expected { message, data: { token, user: { id, email, role } } }
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data; // Expected { message, data: { id, email, role } }
  },
};

export const clientAPI = {
  getClients: async () => {
    const response = await api.get('/clients');
    return response.data;
  },
  getClientById: async (id) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },
  createClient: async (clientData) => {
    const response = await api.post('/clients', clientData);
    return response.data;
  },
  updateClient: async (id, clientData) => {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  },
  deleteClient: async (id) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
};

export const projectAPI = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

export const invoiceAPI = {
  getInvoices: async () => {
    const response = await api.get('/invoices');
    return response.data;
  },
  getInvoiceById: async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },
  createInvoice: async (invoiceData) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },
  updateInvoice: async (id, invoiceData) => {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },
  deleteInvoice: async (id) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },
};

export default api;
