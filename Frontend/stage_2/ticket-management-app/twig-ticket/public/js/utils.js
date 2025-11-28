// Toast notification utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <span>${type === 'success' ? '✓' : '✕'}</span>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Form validation helper
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function clearErrors(formId) {
    const form = document.getElementById(formId);
    const errors = form.querySelectorAll('.form-error');
    const inputs = form.querySelectorAll('.error');
    
    errors.forEach(error => {
        error.classList.add('hidden');
        error.textContent = '';
    });
    
    inputs.forEach(input => input.classList.remove('error'));
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}