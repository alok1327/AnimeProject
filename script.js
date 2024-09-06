document.addEventListener("DOMContentLoaded", function() {
    const loginLink = document.getElementById("login-link");
    const loginSection = document.getElementById("login-section");
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    loginLink.addEventListener("click", function() {
        loginSection.classList.toggle("show");
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("user-login-password").value;

        if (password !== confirmPassword) {
            loginMessage.textContent = "Passwords do not match";
            return;
        }

        // Add login functionality here
        // For example, you can send an AJAX request to a server-side script
        // to authenticate the user and handle the response accordingly

        loginMessage.textContent = "Login successful!";
    });
});
