let tickets = [];
let editingTicketId = null;

// Initialize tickets page
function initTickets() {
    loadTickets();
    renderTickets();
    
    // Event listeners
    document.getElementById('newTicketBtn').addEventListener('click', showForm);
    document.getElementById('ticketForm').addEventListener('submit', handleSubmit);
    document.getElementById('cancelBtn').addEventListener('click', hideForm);
    document.getElementById('cancelDelete').addEventListener('click', hideDeleteModal);
    document.getElementById('confirmDelete').addEventListener('click', confirmDelete);
}

// Load tickets from localStorage
function loadTickets() {
    const stored = localStorage.getItem('ticketapp_tickets');
    tickets = stored ? JSON.parse(stored) : [];
}

// Save tickets to localStorage
function saveTickets() {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
}

// Render tickets grid
function renderTickets() {
    const grid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (tickets.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    grid.innerHTML = tickets.map(ticket => `
        <div class="card ticket-card">
            <div class="ticket-header">
                <h4 class="ticket-title">${escapeHtml(ticket.title)}</h4>
                <span class="badge badge-${ticket.status.replace('_', '-')}">${formatStatus(ticket.status)}</span>
            </div>
            
            ${ticket.description ? `<p class="ticket-description">${escapeHtml(ticket.description)}</p>` : ''}
            
            <div class="ticket-actions">
                <button class="btn-icon edit" onclick="editTicket('${ticket.id}')">
                    ✏️ Edit
                </button>
                <button class="btn-icon delete" onclick="deleteTicket('${ticket.id}')">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Show ticket form
function showForm() {
    document.getElementById('ticketFormContainer').classList.remove('hidden');
    document.getElementById('newTicketBtn').classList.add('hidden');
    document.getElementById('formTitle').textContent = 'Create New Ticket';
    document.getElementById('submitBtn').textContent = 'Create';
    resetForm();
}

// Hide ticket form
function hideForm() {
    document.getElementById('ticketFormContainer').classList.add('hidden');
    document.getElementById('newTicketBtn').classList.remove('hidden');
    resetForm();
}

// Reset form
function resetForm() {
    document.getElementById('ticketForm').reset();
    document.getElementById('ticketId').value = '';
    editingTicketId = null;
    clearErrors('ticketForm');
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    clearErrors('ticketForm');
    
    const formData = new FormData(e.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const status = formData.get('status');
    const priority = formData.get('priority');
    
    // Validate
    let isValid = true;
    
    if (!title) {
        showError('ticketTitle', 'Title is required');
        isValid = false;
    }
    
    if (!status) {
        showError('ticketStatus', 'Status is required');
        isValid = false;
    } else if (!['open', 'in_progress', 'closed'].includes(status)) {
        showError('ticketStatus', 'Status must be open, in_progress, or closed');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Create or update ticket
    if (editingTicketId) {
        // Update existing ticket
        const index = tickets.findIndex(t => t.id === editingTicketId);
        if (index !== -1) {
            tickets[index] = {
                ...tickets[index],
                title,
                description,
                status,
                priority
            };
            showToast('Ticket updated successfully!', 'success');
        }
    } else {
        // Create new ticket
        const newTicket = {
            id: Date.now().toString(),
            title,
            description,
            status,
            priority,
            createdAt: new Date().toISOString()
        };
        tickets.push(newTicket);
        showToast('Ticket created successfully!', 'success');
    }
    
    saveTickets();
    renderTickets();
    hideForm();
}

// Edit ticket
function editTicket(id) {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    
    editingTicketId = id;
    
    // Populate form
    document.getElementById('ticketId').value = ticket.id;
    document.getElementById('ticketTitle').value = ticket.title;
    document.getElementById('ticketDescription').value = ticket.description || '';
    document.getElementById('ticketStatus').value = ticket.status;
    document.getElementById('ticketPriority').value = ticket.priority || 'medium';
    
    // Update UI
    document.getElementById('formTitle').textContent = 'Edit Ticket';
    document.getElementById('submitBtn').textContent = 'Update';
    document.getElementById('ticketFormContainer').classList.remove('hidden');
    document.getElementById('newTicketBtn').classList.add('hidden');
    
    // Scroll to form
    document.getElementById('ticketFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Delete ticket (show confirmation)
let ticketToDelete = null;

function deleteTicket(id) {
    ticketToDelete = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}

// Confirm delete
function confirmDelete() {
    if (!ticketToDelete) return;
    
    tickets = tickets.filter(t => t.id !== ticketToDelete);
    saveTickets();
    renderTickets();
    hideDeleteModal();
    showToast('Ticket deleted successfully!', 'success');
    ticketToDelete = null;
}

// Hide delete modal
function hideDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    ticketToDelete = null;
}

// Utility functions
function formatStatus(status) {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}