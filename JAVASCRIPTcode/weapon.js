// Weapon

// Define a class called Weapon
export class Weapon {
    constructor(pipePosition) {
        this.createWeapon(pipePosition);
    }

    // Method to create the weapon element
    createWeapon(pipePosition) {

        const weapon = document.createElement('div');

        weapon.className = 'weapon';
        // Position the weapon on the screen based on the pipePosition
        weapon.style.top = (pipePosition + 12.5) + 'vh'; // Center the weapon vertically
        weapon.style.left = '100vw';

        // Add the weapon element to the document body so it appears on the page
        document.body.appendChild(weapon);
    }
}
