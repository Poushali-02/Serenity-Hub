document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Reset error messages
    [usernameError, passwordError].forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    let isValid = true;

    // Trim input values
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    // Username validation
    if (usernameValue === '') {
        usernameError.textContent = 'Username is required';
        usernameError.style.display = 'block';
        isValid = false;
    }

    // Password validation
    if (passwordValue === '') {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Simulating a backend response with a flash message
        displayFlashMessage('success', 'Login successful!');

        // Reset form
        this.reset();
    }
});

// Function to display flash messages dynamically
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
