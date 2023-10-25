/**
 * Exercise 4: Age of Aquariums
 * Alex Terziyski
 *
 */

"use strict";

// Each fish in the school
let school = [];
let schoolSize = 30;



// User-controlled "fish"/ellipse
let playerFish;

let keyState = {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false
}

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
    playerFish = createPlayerFish(width / 2, height / 2);
}

/**
 * This function sets the parameters for the player controlled fish
 */
function createPlayerFish(x, y) {
    let playerFish = {
        x: x,
        y: y,
        size: 50,
        speed: 3.5
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
        speed: 1,
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

  
   

     // Checks for collisions with non-controlled fish
     for (let i = school.length - 1; i >= 0; i--) {
        let fish = school[i];
        if (collides(playerFish, fish)) {
            school.splice(i, 1); // Removes the non-controlled fish at index 'i' from the 'school' array using splice
        }
    }


    displayPlayerFish(playerFish);
    updatePlayerPosition();
    
    for (let i = 0; i < school.length; i++) {
        for (let j = 0; j < school.length; j++) {
            if (i !== j && collides(school[i], school[j])) {
                avoidCollision(school[i], school[j]);
            }
        }
    }

}

/**
 * This function is used to display the player-controlled fish on the canvas
 */
function displayPlayerFish(playerFish) {
    push();
    fill(0, 0, 255); // Blue color for the player fish
    noStroke();
    ellipse(playerFish.x, playerFish.y, playerFish.size);
    pop();
}


// moveFish(fish)
// Chooses whether the given fish change direction and moves them
function moveFish(fish) {
    // Chooses whether to change direction in terms of velocity
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
        keyState.upPressed = true;
    } else if (key === 's' || key === 'S') {
        keyState.downPressed = true;
    } else if (key === 'a' || key === 'A') {
        keyState.leftPressed = true;
    } else if (key === 'd' || key === 'D') {
        keyState.rightPressed = true;
    }
}

function keyReleased() {
    if (key === 'w' || key === 'W') {
        keyState.upPressed = false;
    } else if (key === 's' || key === 'S') {
        keyState.downPressed = false;
    } else if (key === 'a' || key === 'A') {
        keyState.leftPressed = false;
    } else if (key === 'd' || key === 'D') {
        keyState.rightPressed = false;
    }
}

function updatePlayerPosition() {
    if (keyState.upPressed) {
        playerFish.y -= playerFish.speed;
    }
    if (keyState.downPressed) {
        playerFish.y += playerFish.speed;
    }
    if (keyState.leftPressed) {
        playerFish.x -= playerFish.speed;
    }
    if (keyState.rightPressed) {
        playerFish.x += playerFish.speed;
    }
}

function collides(fishA, fishB) {
    let distance = dist(fishA.x, fishA.y, fishB.x, fishB.y);
    return distance < (fishA.size + fishB.size) / 2;
}

// Avoid collision between two fish
function avoidCollision(fishA, fishB) {
    let angle = atan2(fishB.y - fishA.y, fishB.x - fishA.x);
    let distToMove = (fishA.size + fishB.size) / 2 - dist(fishA.x, fishA.y, fishB.x, fishB.y) + 1;
    fishA.x -= cos(angle) * distToMove * 0.5;
    fishA.y -= sin(angle) * distToMove * 0.5;
    fishB.x += cos(angle) * distToMove * 0.5;
    fishB.y += sin(angle) * distToMove * 0.5;
}




