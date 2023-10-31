/**
 * Ex 5: Juggle Garden
 * Alex Terziyski
 *
 */

"use strict";

let gravityForce = 0.0025;

let paddle;

let chainsaw;

let balls = [];
let numBalls = 1;

let gameState = {
    simulation: 0,
    firstEnding: 1,
    secondEnding: 2,
  };

gameState.current = gameState.simulation; // Sets the initial game state to 'simulation'

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth,windowHeight);

    paddle = new Paddle(300,20);
    
    // Created an instance of the Chainsaw class
    chainsaw = new Chainsaw(width / 2, height - 50);

    for (let i = 0; i < numBalls; i++) {
      let x = random(0,width);
      let y = random(-400,-100);  
      let ball = new Ball(x,y);
      balls.push(ball);
    }
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    paddle.move();
    paddle.display();

    chainsaw.move();
    chainsaw.display();

    if (gameState.current === gameState.simulation){
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.active) {
                ball.gravity(gravityForce);
                ball.move();
                ball.bounce(paddle);
                ball.display();

            // Checks if the ball falls off the screen
            if (ball.y > height) {
                gameState.current = gameState.firstEnding;
            }
    
            // Checks for collision with the chainsaw
            if (ball.hitChainsaw(chainsaw)) {
                ball.active = false; // Marks the ball as inactive
                balls.splice(i, 1); // Removes the ball from the array
                gameState.current = gameState.secondEnding; // Transitions to the "secondEnding" state
                }
            }
        }
    } else if (gameState.current === gameState.firstEnding) {
        // Handles the firstEnding state
        background(0); // Clears the canvas
        textSize(32); // Sets the text size
        fill(255);    // Sets the text color (white)
        textAlign(CENTER, CENTER); // Centers the text

        // Display "ENDING 1" in the middle of the screen
        text("ENDING 1", width / 2, height / 2);
    } else if (gameState.current === gameState.secondEnding) {
        // Handles the secondEnding state
        background(0); // Clear the canvas
        textSize(32); // Sets the text size
        fill(255); // Sets the text color (white)
        textAlign(CENTER, CENTER); // Centers the text
    
        // Display "ENDING 2" in the middle of the screen
        text("ENDING 2", width / 2, height / 2);
      }
}


/**
 * This function creates a new ball at the mouse click position
 */
function mousePressed() {
    let ball = new Ball(mouseX, mouseY);
    balls.push(ball);
  }
  