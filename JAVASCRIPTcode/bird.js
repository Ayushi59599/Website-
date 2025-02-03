// Bird class definition
export class Bird {
    constructor() {
        this.birdElement = document.querySelector('.bird'); 
        this.bird_dy = 0; // Vertical speed of the bird
        this.gravity = 0.5; // Gravity affecting the bird's fall
        this.birdElement.style.display = 'none'; // Initially hides the bird
    }

    // Resets the bird's position and state for a new game
    reset() {
        this.birdElement.style.display = 'block'; 
        this.birdElement.style.top = '40vh'; 
        this.bird_dy = 0; 
    }

    // Makes the bird fly upward by adjusting its speed
    fly() {
        this.bird_dy = -7.5; // Sets the upward velocity
    }

    // Applies gravity to the bird, updating its position
    applyGravity() {
        this.bird_dy += this.gravity; 
        const newTop = parseFloat(this.birdElement.style.top) + this.bird_dy; // Calculates new position
        this.birdElement.style.top = newTop + 'px'; // Updates the bird's vertical position
    }

    // Checks if the bird has gone out of the visible game area
    isOutOfBounds() {
        const bird_props = this.getBoundingClientRect(); // Gets the current position of the bird
        return bird_props.top <= 0 || bird_props.bottom >= window.innerHeight; 
    }

    // Freezes the bird's vertical speed, stopping it from moving
    freeze() {
        this.bird_dy = 0; 
    }

    getBoundingClientRect() {
        return this.birdElement.getBoundingClientRect(); 
    }
}
