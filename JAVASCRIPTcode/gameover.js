// gameover

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const finalScoreElement = document.getElementById('finalScore');
    let countdown = 5; // Set countdown to 5 seconds

    // Retrieve and display the final score
    const finalScore = localStorage.getItem('finalScore');
    if (finalScore !== null) {
        finalScoreElement.textContent = finalScore; // Display the final score 
    } else {
        finalScoreElement.textContent = '0'; // Display 0 if no score is found
    }

    // Countdown logic
    const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            // Redirect to leaderboard after countdown
            window.location.href = "../HTMLcode/leaderboard.html";
        }
    }, 1000);

    // Enter key to start again
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            window.location.href = "../HTMLcode/game.html"; // Redirect to game page
        }
    });
});
