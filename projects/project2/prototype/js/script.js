/**
 * Project 2: Prototype
 * Alex Terziyski
 *
 * For this prototype I just wanted to get the basic:
 *  shooting, 
 *  movement, 
 *  enemy movement, 
 *  and upgrade/boosts 
 * working using aspects we've learned from previous exercises
 * I also wanted to implement the scoring and health bar/attributes
 *
 * Click to consecutively to shoot bullets, the more you shoot the more your healthbar goes down. 
 * If you touch a white square you get the Game Over Screen. 
 * If you hit a white square with your bullets it adds to your score. 
 * If you touch a yellow square it adds to your score.
 * If you touch a red square it adds to your healthbar.
 */

"use strict";
// Defines the user's object, representing the user's character with attributes such as the X & Y Coordinates,
// the Width of the user, and the Height of the user
let user = {
    x: 0,
    y: 50,
    w: 25,
    h: 25,
}

let val = 0; // Initializes val with value (0) *Place Holder for now

// Initialize arrays for game elements.
let enemies = [];
let bullets = [];
let healers = [];
let scorers = [];

let currentScore = 1;  // Initialize the user's score with 1.
let gameOver = false;  // gameOver gamestate (starts as false)


/**
 * setup()
 * This function is called once when the program starts and is used to set up the initial canvas size and other variables.
 */
function setup() {
    createCanvas(windowWidth - 25, windowHeight - 25);
    val = width / 4
}

/**
 * draw()
 * The main draw loop of the game, responsible for rendering game elements on the canvas.
 */
function draw() {
    background(0);

    push();

    rectMode(CENTER);
    rect(user.x, height - 50, 25, 25); // Draws the user's character.
    pop();

    health(val); // Displays the user's health.
    score(currentScore); // Displays the user's score.

    if (gameOver == false) {
        user.x = mouseX; // Controls the user's character with the mouse.

        drawBullets(); // Draws bullets.
        updateBullets(); // Updates bullet positions.

        collide(); // Checks for collisions with game elements.
        enem(); // Displays enemies.
        heal(); // Displays healers.
        scor(); // Displays scorers.
    }

    if (gameOver == true) {
        // For the 'Game Over!' message
        textAlign(CENTER);
        textSize(50);
        fill(255);
        text("Game Over!", width / 2, height / 2);
        return;
    }

    if (val < 0 || currentScore < 0) {
        // Checks if the player's health (val) is less than 0 or the current score is less than 0.
        gameOver = true; // Sets the game state to gameOver when either condition is met.
    }

    if (val > width / 2) {
        // Checks if the player's health (val) is greater than half of the canvas width.
        val--; // Decreases the player's health over time.
    }

}

/**
 * mousePressed()
 * Handles mouse clicks and performs actions based on the game state.
 */
function mousePressed() {
    // Creates a new bullet object at the mouse's position.
    let bullet = {
        x: mouseX,
        y: height - 25
    }
    bullets.push(bullet) // Adds the bullet to the array of bullets.
    if (gameOver === false) {
        // If the game is not over, decrease the player's health (val) by 5 when shooting.
        val -= 5
    }
    // If the game is over, reset the game for a new round (up to 10 rounds).
    if (gameOver === true) {
        for (i = 0; i < 10; i++) {
            gameOver = false
            val = width / 2 - width / 4
            currentScore = 1
        }
    }
}

/**
 * health(h)
 * Displays the player's health bar on the canvas based on the provided health value (h).
 */
function health(h) {
    let healthValue = h;
    let healthBar = {
        x: width / 2 - width / 4,
        y: 90,
        w: width / 2,
        h: 25, // Height of the health bar.
        c: map(healthValue, 0, 100, 0, 200) // Width of the filled portion based on health.
    }

    push();
    noStroke()
    rectMode(CORNER);
    fill(255, 0, 0);
    rect(healthBar.x, healthBar.y, healthBar.c, healthBar.h);
    pop()
}
/**
 * score(currentScore)
 * Display the user's current score on the canvas.
 */
function score(currentScore) {
    push()
    textSize(30);
    fill("white")
    text('SCORE : ' + currentScore, width / 2 - width / 10, height / 9)
    pop()
}

/**
 * updateBullets()
 * Update the positions of existing bullets, moving them upwards, and remove bullets that have gone off the screen.
 */
function updateBullets() {
    // Moves the existing bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 5;

        // Removes the bullets that have gone off screen
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

/**
 * drawBullets()
 * Draws bullets on the canvas
 */
function drawBullets() {
    // Draws individual bullets on the canvas at their respective positions.
    for (let i = 0; i < bullets.length; i++) {
        rect(bullets[i].x, bullets[i].y, 5, 10);
    }
}

/**
 * heal()
 * Generates healers (red squares) at random intervals to provide healing power-ups to the player.
 */
function heal() {
    push()
    if (random(0.1) < 0.001) { // Determines if a healer should be generated based on a random chance (can adjust 0.001 to control frequency).
        let healer = {
            x: random(width),
            y: 0,
            w: 20,
            h: 20
        }
        healers.push(healer); // Adds the healer to the array of healers.
    }

    // Draws healers
    for (let i = 0; i < healers.length; i++) {
        let healer = healers[i];
        fill("red");
        rect(healer.x, healer.y, healer.w, healer.h);
        healer.y += 5; // Speed of healers
    }
    pop()

}

/**
 * scor()
 * Generates scorers at random intervals to provide score-boosting power-ups to the player.
 */
function scor() {

    push()
    if (random(0.1) < 0.001) { // Determines if a scorers (yellow square) should be generated based on a random chance (can adjust 0.001 to control frequency).
        let scorer = {
            x: random(width),
            y: 0,
            w: 20,
            h: 20
        }
        scorers.push(scorer); // Adds the scorer to the array of healers.
    }

    // Draws yellow scorers
    for (let i = 0; i < scorers.length; i++) {
        let scorer = scorers[i];
        fill("yellow");
        rect(scorer.x, scorer.y, scorer.w, scorer.h);
        scorer.y += 5; // Speed of scorers
    }
    pop()

}

/**
 * enem()
 * Generates enemies at random intervals to make it dangerous for the player
 */
function enem() {
    if (random(currentScore + currentScore / 2) < currentScore / 8) { // Determines if a enemy (white square) should be generated based on a random chance (can adjust 0.001 to control frequency).
        let enemy = {
            x: random(width),
            y: 0,
            w: 20,
            h: 20
        }
        enemies.push(enemy);  // Adds the enemy to the array of enemies.
    }

    // Draws enemies
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        rect(enemy.x, enemy.y, enemy.w, enemy.h);
        enemy.y += 5; // Speed of enemies
    }
}

/**
 * collide()
 * Handles collision detection between bullets, enemies, user, healers, and scorers.
 */
function collide() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        for (let j = 0; j < enemies.length; j++) {
            let enemy = enemies[j];
            // Checks for collision between bullets and enemies.
            if (collideRectRect(bullet.x, bullet.y, 5, 10, enemy.x, enemy.y, enemy.w, enemy.h)) {
                bullets.splice(i, 1); // Removes the bullet
                enemies.splice(j, 1); // Removes the enemy
                currentScore++; // Increments the currentScore
            }
        }
    }

    for (let j = 0; j < enemies.length; j++) {
        let enemy = enemies[j];

        // Checks for collision between enemies and the player.
        if (collideRectRect(enemy.x, enemy.y, enemy.w, enemy.h, user.x, height - 50, user.w, user.h)) {
            gameOver = true
        }
    }

    for (let j = 0; j < healers.length; j++) {
        let healer = healers[j];
        // Checks for collision between healers and the player.
        if (collideRectRect(healer.x, healer.y, healer.w, healer.h, user.x, height - 50, user.w, user.h)) {
            val = val + 1
            healers.splice(j, 1);
        }
    }

    for (let j = 0; j < scorers.length; j++) {
        let scorer = scorers[j];
        // Checks for collision between scorers and the player.
        if (collideRectRect(scorer.x, scorer.y, scorer.w, scorer.h, user.x, height - 50, user.w, user.h)) {
            currentScore = currentScore + 1
            scorers.splice(j, 1);
        }
    }
}


