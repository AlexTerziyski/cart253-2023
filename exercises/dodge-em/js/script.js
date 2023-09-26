/**
 * Exercise 2: Dodge Em
 * Alexander Terziyski
 * 
 * This exercise dodges your responsibilities!
 * The further away the user clicks and drags his ellipse from the responsibilities image, the more green he turns.
 * If the user is at a medium distance he turns orange, and if he is dangerously close, he turns red! (this is all done using if and else statements)
 * If the user encounters his responsibilities the program stops.
 */

"use strict";

// Initializes responsibilities object with x & y position, its speed, height, width, and a place holder for the image
let responsibilitiesImg = {
    imgX: 0,            
    imgY: 250,          
    imgSpeed: 5,        
    img: null,
    imgWidth: 125, 
    imgHeight: 125          
};

/**
 * Preloads the responsibilities image before the program starts running
*/
function preload() {
    // Loads the image into responsibilitiesImg object 
    responsibilitiesImg.img = loadImage("assets/images/Responsibilities.png");
}

// Initializes user object with position on the canvas, size, and fill color
let user = {
    x: 500,
    y: 500,
    size: 100,
    fill: {
        r: 255,
        g: 255,
        b: 255
    }
};

// Initializes the static effect in the background of the canvas
let numStatic = 1500;

/**
 * Creates the canvas the size of your window
 */
function setup() {
    createCanvas(windowWidth, windowHeight);
}

/**
 * Draws the users ellipse, the static background, and the randomized responsibilitiesImg coming at the user
 */
function draw() {
    // Makes the background black
    background(0);

    // Displays the static in the background
    for (let i = 0; i < numStatic; i++) {
        let x = random(0, windowWidth);
        let y = random(0, windowHeight);
        stroke(255);
        point(x, y);
    }

    // Updates the image position
    responsibilitiesImg.imgX += responsibilitiesImg.imgSpeed;

    // Randomly resets image position when it goes off the right edge of the canvas
    if (responsibilitiesImg.imgX > windowWidth) {
        responsibilitiesImg.imgX = 0 - responsibilitiesImg.img.width;
        responsibilitiesImg.imgY = random(0, windowHeight); 
    }

    // Displays the moving image 
    image(responsibilitiesImg.img, responsibilitiesImg.imgX, responsibilitiesImg.imgY, responsibilitiesImg.imgWidth, responsibilitiesImg.imgHeight);

    // Displays user
    fill(user.fill.r, user.fill.g, user.fill.b);
    ellipse(user.x, user.y, user.size);

    // Checks for contact with responsibilities image
    let d = dist(user.x, user.y, responsibilitiesImg.imgX + responsibilitiesImg.img.width / 2, responsibilitiesImg.imgY + responsibilitiesImg.img.height / 2);
    if (d < responsibilitiesImg.img.width / 2 + user.size / 3) {
        noLoop();
    }

    // Changes the user's fill color based on distance (green for far, orange for medium distance, red for close)
    if (d > responsibilitiesImg.img.width * 2.5 + user.size * 2.5) {
        user.fill.r = 0;
        user.fill.g = 255;
        user.fill.b = 0;
    } else if (d > responsibilitiesImg.img.width * 2 + user.size * 2) {
        user.fill.r = 255;
        user.fill.g = 125;
        user.fill.b = 0;
    } else { // Very close to the image
        user.fill.r = 255;
        user.fill.g = 0;
        user.fill.b = 0;
    }
}

// User movement controlled by dragging (clicking and dragging)
function mouseDragged() {
    if (mouseIsPressed) {
        user.x = mouseX;
        user.y = mouseY;

    }
}

