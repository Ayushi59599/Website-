// pipes

// Define a class called Pipe
export class Pipe {
    constructor(pipePosition) {
        this.pipePosition = pipePosition;
       
        // Create the top and bottom pipe elements
        this.createPipeElement('top');
        this.createPipeElement('bottom');
    }

    // Method to create a pipe element based on its type (top or bottom)
    createPipeElement(pipeType) {
        const pipe = document.createElement('div');
        pipe.className = 'pipe_sprite';
        pipe.style.left = '100vw'; 

        // If the pipe is of type 'top'
        if (pipeType === 'top') {
            pipe.style.top = (this.pipePosition - 75) + 'vh'; 
            // Add a cap to the bottom of this pipe
            this.addPipeCap(pipe, 'bottom');
        } else {
            // If the pipe is of type 'bottom', position it below the gap
            pipe.style.top = (this.pipePosition + 25) + 'vh'; 
            // Add a cap to the top of this pipe
            this.addPipeCap(pipe, 'top');
        }

        // Add the pipe element to the document body so it appears on the page
        document.body.appendChild(pipe);
    }

    // Method to add a cap to the pipe (top or bottom)
    addPipeCap(pipe, capPosition) {
        const cap = document.createElement('div');
        cap.className = `pipe_thick_${capPosition}`;
        cap.style.position = 'absolute';
        cap.style[capPosition === 'top' ? 'top' : 'bottom'] = '0';
        // Add the cap to the pipe
        pipe.appendChild(cap);
    }
}
