<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';

// --- 0. ICON COMPONENTS (Replacement for lucide-react) ---
// We define simple functional components for the icons used throughout the app.
const Icon = (name, size, color) => {
  // Simple functional component creator for Lucide icons.
  const icons = {
    AlertCircle: `<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4"/><path d="M12 16h.01"/>`,
    CheckCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>`,
    X: `<path d="M18 6L6 18"/><path d="M6 6l12 12"/>`,
    Menu: `<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>`,
    LogOut: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
    Plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    Edit2: `<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>`,
    Trash2: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>`,
    Home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    Clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v1h8V3a1 1 0 0 0-1-1z"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${color || ''}"><title>${name}</title>${icons[name]}</svg>`;
};

const AlertCircle = { template: Icon('AlertCircle', 20) };
const CheckCircle = { template: Icon('CheckCircle', 20) };
const X = { template: Icon('X', 16) };
const LogOut = { template: Icon('LogOut', 18) };
const Plus = { template: Icon('Plus', 20) };
const Edit2 = { template: Icon('Edit2', 14) };
const Trash2 = { template: Icon('Trash2', 14) };
const Home = { template: Icon('Home', 18) };
const Clipboard = { template: Icon('Clipboard', 24) };
const ClipboardSmall = { template: Icon('Clipboard', 20) };

// --- 1. Toast Notification Component (Vue Equivalent) ---
const Toast = {
  props: ['message', 'type'],
  emits: ['close'],
  setup(props, { emit }) {
    onMounted(() => {
      // Replaces React's useEffect timer
      const timer = setTimeout(() => {
        emit('close');
      }, 3000);
      // Clean up function returned by onMounted for unmounting
      return () => clearTimeout(timer);
    });

    const iconComponent = computed(() => props.type === 'error' ? AlertCircle : CheckCircle);
    const bgColorClass = computed(() => props.type === 'error' ? 'bg-red-500' : 'bg-green-500');

    return { iconComponent, bgColorClass, emit };
  },
  template: `
    <div :class="bgColorClass"
      class="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white">
      <component :is="iconComponent" size="20" />
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="ml-2">
        <X size="16" />
      </button>
    </div>
  `
};

// --- 2. Landing Page Component (Vue Equivalent) ---
const LandingPage = {
  props: ['onNavigate'],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-blue-600">TicketFlow</h1>
          <button
            @click="onNavigate('login')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
          >
            Login
          </button>
        </div>
      </header>

      <section class="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div class="max-w-[1440px] mx-auto px-4 py-20 relative z-10">
          <div class="max-w-2xl">
            <h2 class="text-5xl font-bold mb-6">Manage Your Tickets Effortlessly</h2>
            <p class="text-xl mb-8 text-blue-100">
              Track, organize, and resolve tickets with our powerful management system. 
              Simple, secure, and built for teams.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="onNavigate('signup')"
                class="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-150 shadow-md"
              >
                Get Started
              </button>
              <button
                @click="onNavigate('login')"
                class="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-150"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        
        <div class="absolute top-10 right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 hidden lg:block"></div>
        
        <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#f9fafb"
          />
        </svg>
      </section>

      <section class="py-16">
        <div class="max-w-[1440px] mx-auto px-4">
          <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose TicketFlow?</h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle :size="24" class="text-green-600" />
              </div>
              <h4 class="text-xl font-bold mb-3">Easy Tracking</h4>
              <p class="text-gray-600">Monitor all your tickets in one place with real-time updates and status changes.</p>
            </div>
            
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clipboard :size="24" class="text-blue-600" />
              </div>
              <h4 class="text-xl font-bold mb-3">Full Control</h4>
              <p class="text-gray-600">Create, edit, and delete tickets with complete CRUD functionality.</p>
            </div>
            
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Home :size="24" class="text-purple-600" />
              </div>
              <h4 class="text-xl font-bold mb-3">Secure Access</h4>
              <p class="text-gray-600">Protected authentication ensures your data stays safe and private.</p>
            </div>
          </div>
        </div>
      </section>

      <div class="fixed bottom-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 hidden lg:block"></div>

      <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-[1440px] mx-auto px-4 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
};

// --- 3. Auth Component (Vue Equivalent) ---
const AuthPage = {
  props: ['mode', 'onNavigate', 'onLogin'],
  setup(props) {
    // Replaces useState for form data and errors
    const formData = reactive({ email: '', password: '', name: '' });
    const errors = reactive({});
    const toast = ref(null); // Replaces useState for toast

    const validate = () => {
      // Clear previous errors
      Object.keys(errors).forEach(key => delete errors[key]);

      let isValid = true;

      if (!formData.email) { errors.email = 'Email is required'; isValid = false; }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) { errors.email = 'Email is invalid'; isValid = false; }
      
      if (!formData.password) { errors.password = 'Password is required'; isValid = false; }
      else if (formData.password.length < 6) { errors.password = 'Password must be at least 6 characters'; isValid = false; }
      
      if (props.mode === 'signup' && !formData.name) { errors.name = 'Name is required'; isValid = false; }
      
      return isValid;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;

      if (props.mode === 'login') {
        const stored = localStorage.getItem('ticketapp_user');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.email === formData.email && user.password === formData.password) {
            localStorage.setItem('ticketapp_session', JSON.stringify({ token: 'mock_token_' + Date.now(), email: formData.email }));
            props.onLogin();
            return;
          }
        }
        toast.value = { message: 'Invalid credentials. Please try again.', type: 'error' };
      } else {
        localStorage.setItem('ticketapp_user', JSON.stringify(formData));
        localStorage.setItem('ticketapp_session', JSON.stringify({ token: 'mock_token_' + Date.now(), email: formData.email }));
        toast.value = { message: 'Account created successfully!', type: 'success' };
        setTimeout(() => props.onLogin(), 1000);
      }
    };

    return { formData, errors, toast, handleSubmit };
  },
  components: { Toast, AlertCircle, CheckCircle, X },
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
      
      <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01] my-8">
        <h2 class="text-3xl font-extrabold text-center mb-2 text-blue-700">
          {{ mode === 'login' ? 'Welcome Back' : 'Create Account' }}
        </h2>
        <p class="text-gray-600 text-center mb-6">
          {{ mode === 'login' ? 'Sign in to continue' : 'Get started with TicketFlow' }}
        </p>
        
        <form @submit="handleSubmit" class="space-y-4">
          <div v-if="mode === 'signup'">
            <label class="block text-sm font-semibold mb-1 text-gray-700">Name</label>
            <input
              type="text"
              v-model="formData.name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold mb-1 text-gray-700">Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold mb-1 text-gray-700">Password</label>
            <input
              type="password"
              v-model="formData.password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
          
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-bold transition duration-150 shadow-md hover:shadow-lg"
          >
            {{ mode === 'login' ? 'Sign In' : 'Sign Up' }}
          </button>
        </form>
        
        <p class="text-center mt-6 text-sm text-gray-600">
          {{ mode === 'login' ? "Don't have an account? " : "Already have an account? " }}
          <button
            @click="onNavigate(mode === 'login' ? 'signup' : 'login')"
            class="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
          >
            {{ mode === 'login' ? 'Sign Up' : 'Sign In' }}
          </button>
        </p>
        
        <button
          @click="onNavigate('landing')"
          class="w-full mt-4 text-gray-600 hover:text-gray-800 transition duration-150 text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  `
};

// --- 4. Dashboard Component (Vue Equivalent) ---
const Dashboard = {
  props: ['onNavigate', 'onLogout'],
  setup() {
    // Replaces useState
    const stats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 });

    // Replaces useEffect(..., [])
    onMounted(() => {
      const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
      stats.value = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress').length,
        closed: tickets.filter(t => t.status === 'closed').length
      };
    });

    return { stats };
  },
  components: { LogOut, ClipboardSmall, Home },
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-md">
        <div class="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-blue-600">TicketFlow Dashboard</h1>
          <button
            @click="onLogout"
            class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition duration-150"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </header>

      <div class="max-w-[1440px] mx-auto px-4 py-12">
        <h2 class="text-3xl font-extrabold mb-8 text-gray-800">Welcome Back!</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition duration-300">
            <p class="text-sm font-medium text-gray-600 mb-2">Total Tickets</p>
            <p class="text-4xl font-bold text-blue-600">{{ stats.total }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition duration-300">
            <p class="text-sm font-medium text-gray-600 mb-2">Open</p>
            <p class="text-4xl font-bold text-green-600">{{ stats.open }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition duration-300">
            <p class="text-sm font-medium text-gray-600 mb-2">In Progress</p>
            <p class="text-4xl font-bold text-amber-600">{{ stats.inProgress }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-400 hover:shadow-xl transition duration-300">
            <p class="text-sm font-medium text-gray-600 mb-2">Closed</p>
            <p class="text-4xl font-bold text-gray-600">{{ stats.closed }}</p>
          </div>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-2xl">
          <h3 class="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h3>
          <button
            @click="onNavigate('tickets')"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition duration-150"
          >
            <ClipboardSmall />
            Manage Tickets
          </button>
        </div>
      </div>

      <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-[1440px] mx-auto px-4 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
};

// --- 5. Ticket Management Component (Vue Equivalent) ---
const TicketManagement = {
  props: ['onNavigate', 'onLogout'],
  setup() {
    // Replaces useState for all component state
    const tickets = ref([]);
    const showForm = ref(false);
    const editingTicket = ref(null);
    const formData = reactive({ title: '', description: '', status: 'open', priority: 'medium' });
    const errors = reactive({});
    const toast = ref(null);
    const deleteConfirmId = ref(null); // Changed from deleteConfirm to avoid name clash with a prop/method if we used Options API

    const loadTickets = () => {
      const stored = localStorage.getItem('ticketapp_tickets');
      tickets.value = stored ? JSON.parse(stored) : [];
    };

    // Load tickets on mount (Replaces React useEffect)
    onMounted(loadTickets);

    const validate = () => {
      Object.keys(errors).forEach(key => delete errors[key]);
      let isValid = true;

      if (!formData.title.trim()) { errors.title = 'Title is required'; isValid = false; }
      if (!formData.status) { errors.status = 'Status is required'; isValid = false; }
      
      const validStatuses = ['open', 'in_progress', 'closed'];
      if (!validStatuses.includes(formData.status)) {
        errors.status = 'Status must be open, in_progress, or closed';
        isValid = false;
      }
      
      return isValid;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;

      let updatedTickets;
      if (editingTicket.value) {
        // Update ticket
        updatedTickets = tickets.value.map(t => t.id === editingTicket.value.id ? { ...formData, id: t.id } : t);
        toast.value = { message: 'Ticket updated successfully!', type: 'success' };
      } else {
        // Create new ticket
        const newTicket = { ...formData, id: Date.now().toString() };
        updatedTickets = [...tickets.value, newTicket];
        toast.value = { message: 'Ticket created successfully!', type: 'success' };
      }

      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      tickets.value = updatedTickets;
      resetForm();
    };

    const handleEdit = (ticket) => {
      editingTicket.value = ticket;
      // Manually set reactive object properties
      Object.assign(formData, ticket);
      showForm.value = true;
    };

    const handleDelete = (id) => {
      const updatedTickets = tickets.value.filter(t => t.id !== id);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      tickets.value = updatedTickets;
      deleteConfirmId.value = null; // Close the confirmation modal
      toast.value = { message: 'Ticket deleted successfully!', type: 'success' };
    };

    const resetForm = () => {
      // Reset formData to initial state
      Object.assign(formData, { title: '', description: '', status: 'open', priority: 'medium' });
      editingTicket.value = null;
      showForm.value = false;
      Object.keys(errors).forEach(key => delete errors[key]);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'open': return 'bg-green-100 text-green-800';
        case 'in_progress': return 'bg-amber-100 text-amber-800';
        case 'closed': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return {
      tickets, showForm, editingTicket, formData, errors, toast, deleteConfirmId,
      handleSubmit, handleEdit, handleDelete, resetForm, getStatusColor
    };
  },
  components: { Toast, Home, LogOut, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle },
  template: `
    <div class="min-h-screen bg-gray-50">
      <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
      
      <header class="bg-white shadow-md">
        <div class="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-blue-600">Ticket Management</h1>
          <div class="flex flex-wrap gap-2">
            <button
              @click="onNavigate('dashboard')"
              class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition duration-150"
            >
              <Home />
              Dashboard
            </button>
            <button
              @click="onLogout"
              class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition duration-150"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div class="max-w-[1440px] mx-auto px-4 py-12">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 class="text-3xl font-extrabold text-gray-800">Your Tickets</h2>
          <button
            @click="showForm = !showForm"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition duration-150 w-full sm:w-auto justify-center"
          >
            <Plus />
            New Ticket
          </button>
        </div>

        <div v-if="showForm" class="bg-white p-8 rounded-xl shadow-2xl mb-10 border-t-4 border-blue-500">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
          <form @submit="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-1 text-gray-700">Title *</label>
              <input
                type="text"
                v-model="formData.title"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150"
              />
              <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-1 text-gray-700">Description</label>
              <textarea
                v-model="formData.description"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150"
                rows="3"
              />
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Status *</label>
                <select
                  v-model="formData.status"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150 bg-white"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-1 text-gray-700">Priority</label>
                <select
                  v-model="formData.priority"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition duration-150 bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button
                type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-150 shadow-md"
              >
                {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
              </button>
              <button
                type="button"
                @click="resetForm"
                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div v-if="tickets.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="ticket in tickets" :key="ticket.id" class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-100 hover:shadow-xl transition duration-300">
            <div class="flex justify-between items-start mb-3">
              <h4 class="text-xl font-bold text-gray-900 pr-4">{{ ticket.title }}</h4>
              <span :class="getStatusColor(ticket.status)" class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                {{ ticket.status.replace('_', ' ') }}
              </span>
            </div>
            
            <p v-if="ticket.description" class="text-gray-600 mb-4 text-sm">{{ ticket.description }}</p>
            <p class="text-xs font-medium text-gray-500 mb-4">Priority: {{ ticket.priority.toUpperCase() }}</p>
            
            <div class="flex gap-2">
              <button
                @click="handleEdit(ticket)"
                class="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition duration-150 text-sm"
              >
                <Edit2 />
                Edit
              </button>
              <button
                @click="deleteConfirmId = ticket.id"
                class="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition duration-150 text-sm"
              >
                <Trash2 />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl mt-8">
          <p class="text-gray-500 text-lg">No tickets yet. Click "New Ticket" to create your first one!</p>
        </div>
      </div>

      <!-- Delete Confirmation Modal (Vue Equivalent) -->
      <div v-if="deleteConfirmId" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
        <div class="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform scale-100 transition-transform duration-300">
          <h3 class="text-2xl font-bold mb-4 text-red-700">Confirm Delete</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <div class="flex gap-3 justify-end">
            <button
              @click="deleteConfirmId = null"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition duration-150"
            >
              Cancel
            </button>
            <button
              @click="handleDelete(deleteConfirmId)"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-[1440px] mx-auto px-4 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
};

// --- 6. Main App Component (Vue Equivalent) ---
</script>

<template>
  <!-- The main App component handles the routing based on currentPage state -->
  <div id="app" class="font-sans min-h-screen">
    <LandingPage v-if="currentPage === 'landing'" :onNavigate="handleNavigate" />
    <AuthPage v-else-if="currentPage === 'login'" mode="login" :onNavigate="handleNavigate" :onLogin="handleLogin" />
    <AuthPage v-else-if="currentPage === 'signup'" mode="signup" :onNavigate="handleNavigate" :onLogin="handleLogin" />
    <Dashboard v-else-if="currentPage === 'dashboard'" :onNavigate="handleNavigate" :onLogout="handleLogout" />
    <TicketManagement v-else-if="currentPage === 'tickets'" :onNavigate="handleNavigate" :onLogout="handleLogout" />
  </div>
</template>

<script setup>
// Main application logic is placed here, running only once.
const currentPage = ref('landing'); // Replaces React's useState

// Replaces React's useEffect with [] dependency array
onMounted(() => {
  const session = localStorage.getItem('ticketapp_session');
  // If a session exists and we are on the landing page, redirect to dashboard.
  if (session && currentPage.value === 'landing') {
    currentPage.value = 'dashboard';
  }
});

const handleLogin = () => {
  currentPage.value = 'dashboard';
};

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session');
  currentPage.value = 'landing';
};

const handleNavigate = (page) => {
  const session = localStorage.getItem('ticketapp_session');
  // Guards authenticated routes
  if ((page === 'dashboard' || page === 'tickets') && !session) {
    currentPage.value = 'login';
    return;
  }
  currentPage.value = page;
};

// Exporting the components so they can be registered locally within the template scope
// This is not necessary with <script setup> if they are used directly in the template,
// but they are required for use inside the locally defined component objects (like Dashboard, AuthPage).
// In a true Single File Component setup, they would be imported. Here, we define them before the main script tag.

// We don't export the main component since this is a single file app and the template is the output.
</script>

<style>
/* Optional: Basic global styles (Tailwind is loaded globally, but this ensures Inter font) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
#app {
  font-family: 'Inter', sans-serif;
}
</style>
<script>
// Load Tailwind CSS globally in the host environment (required for the styling)
const tailwindScript = document.createElement('script');
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);
</script>
