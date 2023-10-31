class Chainsaw {

    constructor(x,y) {
      this.x = x;
      this.y = y;
      
      this.bladeLength = 100; // Length of the chainsaw blade
      this.bladeWidth = 50;   // Width of the chainsaw blade
      this.handleLength = 100; // Length of the chainsaw handle
      this.speed = 10; // Speed of the chainsaw
    }
  
    
    display() {
        push();
        fill(200, 0, 0); // Red color (handle)
        rect(this.x - this.bladeWidth, this.y, this.bladeWidth, this.bladeLength);
    
        fill(100, 100, 100); // Gray color (blade)
        rect(this.x - this.bladeWidth, this.y - this.handleLength, this.bladeWidth, this.handleLength);
        pop();
    }

    move() {
      this.x += this.speed; // Moves chainsaw to the right
    
    // If the chainsaw goes off the canvas, wrap it around to the other side
    if (this.x > width + this.bladeWidth) {
      this.x = -this.bladeWidth;
    }
  }

}