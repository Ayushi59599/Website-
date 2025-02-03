function displayLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard");
  leaderboardContainer.textContent = ""; 

  // Create header row
  const headerRow = document.createElement("div");
  headerRow.className = "leaderboard-item header"; // Added a class for styling
  headerRow.innerHTML =
    '<span class="rank">Rank</span>' +
    '<span class="player-name">Username</span>' +  
    '<span class="player-country">Country</span>' +
    '<span class="player-score">Score</span>';
  leaderboardContainer.appendChild(headerRow);

  const users = [];

  // Retrieve user data from local storage
  for (let i = 0; i < localStorage.length; i++) {
    const username = localStorage.key(i);
    const userDataStr = localStorage.getItem(username);

  
    if (username === "loggedInUser") {
      if (typeof userDataStr === 'string' && !userDataStr.startsWith('{')) {
        continue; 
      }
    }

    let userData = JSON.parse(userDataStr); // parse JSON 

    // Ensure userData has valid scores and country
    if (userData && typeof userData === 'object' && Array.isArray(userData.scores)) {
      const topScore = Math.max(...userData.scores); // Get the top score for each user
      users.push({ username, score: topScore, country: userData.country }); // Add the user with their top score and country
    }
  }

  // Sort users by score in descending order
  users.sort((a, b) => b.score - a.score);

  if (users.length === 0) {
    leaderboardContainer.textContent = "No scores available.";
  } else {
    users.forEach((user, index) => {
      const leaderboardItem = document.createElement("div");
      leaderboardItem.className = "leaderboard-item"; // Apply the class for styling
      leaderboardItem.innerHTML =
        '<span class="rank">#' + (index + 1) + '</span>' +
        '<span class="player-name">' + user.username + '</span>' +
        '<span class="player-country">' + user.country + '</span>' +
        '<span class="player-score">' + user.score + '</span>';
      leaderboardContainer.appendChild(leaderboardItem);
    });
  }
}

window.onload = displayLeaderboard;
