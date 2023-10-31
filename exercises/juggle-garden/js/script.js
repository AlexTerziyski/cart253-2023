/**
 * Ex 5: Juggle Garden
 * Alex Terziyski
 * 
 * This program simulates a juggling game where you must bounce a ball/balls to dodge a Chainsaw!
 * The aim is to keep the ball bouncing for as long as possible. 
 * If the ball falls to the bottom of the screen and you fail to bounce it, you get 'Ending 1'. 
 * If the ball hits the Chainsaw, you get 'Ending 2'. 
 * If you want to make it more difficult for yourself, you may click anywhere on the screen to add more balls!
 * 
 * The simulation starts right away with 1 ball automatically spawning! Have fun!
 */

"use strict";

// initial gravity force variable
let gravityForce = 0.0025; 

// Paddle variable
let paddle;

// Chainsaw variable
let chainsaw;

// Ball variables
let balls = [];
let numBalls = 1;

// gameState object and attributes (individual gameStates)
let gameState = {
    simulation: 0,
    firstEnding: 1,
    secondEnding: 2,
  };

gameState.current = gameState.simulation; // Sets the initial game state to 'simulation'

/**
 * This function sets the Canvas size, the paddle with its size attributes, the chainsaw with its size attributes,
 * and initializes the randomization in where the first ball(s) spawn on the screen
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
 * This function draws the paddle and chainsaw on the screen with their movement and then handles the
 * according gameStates with their logic (Initially starts with the simulation gameState)
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
                gameState.current = gameState.firstEnding; // Updates gamestate to "firstEnding"
            }
    
            // Checks for collision with the chainsaw
            if (ball.hitChainsaw(chainsaw)) {
                ball.active = false; // Marks the ball as inactive
                balls.splice(i, 1); // Removes the ball from the array
                gameState.current = gameState.secondEnding; // Updates gamestate to "secondEnding"
                }
            }
        }
    } else if (gameState.current === gameState.firstEnding) {
        // Handles the firstEnding state
        background(0); // Clears the canvas
        textSize(32); // Sets the text size
        fill(255);    // Sets the text color (white)
        textAlign(CENTER, CENTER); // Centers the text

        // Displays "ENDING 1" in the middle of the screen
        text("ENDING 1", width / 2, height / 2);
    } else if (gameState.current === gameState.secondEnding) {
        // Handles the secondEnding state
        background(0); // Clears the canvas
        textSize(32); // Sets the text size
        fill(255); // Sets the text color (white)
        textAlign(CENTER, CENTER); // Centers the text
    
        // Displays "ENDING 2" in the middle of the screen
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
  