//login
function login() {
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    let userData = JSON.parse(localStorage.getItem(username));

    if (!userData) {
        alert("Username not recognized. Do you have an account?");
        return;
    }

    if (password === userData.password) {
        alert("Login successful! Redirecting to the game page.");
        localStorage.setItem('loggedInUser', username);
        
        // Update navigation to show "Logout" after login
        const loginLink = document.querySelector(".menu a[href='login.html']");
        loginLink.textContent = "Logout";
        loginLink.setAttribute("href", "javascript:logout();");

        window.location.href = "../HTMLcode/game.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}
