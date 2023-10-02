/**
 * Activity 5: Looking for love
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
    speed: 3
};

let state = `title`; // Can be: title, simulation, love, sandess

/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);

    setupCircles();

}

function setupCircles(){
    // Position of circles separated from one another
    circle1.x = width / 3;
    circle2.x = 2 * width / 3;

    // Start circles moving in a random direction
    circle1.vx = random(-circle1.speed,circle1.speed);
    circle2.vx = random(-circle2.speed,circle2.speed);

    circle1.vy = random(-circle1.speed,circle1.speed);
    circle2.vy = random(-circle2.speed,circle2.speed);
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    if (state === `title`){
        title();
    }
    else if (state === 'simulation'){
        simulation();
    }
    else if (state === `love`) {
        love();
    }
    else if (state === `sadness`){
        sadness();
    }

    
}

function title() {
    push();
    textSize(64);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text(`LOVE?`,width/2,height/2);
    pop();
}

function simulation() {
    move();
    checkOffscreen();
    checkOverlap();
    display();
}

function love() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`LOVE!`,width/2,height/2);
    pop();
}

function sadness() {
    push();
    textSize(64);
    fill(150,150,255);
    textAlign(CENTER,CENTER);
    text(`D:`,width/2,height/2);
    pop();
}

function move(){
       // Movement of circles
       circle1.x = circle1.x + circle1.vx;
       circle1.y = circle1.y + circle1.vy;
   
       circle2.x = circle2.x + circle2.vx;
       circle2.y = circle2.y + circle2.vy;
}

function checkOffscreen() {
    // Check if the circles have gone offscreen
    if (isOffscreen(circle1) || isOffscreen(circle2)) {
        state = `sadness`;
    }
}

function isOffscreen(circle) {
    if (circle.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height) {
        return true;
    }
    else {
        return false;
    }
}

function checkOverlap(){
    // Check if the circles overlap
    let d = dist(circle1.x,circle1.y,circle2.x,circle2.y);
    if (d < circle1.size/2 + circle2.size/2) {
        state = `love`;
    }
}

function display(){
    // Displaying the circles
    ellipse(circle1.x,circle1.y,circle1.size);
    ellipse(circle2.x,circle2.y,circle2.size);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}
