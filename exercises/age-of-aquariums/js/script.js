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

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

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
        size: 25,
        vx: 0,
        vy: 0,
        speed: 2,
        color: color(random(255), random(255), random(255))
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

     // Checks for collisions and eat non-controlled fish
     for (let i = school.length - 1; i >= 0; i--) {
        let fish = school[i];
        if (collides(playerFish, fish)) {
            school.splice(i, 1); // Remove the non-controlled fish at index 'i' from the 'school' array using splice
        }
    }

    displayPlayerFish(playerFish);
    updatePlayerPosition(); 
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
    fill(fish.color);
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
        upPressed = true;
    } else if (key === 's' || key === 'S') {
        downPressed = true;
    } else if (key === 'a' || key === 'A') {
        leftPressed = true;
    } else if (key === 'd' || key === 'D') {
        rightPressed = true;
    }
}

function keyReleased() {
    if (key === 'w' || key === 'W') {
        upPressed = false;
    } else if (key === 's' || key === 'S') {
        downPressed = false;
    } else if (key === 'a' || key === 'A') {
        leftPressed = false;
    } else if (key === 'd' || key === 'D') {
        rightPressed = false;
    }
}

function updatePlayerPosition() {
    if (upPressed) {
        playerFish.y -= playerFish.speed;
    }
    if (downPressed) {
        playerFish.y += playerFish.speed;
    }
    if (leftPressed) {
        playerFish.x -= playerFish.speed;
    }
    if (rightPressed) {
        playerFish.x += playerFish.speed;
    }
}

function collides(fishA, fishB) {
    let distance = dist(fishA.x, fishA.y, fishB.x, fishB.y);
    return distance < (fishA.size + fishB.size) / 2;
}

