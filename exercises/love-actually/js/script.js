/**
 * Ex 3: Love, actually
 * Alex Terziyski
 * This program is all about being traumatized! There are 5 states: title, simulation, trauma, despair, and party.
 * The user controls circle1 using the arrow keys (Up, Down, Left, and Right). The further away circle1 is from circle2,
 * the more aggresively circle2 vibrates and is traumatized. The closer they are, the less circle2 vibrates. If circle1 touches 
 */
"use strict";

let circle1 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let circle2 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 0.25
};

let state = `title`; // Can be: title, simulation, trauma, despair, party
let circlesVisible = false;

let lastKeyPressed1 = '';
let lastKeyPressed2 = '';
let lastKeyPressed3 = '';
let lastKeyPressed4 = '';

/**
 * Description of setup
 */
function setup() {
    createCanvas(500, 500);
    setupCircles();
}

function setupCircles() {
    // Position of circles separated from one another
    circle1.x = width / 3;
    circle2.x = 2 * width / 3;

    // Start circles moving in random directions
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);

    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}



/**
 * Description of draw()
 */
function draw() {
    background(0);

    if (state === `title`) {
        title();
    } else if (state === 'simulation') {
        if (circlesVisible) {
            simulation();
        } else {
            displayCirclesOnly();
        }
    } else if (state === `trauma`) {
        trauma();
    } else if (state === `despair`) {
        despair();
    } else if (state === `party`) {
        party(); 
    }
}

function title() {
    push();
    textSize(64);
    fill(200, 100, 100);
    textAlign(CENTER, CENTER);
    text(`TRAUMA?`, width / 2, height / 2);
    pop();
}

function simulation() {
    moveCircle1();
    applyVibrationForce(); //Applies the vibration force to circle2
    checkOffscreen();
    checkOverlap();
    display();
}

function applyVibrationForce() {
    // Calculates the distance between circle1 and circle2
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);

    // Defines a maximum vibration force (increase for more aggression)
    let maxVibrationForce = 0.25;

    // Controls when vibration starts to decrease
    let minDistance = 5; 

    // Calculates the force based on the inverse of distance
    let force = map(d, 0, minDistance, maxVibrationForce, 0);

    // Generates a random angle to add randomness to the direction
    let randomAngle = random(TWO_PI);

    // Calculates the displacement based on the force and random angle
    let displacementX = cos(randomAngle) * force;
    let displacementY = sin(randomAngle) * force;

    // Applies the displacement to circle2's position
    circle2.x += displacementX;
    circle2.y += displacementY;
}

function displayCirclesOnly() {
    display();
}

function trauma() {
    push();
    textSize(64);
    fill(255, 150, 150);
    textAlign(CENTER, CENTER);
    text(`TRAUMATIZED!!!`, width / 2, height / 2);
    pop();
}

function despair() {
    push();
    textSize(64);
    fill(150, 150, 255);
    textAlign(CENTER, CENTER);
    text(`DESPAIR`, width / 2, height / 2);
    pop();
}

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

function checkOffscreen() {
    // Check if circle1 has gone offscreen
    if (isOffscreen(circle1) && isOffscreen(circle2)) {
        state = `despair`;
        circlesVisible = false;
    }
}

function isOffscreen(circle) {
    return (
        circle.x < 0 ||
        circle.x > width ||
        circle.y < 0 ||
        circle.y > height
    );
}

function checkOverlap() {
    // Checks if the circles overlap
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size / 2 + circle2.size / 2) {
        state = `trauma`;
        circlesVisible = false;
    }
}

function display() {
    // Display the circles
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}

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

function keyPressed() {
    // Updates the lastKeyPressed variables with the most recent key
    lastKeyPressed4 = lastKeyPressed3;
    lastKeyPressed3 = lastKeyPressed2;
    lastKeyPressed2 = lastKeyPressed1;
    lastKeyPressed1 = key;

    // Checks if the sequence is "Up, Down, Left, Right"
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





