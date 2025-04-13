document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Reset error messages
    [emailError, usernameError, passwordError].forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    let isValid = true;

    // Email validation
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Invalid email address';
        emailError.style.display = 'block';
        isValid = false;
    }

    // Username validation
    const usernameValue = username.value.trim();
    if (usernameValue === '') {
        usernameError.textContent = 'Username is required';
        usernameError.style.display = 'block';
        isValid = false;
    } else if (usernameValue.length < 4) {
        usernameError.textContent = 'Username must be at least 4 characters';
        usernameError.style.display = 'block';
        isValid = false;
    }

    // Password validation
    const passwordValue = password.value.trim();
    const passwordRegex = /^(?=.*\d).{6,}$/;
    if (!passwordRegex.test(passwordValue)) {
        passwordError.textContent = 'Password must be 6+ characters with at least 1 digit';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Simulating backend response with a flash message
        displayFlashMessage('success', 'Account created successfully!');

        // Reset form
        this.reset();
    }
});

// Function to dynamically display flash messages
function displayFlashMessage(type, message) {
    const flashContainer = document.querySelector('.flash-container');
    if (!flashContainer) return;

    const flashMessage = document.createElement('div');
    flashMessage.className = `flash-message ${type}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

    // Remove message after 5 seconds
    setTimeout(() => {
        flashMessage.style.opacity = '0';
        setTimeout(() => flashMessage.remove(), 1000);
    }, 5000);
}
