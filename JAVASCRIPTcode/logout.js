// Logout 
function logout() {
    // Remove the currently logged-in user from local storage
    localStorage.removeItem('loggedInUser');
    alert("You have been logged out.");

    // Redirect to the home page
    window.location.href = "/index.html";
}

// Update the link text 
document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("loginLink"); // Select by id
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loginLink) { // make sure that the element exists
        if (loggedInUser) {
            // If logged in then change link to "Logout" 
            loginLink.textContent = "Logout";
            loginLink.setAttribute("href", "javascript:logout();");
        } else {
            // If not logged in, keep link as "Login/Register"
            loginLink.textContent = "Login/Register";
            loginLink.setAttribute("href", "../HTMLcode/login.html");
        }
    } 
});
