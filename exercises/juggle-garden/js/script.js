/**
 * Ex 5: Juggle Garden
 * Alex Terziyski
 *
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let gravityForce = 0.0025;

let paddle;

let balls = [];
let numBalls = 1;

let gameState = {
    simulation: 0,
    firstEnding: 1,
    secondEnding: 2,
  };

  gameState = 'simulation';


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth,windowHeight);

    paddle = new Paddle(300,20);

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

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if (ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
            ball.display();
        }
    }
}

/**
 * This function creates a new ball at the mouse click position
 */
function mousePressed() {
    let ball = new Ball(mouseX, mouseY);
    balls.push(ball);
  }
  