import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Menu, X, LogOut, Plus, Edit2, Trash2, Home, Ticket } from 'lucide-react';

// Utility Functions
const generateId = () => `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getStoredData = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage error:', error);
  }
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : AlertCircle;

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}>
      <Icon size={24} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <X size={20} />
      </button>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
    ))}
  </div>
);

// Main App Component
export default function TicketManagementApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session');
    if (session) {
      setIsAuthenticated(true);
      const storedTickets = getStoredData('ticketapp_tickets', []);
      setTickets(storedTickets);
    }
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    setIsAuthenticated(false);
    setCurrentPage('landing');
    addToast('Logged out successfully', 'success');
  };

  const navigateTo = (page) => {
    if ((page === 'dashboard' || page === 'tickets') && !isAuthenticated) {
      setCurrentPage('auth');
      addToast('Please log in to access this page', 'error');
      return;
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('landing')}>
            <Ticket className="text-blue-600" size={28} />
            <span className="text-xl font-bold text-gray-900">TicketFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigateTo('landing')} className="text-gray-700 hover:text-blue-600 transition">Home</button>
            {isAuthenticated && (
              <>
                <button onClick={() => navigateTo('dashboard')} className="text-gray-700 hover:text-blue-600 transition">Dashboard</button>
                <button onClick={() => navigateTo('tickets')} className="text-gray-700 hover:text-blue-600 transition">Tickets</button>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <button onClick={() => navigateTo('auth')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
            )}
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <button onClick={() => navigateTo('landing')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Home</button>
            {isAuthenticated ? (
              <>
                <button onClick={() => navigateTo('dashboard')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Dashboard</button>
                <button onClick={() => navigateTo('tickets')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Tickets</button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded">Logout</button>
              </>
            ) : (
              <button onClick={() => navigateTo('auth')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Login</button>
            )}
          </div>
        )}
      </div>
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  );

  // Landing Page
  const LandingPage = () => (
    <div className="flex-1">
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-yellow-400 opacity-20 rounded-full"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Manage Tickets Effortlessly</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Track, organize, and resolve tickets with our powerful management system</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigateTo('auth')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">Get Started</button>
              <button onClick={() => { setAuthMode('login'); navigateTo('auth'); }} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg">Login</button>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C360,20 720,100 1440,64 L1440,120 L0,120 Z" fill="white"></path>
        </svg>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Create Tickets', desc: 'Easily create and categorize tickets with detailed information' },
              { title: 'Track Progress', desc: 'Monitor ticket status from open to resolved in real-time' },
              { title: 'Team Collaboration', desc: 'Work together seamlessly to resolve issues faster' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Ticket className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Auth Page
  const AuthPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (authMode === 'signup' && !formData.name) newErrors.name = 'Name is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) {
        addToast('Please fix the errors in the form', 'error');
        return;
      }

      const token = `token_${Date.now()}`;
      localStorage.setItem('ticketapp_session', token);
      setIsAuthenticated(true);
      addToast(`${authMode === 'login' ? 'Logged in' : 'Account created'} successfully!`, 'success');
      navigateTo('dashboard');
    };

    return (
      <div className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Ticket className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl font-bold text-gray-900">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-600 mt-2">{authMode === 'login' ? 'Log in to continue' : 'Sign up to get started'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setErrors({}); }} className="text-blue-600 hover:underline">
                {authMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Page
  const DashboardPage = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter((t) => t.status === 'open').length,
      inProgress: tickets.filter((t) => t.status === 'in_progress').length,
      closed: tickets.filter((t) => t.status === 'closed').length
    };

    return (
      <div className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Overview of your ticket management system</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Tickets', value: stats.total, color: 'bg-blue-500' },
              { label: 'Open', value: stats.open, color: 'bg-green-500' },
              { label: 'In Progress', value: stats.inProgress, color: 'bg-amber-500' },
              { label: 'Closed', value: stats.closed, color: 'bg-gray-500' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                  <Ticket className="text-white" size={24} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigateTo('tickets')} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                <Ticket size={20} />
                View All Tickets
              </button>
              <button onClick={() => { navigateTo('tickets'); setTimeout(() => setEditingTicket({}), 100); }} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold">
                <Plus size={20} />
                Create New Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tickets Page
  const TicketsPage = () => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'open', priority: 'medium' });
    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      if (editingTicket) {
        if (editingTicket.id) {
          setFormData(editingTicket);
        } else {
          setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
        }
        setShowForm(true);
      }
    }, [editingTicket]);

    const validateTicket = () => {
      const newErrors = {};
      if (!formData.title || formData.title.trim() === '') newErrors.title = 'Title is required';
      if (!formData.status) newErrors.status = 'Status is required';
      if (!['open', 'in_progress', 'closed'].includes(formData.status)) newErrors.status = 'Invalid status value';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateTicket()) {
        addToast('Please fix the errors in the form', 'error');
        return;
      }

      if (editingTicket && editingTicket.id) {
        const updatedTickets = tickets.map((t) => (t.id === editingTicket.id ? { ...formData, id: editingTicket.id } : t));
        setTickets(updatedTickets);
        setStoredData('ticketapp_tickets', updatedTickets);
        addToast('Ticket updated successfully', 'success');
      } else {
        const newTicket = { ...formData, id: generateId(), createdAt: new Date().toISOString() };
        const updatedTickets = [...tickets, newTicket];
        setTickets(updatedTickets);
        setStoredData('ticketapp_tickets', updatedTickets);
        addToast('Ticket created successfully', 'success');
      }

      setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
      setEditingTicket(null);
      setShowForm(false);
      setErrors({});
    };

    const handleDelete = (ticketId) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        const updatedTickets = tickets.filter((t) => t.id !== ticketId);
        setTickets(updatedTickets);
        setStoredData('ticketapp_tickets', updatedTickets);
        addToast('Ticket deleted successfully', 'success');
      }
    };

    const getStatusColor = (status) => {
      if (status === 'open') return 'bg-green-100 text-green-800 border-green-300';
      if (status === 'in_progress') return 'bg-amber-100 text-amber-800 border-amber-300';
      return 'bg-gray-100 text-gray-800 border-gray-300';
    };

    return (
      <div className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Ticket Management</h1>
              <p className="text-gray-600">Create, view, edit, and delete tickets</p>
            </div>
            <button onClick={() => { setEditingTicket({}); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              <Plus size={20} />
              New Ticket
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingTicket && editingTicket.id ? 'Edit Ticket' : 'Create New Ticket'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    {editingTicket && editingTicket.id ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingTicket(null); setErrors({}); }} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Ticket className="text-gray-400 mx-auto mb-4" size={64} />
                <p className="text-gray-500 text-lg">No tickets yet. Create your first ticket!</p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingTicket(ticket)} className="text-blue-600 hover:text-blue-800">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(ticket.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                  {ticket.description && <p className="text-gray-600 mb-4 line-clamp-3">{ticket.description}</p>}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="capitalize">Priority: {ticket.priority}</span>
                    {ticket.createdAt && <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Header />

      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'auth' && <AuthPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'tickets' && <TicketsPage />}

      <Footer />
    </div>
  );
}