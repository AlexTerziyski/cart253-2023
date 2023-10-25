/**
 * Exercise 4: Age of Aquariums
 * Alex Terziyski
 * This program has a user-controlled "fish" that is controlled with W,A,S,D. 
 * The user's fish can eat the wild fish. 
 * The wild fish come in different colors (parameter) and will never touch eachother! (property)
 * If you eat 5 fish, you get the Nom Nom Ending!
 * If 10 seconds pass and you don't eat any fish, you get a Failure ending :(
 * Players can also click to spawn more fish!
 */

"use strict";


let school = []; // School array
let schoolSize = 30; // How many fish total on canvas
let playerFish; // Declares player's fish variable (User-controlled "fish"/ellipse)

// Game states
let gameState = {
    simulation: 0,
    nomNomEnding: 1,
    youFailedEnding: 2,
  };

// Other variables
let fishEaten = 0;
let startTime;
gameState = 'simulation';

// Keystroke states
let keyState = {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false
}

/**
 * Sets up the canvas according to set parameters
*/
function setup() {
    createCanvas(600,600);

    // Creates fish, at a random position
    for (let i = 0; i < schoolSize; i++){
        let fish = createFish(random(0, width), random(0, height));
        school.push(fish);
    }
    playerFish = createPlayerFish(width / 2, height / 2);

    startTime = millis(); // Sets the start time when the game begins
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


/**
 * Creates a new JavaScript Object describing a fish and returns it
 */
function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: 25,
        vx: 0,
        vy: 0,
        speed: 1,
        color: color(random(255), random(255), random(255)) // random color parameter
    }
    return fish;
}

/**
 * draw()
 * Moves and displays the fish
*/
function draw() {
    background(0);
    if (gameState === 'simulation') {
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
                fishEaten++;
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
        // Checks if the player has eaten 5 fish to trigger the "nomNomEnding" state
        if (fishEaten >= 5) {
            gameState = 'nomNomEnding';
        } 
    }
    // Checks if 10 seconds have passed to trigger the "youFailedEnding" state
    if (gameState !== 'nomNomEnding' && millis() - startTime >= 10000) {
        gameState = 'youFailedEnding';
    }

    // Displays the end screens based on the game state
    if (gameState === 'nomNomEnding') {
        // Displays the "Nom Nom Ending" screen
        textSize(32);
        fill(255);
        text("Nom Nom Ending", width / 2, height / 2);
    } else if (gameState === 'youFailedEnding') {
        // Displays the "You Failed Ending" screen
        textSize(32);
        fill(255);
        text("You Failed Ending", width / 2, height / 2);
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

/**
 * This function randomizes the given fish change direction and moves them
 */
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


/**
 * Displays the provided fish on the canvas
 */
function displayFish(fish){
    push();
    fill(fish.color);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
}

/**
 * This function adds fish when the user clicks the canvas
 */
function mousePressed() {
    let fish = createFish(mouseX, mouseY);
    school.push(fish);
}

/**
 * This function is for usage when the user is pressing W,A,S,D
 */
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

/**
 * This function is for usage when the user stops pressing W,A,S,D 
 */
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

/**
 * This function is used to update the directional movement of the player
 */
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

/**
 * This function is for usage for when the playerFish collides with the non-player fish
 */
function collides(fishA, fishB) {
    let distance = dist(fishA.x, fishA.y, fishB.x, fishB.y);
    return distance < (fishA.size + fishB.size) / 2;
}

/**
 * This functions avoids collision between the fish that are not controlled by the user
 */
function avoidCollision(fishA, fishB) {
    let angle = atan2(fishB.y - fishA.y, fishB.x - fishA.x);
    let distToMove = (fishA.size + fishB.size) / 2 - dist(fishA.x, fishA.y, fishB.x, fishB.y) + 1;
    fishA.x -= cos(angle) * distToMove * 0.5;
    fishA.y -= sin(angle) * distToMove * 0.5;
    fishB.x += cos(angle) * distToMove * 0.5;
    fishB.y += sin(angle) * distToMove * 0.5;
}




