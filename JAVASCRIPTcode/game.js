//Game
// Importing necessary classes for the game
import { Bird } from './bird.js';
import { Pipe } from './pipe.js';
import { Weapon } from './weapon.js';

// Game class definition
export class Game {
    constructor() {
        // Initializing game variables
        this.pipeHorizontalSpeed = 4;
        this.bird = new Bird();
        this.pointSound = new Audio('../sound/coin-recieved.mp3'); // Sound for collecting points
        this.dieSound = new Audio('../sound/die.mp3'); // Sound for game over
        this.scoreDisplay = document.querySelector('.score_val');
        this.messageDisplay = document.querySelector('.message');
        this.scoreTitle = document.querySelector('.score_title');
        this.gameState = 'Start';
        this.finalScore = 0;
        this.pipeGap = 25;
        this.pipeCreationInterval = 1700;

        // Event listener for key presses to control game 
        document.addEventListener('keydown', (e) => this.onKeyPress(e));
    }

    // Handle key presses for starting the game and making the bird fly
    onKeyPress(e) {
        if (this.gameState === 'Start' && e.key === ' ') {
            this.startGame(); // Start the game on spacebar press
        } else if (this.gameState === 'Play' && e.key === ' ') {
            this.bird.fly(); // Make the bird fly on spacebar press
        }
    }

    // Method to start the game
    startGame() {
        this.resetGameElements();
        this.bird.reset();
        this.finalScore = 0; // Reset score
        this.updateScoreDisplay(); // Update score display
        this.messageDisplay.style.display = 'none';
        this.gameState = 'Play'; // Change game state to Play
        this.schedulePipeCreation(); // Schedule pipe creation
        this.play(); // Start the game loop
    }

    // Main game loop for updates
    play() {
        requestAnimationFrame(() => {
            if (this.gameState === 'Play') {
                this.updateBirdPosition();
                this.updatePipePositions();
                this.updateWeaponPositions();
                this.checkCollisions();
                this.play();
            }
        });
    }

    // Update the bird's position with gravity
    updateBirdPosition() {
        this.bird.applyGravity(this.gravity); // Apply gravity to the bird
        if (this.bird.isOutOfBounds()) {
            this.endGame(); // End game if the bird is out of bounds
        }
    }

    // Update the positions of the pipes
    updatePipePositions() {
        const pipes = document.querySelectorAll('.pipe_sprite');
        pipes.forEach(pipe => this.movePipe(pipe));
    }

    // Move individual pipe
    movePipe(pipe) {
        const pipeProps = pipe.getBoundingClientRect(); // Get pipe's position
        if (pipeProps.right <= 0) {
            pipe.remove(); // Remove pipe if it goes off screen
        } else {
            // Check for collision with bird
            if (this.checkCollision(this.bird.getBoundingClientRect(), pipeProps)) {
                this.endGame(); // End game on collision
            }
            // Check if the bird has passed the pipe for scoring
            if (pipe.dataset.passed !== 'true' && pipeProps.right < this.bird.getBoundingClientRect().left) {
                this.finalScore++; // Increase score
                pipe.dataset.passed = 'true';
                this.updateScoreDisplay(); // Update score display
                this.pipeHorizontalSpeed += 0.5; // Increase pipe speed
            }
            pipe.style.left = (pipeProps.left - this.pipeHorizontalSpeed) + 'px'; 
        }
    }

    // Update positions of weapons in the game
    updateWeaponPositions() {
        const weapons = document.querySelectorAll('.weapon');
        weapons.forEach(weapon => this.moveWeapon(weapon));
    }

    // Move individual weapon
    moveWeapon(weapon) {
        const weaponProps = weapon.getBoundingClientRect(); // Get weapon's position
        if (weaponProps.right <= 0) {
            weapon.remove(); // Remove weapon if it goes off screen
        } else {
            // Check for collision with bird
            if (this.checkCollision(this.bird.getBoundingClientRect(), weaponProps)) {
                this.finalScore++; // Increase score
                this.updateScoreDisplay(); // Update score display
                weapon.remove(); // Remove weapon after collection
            }
            weapon.style.left = (weaponProps.left - this.pipeHorizontalSpeed) + 'px'; // Move weapon left
        }
    }

    // Check for collision between bird and another object
    checkCollision(birdProps, objectProps) {
        return (
            birdProps.left < objectProps.left + objectProps.width &&
            birdProps.left + birdProps.width > objectProps.left &&
            birdProps.top < objectProps.top + objectProps.height &&
            birdProps.top + birdProps.height > objectProps.top
        );
    }

    // Check for collisions with pipes and weapons
    checkCollisions() {
        const pipes = document.querySelectorAll('.pipe_sprite'); // Get all pipe elements
        const weapons = document.querySelectorAll('.weapon'); // Get all weapon elements
        pipes.forEach(pipe => {
            if (this.checkCollision(this.bird.getBoundingClientRect(), pipe.getBoundingClientRect())) {
                this.endGame(); // End game on pipe collision
            }
        });
        weapons.forEach(weapon => {
            if (this.checkCollision(this.bird.getBoundingClientRect(), weapon.getBoundingClientRect())) {
                this.pointSound.play(); // Play point sound
                this.finalScore++; // Increase score
                this.updateScoreDisplay(); // Update score display
                weapon.remove(); // Remove weapon after collection
            }
        });
    }

    // Schedule the creation of pipes and weapons
    schedulePipeCreation() {
        setInterval(() => {
            if (this.gameState === 'Play') {
                const pipePosition = Math.floor(Math.random() * 43) + 10;
                new Pipe(pipePosition);

                if (this.finalScore % 3 === 0) {
                    new Weapon(pipePosition);
                }
            }
        }, this.pipeCreationInterval);
    }

    // End the game
    endGame() {
        this.gameState = 'GameOver'; // Change game state to Game Over
        this.dieSound.play(); // Play game over sound
        this.bird.freeze(); // Freeze bird movement
        this.storeFinalScore(); // Store final score
        console.log('Final Score:', this.finalScore); // Log final score to console
        // Redirect to game over page after 2 seconds
        setTimeout(() => {
            window.location.href = '../HTMLcode/gameover.html';
        }, 2000);
    }

    // Store the final score in local storage
    storeFinalScore() {
        try {
            const user = localStorage.getItem('loggedInUser'); // Get logged-in user
            if (user) {
                let userData = JSON.parse(localStorage.getItem(user)); // Parse user data
                userData.scores.push(this.finalScore); // Add final score to user's scores
                localStorage.setItem(user, JSON.stringify(userData)); // Update user data in local storage
            }
        } catch (error) {
            console.error('Error storing final score:', error); // Log error if it occurs
        }
    }

    // Update the score display on the screen
    updateScoreDisplay() {
        this.scoreTitle.innerHTML = 'Score: ';
        this.scoreDisplay.innerHTML = this.finalScore; // Update displayed score
    }

    // Reset game elements for a new game
    resetGameElements() {
        document.querySelectorAll('.pipe_sprite').forEach(pipe => pipe.remove());
        document.querySelectorAll('.weapon').forEach(weapon => weapon.remove());
    }
}
