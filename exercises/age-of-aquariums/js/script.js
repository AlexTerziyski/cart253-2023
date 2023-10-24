/**
 * Exercise 4: Age of Aquariums
 * Alex Terziyski
 *
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

// Each fish in the school
let school = [];
let schoolSize = 5; 

// User-controlled "fish"/rectangle
let playerFish;

/**
 * Description of setup
*/
function setup() {
    createCanvas(600,600);

    // Creates fish, at a random position
    for (let i = 0; i < schoolSize; i++){
        let fish = createFish(random(0, width), random(0, height));
        school.push(fish);
    }
    playerFish = createPlayerFish(width / 2, height / 2, 50);
}

/**
 * This function sets the parameters for the player controlled fish
 */
function createPlayerFish(x, y, size) {
    let playerFish = {
        x: x,
        y: y,
        size: size,
        speed: 4
    }
    return playerFish;
}


// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: 50,
        vx: 0,
        vy: 0,
        speed: 2
    }
    return fish;
}

/**
 * Description of draw()
 * Moves and displays the fish
*/
function draw() {
    background(0);

    for (let i = 0; i < school.length; i++){
        moveFish(school[i]);
    }

    for (let i = 0; i < school.length; i++){
        displayFish(school[i]);
    }
    displayPlayerFish(playerFish); 
}

/**
 * This function is used to display the player-controlled fish on the canvas
 */
function displayPlayerFish(playerFish) {
    push();
    fill(0, 0, 255); // Blue color for the player fish
    noStroke();
    rect(playerFish.x, playerFish.y, playerFish.size, playerFish.size);
    pop();
}


// moveFish(fish)
// Chooses whether the given fish change direction and moves them
function moveFish(fish) {
    // Chooses whether to change direction
    let change = random(0, 1);
    if (change < 0.05){
        fish.vx = random(-fish.speed, fish.speed);
        fish.vy = random(-fish.speed, fish.speed);
    }

    // Moves the fish
    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;

    // Constrain the fish to the canvas
    fish.x = constrain(fish.x, 0, width);
    fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish){
    push();
    fill(200, 100, 100);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
}


function mousePressed() {
    let fish = createFish(mouseX, mouseY);
    school.push(fish);
}

function keyPressed() {
    if (key === 'w' || key === 'W') {
        playerFish.y -= playerFish.speed;
    } else if (key === 's' || key === 'S') {
        playerFish.y += playerFish.speed;
    } else if (key === 'a' || key === 'A') {
        playerFish.x -= playerFish.speed;
    } else if (key === 'd' || key === 'D') {
        playerFish.x += playerFish.speed;
    }
}
