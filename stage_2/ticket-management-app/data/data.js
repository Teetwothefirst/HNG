// ============================================
// MOCK DATA STRUCTURES FOR TICKET MANAGEMENT
// ============================================

// ==================
// USER DATA
// ==================

export const mockUsers = [
  {
    id: 'user_001',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123', // In real app, this would be hashed
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'user_002',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'test123',
    createdAt: '2024-01-20T14:20:00Z'
  }
];

// ==================
// SESSION TOKEN STRUCTURE
// ==================

export const sessionTokenStructure = {
  userId: 'user_001',
  email: 'demo@example.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token',
  timestamp: Date.now(),
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
};

// ==================
// TICKET DATA
// ==================

export const mockTickets = [
  {
    id: 'ticket_001',
    title: 'Fix login authentication bug',
    description: 'Users are experiencing issues when trying to log in with special characters in their passwords. Need to investigate and fix the validation logic.',
    status: 'open',
    priority: 'high',
    createdBy: 'user_001',
    assignedTo: null,
    createdAt: '2024-10-20T09:15:00Z',
    updatedAt: '2024-10-20T09:15:00Z',
    tags: ['bug', 'authentication', 'urgent']
  },
  {
    id: 'ticket_002',
    title: 'Implement dark mode theme',
    description: 'Add a dark mode toggle to the application. Should persist user preference and apply across all pages.',
    status: 'in_progress',
    priority: 'medium',
    createdBy: 'user_001',
    assignedTo: 'user_002',
    createdAt: '2024-10-18T14:30:00Z',
    updatedAt: '2024-10-21T11:20:00Z',
    tags: ['feature', 'ui', 'enhancement']
  },
  {
    id: 'ticket_003',
    title: 'Update API documentation',
    description: 'The API documentation needs to be updated with the latest endpoints and authentication methods.',
    status: 'closed',
    priority: 'low',
    createdBy: 'user_002',
    assignedTo: 'user_001',
    createdAt: '2024-10-15T08:00:00Z',
    updatedAt: '2024-10-19T16:45:00Z',
    resolvedAt: '2024-10-19T16:45:00Z',
    tags: ['documentation']
  },
  {
    id: 'ticket_004',
    title: 'Performance optimization for dashboard',
    description: 'Dashboard loads slowly when there are many tickets. Need to implement pagination and lazy loading.',
    status: 'open',
    priority: 'high',
    createdBy: 'user_001',
    assignedTo: 'user_001',
    createdAt: '2024-10-22T10:00:00Z',
    updatedAt: '2024-10-22T10:00:00Z',
    tags: ['performance', 'optimization']
  },
  {
    id: 'ticket_005',
    title: 'Add email notifications',
    description: 'Send email notifications when tickets are created, updated, or resolved.',
    status: 'in_progress',
    priority: 'medium',
    createdBy: 'user_002',
    assignedTo: 'user_002',
    createdAt: '2024-10-19T13:20:00Z',
    updatedAt: '2024-10-23T09:30:00Z',
    tags: ['feature', 'notifications']
  },
  {
    id: 'ticket_006',
    title: 'Fix responsive layout on mobile',
    description: 'The ticket list view breaks on mobile devices below 375px width.',
    status: 'closed',
    priority: 'medium',
    createdBy: 'user_001',
    assignedTo: 'user_001',
    createdAt: '2024-10-17T11:45:00Z',
    updatedAt: '2024-10-18T15:30:00Z',
    resolvedAt: '2024-10-18T15:30:00Z',
    tags: ['bug', 'responsive', 'ui']
  }
];

// ==================
// TICKET STATUS OPTIONS
// ==================

export const statusOptions = [
  { value: 'open', label: 'Open', color: '#10B981', bgColor: '#ECFDF5' },
  { value: 'in_progress', label: 'In Progress', color: '#F59E0B', bgColor: '#FFFBEB' },
  { value: 'closed', label: 'Closed', color: '#64748B', bgColor: '#F8FAFC' }
];

// ==================
// PRIORITY OPTIONS
// ==================

export const priorityOptions = [
  { value: 'low', label: 'Low', color: '#6B7280' },
  { value: 'medium', label: 'Medium', color: '#3B82F6' },
  { value: 'high', label: 'High', color: '#EF4444' }
];

// ==================
// VALIDATION RULES
// ==================

export const validationRules = {
  ticket: {
    title: {
      required: true,
      minLength: 3,
      maxLength: 100,
      message: 'Title must be between 3 and 100 characters'
    },
    description: {
      required: false,
      maxLength: 500,
      message: 'Description must not exceed 500 characters'
    },
    status: {
      required: true,
      enum: ['open', 'in_progress', 'closed'],
      message: 'Status must be one of: open, in_progress, closed'
    },
    priority: {
      required: false,
      enum: ['low', 'medium', 'high'],
      message: 'Priority must be one of: low, medium, high'
    }
  },
  auth: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    password: {
      required: true,
      minLength: 8,
      message: 'Password must be at least 8 characters'
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'Name must be between 2 and 50 characters'
    }
  }
};

// ==================
// ERROR MESSAGES
// ==================

export const errorMessages = {
  auth: {
    invalidCredentials: 'Invalid email or password. Please try again.',
    sessionExpired: 'Your session has expired. Please log in again.',
    unauthorized: 'You must be logged in to access this page.',
    emailExists: 'An account with this email already exists.',
    weakPassword: 'Password must be at least 8 characters long.',
    invalidEmail: 'Please enter a valid email address.',
    fieldRequired: 'This field is required.',
    passwordMismatch: 'Passwords do not match.'
  },
  tickets: {
    loadFailed: 'Failed to load tickets. Please try again.',
    createFailed: 'Failed to create ticket. Please try again.',
    updateFailed: 'Failed to update ticket. Please try again.',
    deleteFailed: 'Failed to delete ticket. Please try again.',
    notFound: 'Ticket not found.',
    invalidStatus: 'Invalid ticket status. Must be: open, in_progress, or closed.',
    titleRequired: 'Ticket title is required.',
    titleTooLong: 'Ticket title must not exceed 100 characters.',
    descriptionTooLong: 'Description must not exceed 500 characters.'
  },
  general: {
    networkError: 'Network error. Please check your connection.',
    unknownError: 'Something went wrong. Please try again.',
    notFound: 'The requested resource was not found.'
  }
};

// ==================
// SUCCESS MESSAGES
// ==================

export const successMessages = {
  auth: {
    loginSuccess: 'Welcome back! Login successful.',
    signupSuccess: 'Account created successfully! Welcome aboard.',
    logoutSuccess: 'You have been logged out successfully.'
  },
  tickets: {
    createSuccess: 'Ticket created successfully!',
    updateSuccess: 'Ticket updated successfully!',
    deleteSuccess: 'Ticket deleted successfully!',
    statusChanged: 'Ticket status updated.'
  }
};

// ==================
// DASHBOARD STATS STRUCTURE
// ==================

export const dashboardStatsStructure = {
  totalTickets: 0,
  openTickets: 0,
  inProgressTickets: 0,
  closedTickets: 0,
  highPriorityTickets: 0,
  recentActivity: []
};

// ==================
// HELPER FUNCTIONS
// ==================

// Calculate dashboard stats from tickets
export function calculateStats(tickets) {
  return {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    inProgressTickets: tickets.filter(t => t.status === 'in_progress').length,
    closedTickets: tickets.filter(t => t.status === 'closed').length,
    highPriorityTickets: tickets.filter(t => t.priority === 'high').length
  };
}

// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Generate unique ID
export function generateId(prefix = 'ticket') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Validate form field
export function validateField(value, rules) {
  const errors = [];
  
  if (rules.required && !value) {
    errors.push(rules.message || 'This field is required');
    return errors;
  }
  
  if (value) {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(rules.message || `Minimum length is ${rules.minLength}`);
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(rules.message || `Maximum length is ${rules.maxLength}`);
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.message || 'Invalid format');
    }
    
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push(rules.message || 'Invalid value');
    }
  }
  
  return errors;
}

// ==================
// LOCALSTORAGE KEYS
// ==================

export const STORAGE_KEYS = {
  SESSION: 'ticketapp_session',
  TICKETS: 'ticketapp_tickets',
  USERS: 'ticketapp_users',
  THEME: 'ticketapp_theme'
};

// ==================
// API ENDPOINTS (Mock)
// ==================

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh'
  },
  tickets: {
    list: '/api/tickets',
    create: '/api/tickets',
    read: '/api/tickets/:id',
    update: '/api/tickets/:id',
    delete: '/api/tickets/:id'
  }
};