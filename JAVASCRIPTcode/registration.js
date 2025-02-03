// Register
function register() {
    console.log("Registration function called."); // Debugging line

    // Get values from input fields
    let name = document.getElementById("nameInput").value;
    let username = document.getElementById("usernameInput").value;
    let email = document.getElementById("emailInput").value;
    let country = document.getElementById("countryInput").value;
    let password = document.getElementById("passwordInput").value;

    // Check if the username already exists
    let existingUserData = localStorage.getItem(username);
    if (existingUserData) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    // Validate email format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    const passwordStrength = evaluatePasswordStrength(password);
    if (passwordStrength !== "Strong") {
        alert(`Password strength: ${passwordStrength}. Please ensure your password meets the requirements.`);
        return;
    }

    // Validate password strength
    function evaluatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        if (password.length < minLength) {
            return "Too short";
        }
        if (!hasUpperCase) {
            return "Add an uppercase letter";
        }
        if (!hasLowerCase) {
            return "Add a lowercase letter";
        }
        if (!hasNumbers) {
            return "Add a number";
        }
        if (!hasSpecialChars) {
            return "Add a special character";
        }
        return "Strong"; 
}
    // Store user data with an empty scores array
    let userData = {
        name: name,
        username: username,
        email: email,
        country: country,
        password: password,
        scores: []
    };

    // Save user data to local storage
    localStorage.setItem(username, JSON.stringify(userData));
    alert("Registration successful!");

    // Redirect to the game page
    localStorage.setItem('loggedInUser', username); // Store the logged-in user
    window.location.href = '../HTMLcode/game.html';

}