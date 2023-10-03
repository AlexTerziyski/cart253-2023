/**
 * Ex 3: Love, actually
 * Alex Terziyski
 * 
 * This program is all about being traumatized! There are 5 states: title, simulation, trauma, despair, and party.
 * The user controls circle1 using the arrow keys (Up, Down, Left, and Right). The further away circle1 is from circle2,
 * the more aggresively circle2 vibrates and is traumatized. The closer they are, the less circle2 vibrates. If both circles touch,
 * they are traumatized! If both leave the screen, they are stuck in a pit of despair! If the user presses Up, Down, Left, and Right (Arrow Keys) consecutively
 * you enter the party easter egg state! Click the screen at the start to enter the simulation state and begin the program.
 */
"use strict";

// Defines circle1 (the users) object 
let circle1 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

// Defines circle2 object
let circle2 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 0.25
};

let state = `title`; // Can be: title, simulation, trauma, despair, party (starts with the title state)
let circlesVisible = false; // Doesn't display the circles at the start (sets the boolean to false)

// Stores the most recent key pressed into a string (will be used for party state)
let lastKeyPressed1 = '';
let lastKeyPressed2 = '';
let lastKeyPressed3 = '';
let lastKeyPressed4 = '';

/**
 * Creates the canvas and calls the setupCircles(); function
 */
function setup() {
    createCanvas(500, 500);
    setupCircles();
}

/** 
 * Sets up the parameters for the position of the circles on the canvas and their directional speed & direction
 */
function setupCircles() {
    // Position of circles separated from one another
    circle1.x = width / 3;
    circle2.x = 2 * width / 3;

    // Start circle2 moving in random direction
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}



/**
 * Draws/calls all the states that will be used throughout the program
 */
function draw() {
    background(0); // Black background

    if (state === `title`) {
        title(); // title screen function
    } else if (state === 'simulation') {
        if (circlesVisible) { 
            simulation(); // enters simulation if circles are visible
        } else {    
            displayCirclesOnly(); // otherwise only displays circles
        }
    } else if (state === `trauma`) {
        trauma(); // trauma text screen
    } else if (state === `despair`) {
        despair(); // despair text screen
    } else if (state === `party`) {
        party(); // party easter egg state
    }
}

/**
 * This is the title screen function that displays the "TRAUMA?"" Text at the start
 */
function title() {
    push();
    textSize(64);
    fill(200, 100, 100);
    textAlign(CENTER, CENTER);
    text(`TRAUMA?`, width / 2, height / 2);
    pop();
}

/**
 * This is the simulation function that calls all the other crucial functions for the program to be interactive
 */
function simulation() {
    moveCircle1();
    applyVibrationForce();
    checkOffscreen();
    checkOverlap();
    display();
}

/**
 * This function applies the vibration force to circle2
 */
function applyVibrationForce() {
    // Calculates the distance between circle1 and circle2
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);

    // Defines a maximum vibration force *Note: increase for more aggression*
    let maxVibrationForce = 0.25;

    // Controls when vibration starts to decrease
    let minDistance = 5; 

    // Calculates the force based on the inverse of distance
    let force = map(d, 0, minDistance, maxVibrationForce, 0);

    // Generates a random angle to add randomness to the direction
    let randomAngle = random(TWO_PI);

    // Calculates the displacement in the X and Y based on the force and random angle
    let displacementX = cos(randomAngle) * force;
    let displacementY = sin(randomAngle) * force;

    // Applies the displacement to circle2's position
    circle2.x += displacementX;
    circle2.y += displacementY;
}

/**
 * This function is an extra step for manipulation of states, same as display(); function
 */
function displayCirclesOnly() {
    display();
}

/**
 * This is the function that displays the "TRAUMA!!!" text when both circles touch
 */
function trauma() {
    push();
    textSize(64);
    fill(255, 150, 150);
    textAlign(CENTER, CENTER);
    text(`TRAUMATIZED!!!`, width / 2, height / 2);
    pop();
}

/**
 * This is the function that displays the "DESPAIR" text when both circles leave the screen
 */
function despair() {
    push();
    textSize(64);
    fill(150, 150, 255);
    textAlign(CENTER, CENTER);
    text(`DESPAIR`, width / 2, height / 2);
    pop();
}

/**
 * This function controls the movement of circle1(the user) depending on the arrow keys pressed
 */
function moveCircle1() {
    // Smoothly move circle1
    if (keyIsDown(LEFT_ARROW)) {
        circle1.x -= circle1.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        circle1.x += circle1.speed;
    }
    if (keyIsDown(UP_ARROW)) {
        circle1.y -= circle1.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        circle1.y += circle1.speed;
    }
}

/**
 * This function checks if both circles are off the canvas at the same time using the isOffscreen function 
 */
function checkOffscreen() {
    // Check if circle1 & circle2 has gone offscreen
    if (isOffscreen(circle1) && isOffscreen(circle2)) {
        state = `despair`;
        circlesVisible = false;
    }
}

/**
 * This function returns the true or false value for usage in the program if any circle is off screen
 */
function isOffscreen(circle) {
    return (
        circle.x < 0 ||
        circle.x > width ||
        circle.y < 0 ||
        circle.y > height
    );
}

/**
 * This function checks for when both circles are touching
 */
function checkOverlap() {
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size / 2 + circle2.size / 2) {
        state = `trauma`;
        circlesVisible = false;
    }
}

/**
 * This function displays both circles on the screen with their parameters
 */
function display() {
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}

/**
 * This function is for the party easter egg state, randomizes balloons & conffetti and their colors and position with for loops
 */
function party() {
    background(255); // White background for the party
  
    // Draws colorful balloons
    for (let i = 0; i < 10; i++) {
      let balloonX = random(width);
      let balloonY = random(height);
      let balloonSize = random(30, 50);
      let balloonColor = color(random(255), random(255), random(255));
  
      fill(balloonColor);
      stroke(0);
      strokeWeight(2);
      ellipse(balloonX, balloonY, balloonSize);
    }
  
    // Creates confetti
    for (let i = 0; i < 100; i++) {
      let confettiX = random(width);
      let confettiY = random(height);
      let confettiColor = color(random(255), random(255), random(255));
  
      fill(confettiColor);
      noStroke();
      rect(confettiX, confettiY, 10, 10);
    }
  }

/**
 * This function is for the keys pressed in order to determine if they are pressed in the right order for the state to transition to the party state 
 */
function keyPressed() {
    // Updates the lastKeyPressed variables with the most recent key
    lastKeyPressed4 = lastKeyPressed3;
    lastKeyPressed3 = lastKeyPressed2;
    lastKeyPressed2 = lastKeyPressed1;
    lastKeyPressed1 = key;

    // Checks if the sequence is "Up, Down, Left, Right" consecutively
    if (
        lastKeyPressed1 === 'ArrowRight' &&
        lastKeyPressed2 === 'ArrowLeft' &&
        lastKeyPressed3 === 'ArrowDown' &&
        lastKeyPressed4 === 'ArrowUp'
    ) {
        // Transitions to the "Party" state
        state = 'party';
    }
}

/**
 * This function is to initialize the simulation state after the title screen when you click your mouse for the first time
 */
function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
        circlesVisible = true;
        setupCircles(); // Set initial positions and velocities for both circles

        // Sets random velocities only for circle2
        circle2.vx = random(-circle2.speed, circle2.speed);
        circle2.vy = random(-circle2.speed, circle2.speed);
    }
}