<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';

// --- 0. ICON COMPONENTS (Replacement for lucide-react) ---
const Icon = (name, size, color) => {
  const icons = {
    AlertCircle: `<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4"/><path d="M12 16h.01"/>`,
    CheckCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>`,
    X: `<path d="M18 6L6 18"/><path d="M6 6l12 12"/>`,
    Menu: `<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>`,
    LogOut: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
    Plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    Edit2: `<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>`,
    Trash2: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y1="17"/>`,
    Home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    Clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v1h8V3a1 1 0 0 0-1-1z"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${color || ''}"><title>${name}</title>${icons[name] || ''}</svg>`;
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

// --- 1. Toast Notification Component (Vue) ---
const Toast = {
  props: ['message', 'type'],
  emits: ['close'],
  setup(props, { emit }) {
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => emit('close'), 3000);
    });
    const iconComponent = computed(() => props.type === 'error' ? AlertCircle : CheckCircle);
    const bgColorClass = computed(() => props.type === 'error' ? 'bg-red-500' : 'bg-green-500');
    return { iconComponent, bgColorClass, emit };
  },
  template: `
    <div :class="['rounded p-3 text-white flex items-center gap-3', bgColorClass]">
      <span v-html="iconComponent.template"></span>
      <div class="flex-1">{{ message }}</div>
      <button @click="$emit('close')">
        <span v-html="` + "`" + Icon('X', 14) + "`" + `"></span>
      </button>
    </div>
  `
};

// --- 2. Landing Page Component (Vue) ---
const LandingPage = {
  props: ['onNavigate'],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div class="max-w-2xl text-center">
        <h1 class="text-3xl font-bold mb-4">Manage Your Tickets Effortlessly</h1>
        <p class="text-gray-600 mb-6">Track, organize, and resolve tickets with our powerful management system.</p>
        <div class="flex gap-3 justify-center">
          <button @click="$emit('navigate','signup')" class="btn btn-primary">Get Started</button>
          <button @click="$emit('navigate','login')" class="btn btn-outline">Login</button>
        </div>
      </div>
    </div>
  `
};

// --- 3. Auth Component (Vue) ---
const AuthPage = {
  props: ['mode', 'onNavigate', 'onLogin'],
  setup(props, { emit }) {
    const formData = reactive({ email: '', password: '', name: '' });
    const errors = reactive({});
    const toast = ref(null);

    const validate = () => {
      errors.email = formData.email ? '' : 'Email is required';
      errors.password = formData.password ? '' : 'Password is required';
      if (props.mode === 'signup') {
        errors.name = formData.name ? '' : 'Name is required';
      }
      return !errors.email && !errors.password && (props.mode === 'login' || !errors.name);
    };

    const handleSubmit = (e) => {
      e && e.preventDefault();
      if (!validate()) return;
      // fake login/signup behaviour
      localStorage.setItem('ticketapp_session', JSON.stringify({ user: formData.email }));
      props.onLogin && props.onLogin();
    };

    return { formData, errors, toast, handleSubmit };
  },
  components: { Toast, AlertCircle, CheckCircle, X },
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form @submit.prevent="handleSubmit" class="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">{{ mode === 'signup' ? 'Sign up' : 'Login' }}</h2>
        <div v-if="mode === 'signup'" class="mb-3">
          <label class="block text-sm">Name</label>
          <input v-model="formData.name" class="w-full border p-2 rounded" />
          <div class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</div>
        </div>
        <div class="mb-3">
          <label class="block text-sm">Email</label>
          <input v-model="formData.email" class="w-full border p-2 rounded" />
          <div class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="mb-3">
          <label class="block text-sm">Password</label>
          <input type="password" v-model="formData.password" class="w-full border p-2 rounded" />
          <div class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="btn btn-primary">{{ mode === 'signup' ? 'Sign up' : 'Login' }}</button>
          <button type="button" class="text-sm" @click="$emit('navigate', mode === 'signup' ? 'login' : 'signup')">
            {{ mode === 'signup' ? 'Have an account? Login' : 'Need an account? Sign up' }}
          </button>
        </div>
      </form>
    </div>
  `
};

// --- 4. Dashboard Component (Vue) ---
const Dashboard = {
  props: ['onNavigate', 'onLogout'],
  setup() {
    const stats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 });
    onMounted(() => {
      // placeholder stats
      stats.value = { total: 12, open: 5, inProgress: 4, closed: 3 };
    });
    return { stats };
  },
  components: { LogOut, ClipboardSmall, Home },
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <button @click="$emit('logout')" class="btn">Logout</button>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div class="p-4 bg-white rounded shadow">Total: {{ stats.total }}</div>
        <div class="p-4 bg-white rounded shadow">Open: {{ stats.open }}</div>
        <div class="p-4 bg-white rounded shadow">In Progress: {{ stats.inProgress }}</div>
        <div class="p-4 bg-white rounded shadow">Closed: {{ stats.closed }}</div>
      </div>
    </div>
  `
};

// --- 5. Ticket Management Component (Vue) ---
const TicketManagement = {
  props: ['onNavigate', 'onLogout'],
  setup() {
    const tickets = ref([]);
    const showForm = ref(false);
    const editingTicket = ref(null);
    const formData = reactive({ title: '', description: '', status: 'open', priority: 'medium' });
    const errors = reactive({});
    const toast = ref(null);
    const deleteConfirmId = ref(null);

    const loadTickets = () => {
      // placeholder tickets
      tickets.value = [
        { id: 1, title: 'Sample ticket', description: 'Example', status: 'open', priority: 'high' }
      ];
    };

    onMounted(loadTickets);

    const validate = () => {
      errors.title = formData.title ? '' : 'Title required';
      return !errors.title;
    };

    const handleSubmit = (e) => {
      e && e.preventDefault();
      if (!validate()) return;
      if (editingTicket.value) {
        // update
        const idx = tickets.value.findIndex(t => t.id === editingTicket.value.id);
        if (idx !== -1) tickets.value[idx] = { ...editingTicket.value, ...formData };
      } else {
        // create
        tickets.value.push({ id: Date.now(), ...formData });
      }
      resetForm();
      showForm.value = false;
    };

    const handleEdit = (ticket) => {
      editingTicket.value = { ...ticket };
      Object.assign(formData, ticket);
      showForm.value = true;
    };

    const handleDelete = (id) => {
      tickets.value = tickets.value.filter(t => t.id !== id);
    };

    const resetForm = () => {
      editingTicket.value = null;
      formData.title = '';
      formData.description = '';
      formData.status = 'open';
      formData.priority = 'medium';
      errors.title = '';
    };

    const getStatusColor = (status) => {
      if (status === 'open') return 'text-green-600';
      if (status === 'in-progress') return 'text-yellow-600';
      return 'text-gray-600';
    };

    return {
      tickets, showForm, editingTicket, formData, errors, toast, deleteConfirmId,
      loadTickets, validate, handleSubmit, handleEdit, handleDelete, resetForm, getStatusColor
    };
  },
  components: { Toast, Home, LogOut, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle },
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Tickets</h2>
        <button @click="showForm = true" class="btn btn-primary">New Ticket</button>
      </div>

      <div v-if="showForm" class="mb-6 bg-white p-4 rounded shadow">
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <input v-model="formData.title" placeholder="Title" class="w-full border p-2 rounded" />
            <div class="text-red-500 text-sm" v-if="errors.title">{{ errors.title }}</div>
          </div>
          <div class="mb-2">
            <textarea v-model="formData.description" placeholder="Description" class="w-full border p-2 rounded"></textarea>
          </div>
          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn" @click="resetForm(); showForm = false">Cancel</button>
          </div>
        </form>
      </div>

      <div class="grid gap-4">
        <div v-for="t in tickets" :key="t.id" class="bg-white p-4 rounded shadow flex justify-between items-start">
          <div>
            <h3 class="font-semibold">{{ t.title }}</h3>
            <p class="text-sm text-gray-600">{{ t.description }}</p>
            <div :class="getStatusColor(t.status)" class="text-sm mt-2">{{ t.status }}</div>
          </div>
          <div class="flex gap-2">
            <button @click="handleEdit(t)" class="btn">Edit</button>
            <button @click="handleDelete(t.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `
};

// --- 6. Main App Logic (merged into single <script setup>) ---
const currentPage = ref('landing');

onMounted(() => {
  const session = localStorage.getItem('ticketapp_session');
  if (session && currentPage.value === 'landing') {
    currentPage.value = 'dashboard';
  }
  // ensure tailwind is loaded if not present (optional)
  if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);
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
  if ((page === 'dashboard' || page === 'tickets') && !session) {
    currentPage.value = 'login';
    return;
  }
  currentPage.value = page;
};
</script>

<template>
  <div id="app" class="font-sans min-h-screen">
    <LandingPage v-if="currentPage === 'landing'" @navigate="handleNavigate" />
    <AuthPage v-else-if="currentPage === 'login'" mode="login" :onNavigate="handleNavigate" :onLogin="handleLogin" />
    <AuthPage v-else-if="currentPage === 'signup'" mode="signup" :onNavigate="handleNavigate" :onLogin="handleLogin" />
    <Dashboard v-else-if="currentPage === 'dashboard'" :onNavigate="handleNavigate" @logout="handleLogout" />
    <TicketManagement v-else-if="currentPage === 'tickets'" :onNavigate="handleNavigate" @logout="handleLogout" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
#app { font-family: 'Inter', sans-serif; }
</style>