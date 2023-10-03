/**
 * Ex 3: Love, actually
 * Alex Terziyski
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}
let circle1 = {
    x: undefined,
    y: 250,
    size: 100,
    speed: 3
};
let circle2 = {
    x: undefined,
    y: 250,
    size: 100,
    speed: 3
};

let state = `title`; // Can be: title, simulation, love, sadness
let circlesVisible = false;

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
    } else if (state === `love`) {
        love();
    } else if (state === `sadness`) {
        sadness();
    }
}

function title() {
    push();
    textSize(64);
    fill(200, 100, 100);
    textAlign(CENTER, CENTER);
    text(`LOVE?`, width / 2, height / 2);
    pop();
}

function simulation() {
    moveCircle1();
    moveCircle2(); 
    checkOffscreen();
    checkOverlap();
    display();
}

function moveCircle2() {
    // Move circle2 with a consistent random velocity vector
    let angle = random(TWO_PI); // Random angle
    let speed = random(1, circle2.speed); // Random speed magnitude
    circle2.vx = cos(angle) * speed;
    circle2.vy = sin(angle) * speed;

    // Update circle2 position
    circle2.x += circle2.vx;
    circle2.y += circle2.vy;
}



function displayCirclesOnly() {
    display();
}

function love() {
    push();
    textSize(64);
    fill(255, 150, 150);
    textAlign(CENTER, CENTER);
    text(`LOVE!`, width / 2, height / 2);
    pop();
}

function sadness() {
    push();
    textSize(64);
    fill(150, 150, 255);
    textAlign(CENTER, CENTER);
    text(`D:`, width / 2, height / 2);
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
        state = `sadness`;
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
    // Check if the circles overlap
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size / 2 + circle2.size / 2) {
        state = `love`;
        circlesVisible = false;
    }
}

function display() {
    // Display the circles
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
        circlesVisible = true;

        // Set random velocities only for circle2
        circle2.vx = random(-circle2.speed, circle2.speed);
        circle2.vy = random(-circle2.speed, circle2.speed);
    }
}




