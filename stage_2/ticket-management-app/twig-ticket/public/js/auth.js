// Check if user is authenticated
function checkAuth() {
    const session = localStorage.getItem('ticketapp_session');
    if (!session) {
        window.location.href = '/auth/login';
        return false;
    }
    return true;
}

// Initialize login form
function initLogin() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors('loginForm');
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Validate
        let isValid = true;
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Email is invalid');
            isValid = false;
        }
        
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Check credentials
        const storedUser = localStorage.getItem('ticketapp_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.email === email && user.password === password) {
                // Create session
                const session = {
                    token: 'mock_token_' + Date.now(),
                    email: email
                };
                localStorage.setItem('ticketapp_session', JSON.stringify(session));
                showToast('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
                return;
            }
        }
        
        showToast('Invalid credentials. Please try again.', 'error');
    });
}

// Initialize signup form
function initSignup() {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors('signupForm');
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Validate
        let isValid = true;
        
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Email is invalid');
            isValid = false;
        }
        
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Save user
        const user = { name, email, password };
        localStorage.setItem('ticketapp_user', JSON.stringify(user));
        
        // Create session
        const session = {
            token: 'mock_token_' + Date.now(),
            email: email
        };
        localStorage.setItem('ticketapp_session', JSON.stringify(session));
        
        showToast('Account created successfully!', 'success');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('ticketapp_session');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}