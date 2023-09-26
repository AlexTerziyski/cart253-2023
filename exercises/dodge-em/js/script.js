/**
 * Exercise 2: Dodge Em
 * Alexander Terziyski
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let responsibilitiesImg = {
    imgX: 0,            // Initial X position of the image
    imgY: 250,          // Y position of the image (you can change this as needed)
    imgSpeed: 5,        // Speed of the image
    img: null
};

/**
 * Description of preload
*/
function preload() {
    // Load the image into the responsibilitiesImg object
    responsibilitiesImg.img = loadImage("assets/images/Responsibilities.png");
}

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

let numStatic = 1500;

/**
 * Description of setup
 */
function setup() {
    createCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {
    background(0);

    // Displays static
    for (let i = 0; i < numStatic; i++) {
        let x = random(0, windowWidth);
        let y = random(0, windowHeight);
        stroke(255);
        point(x, y);
    }

    // Update image position
    responsibilitiesImg.imgX += responsibilitiesImg.imgSpeed;

    // Reset image position when it goes off the right edge of the canvas
    if (responsibilitiesImg.imgX > windowWidth) {
        responsibilitiesImg.imgX = 0 - responsibilitiesImg.img.width;
        responsibilitiesImg.imgY = random(0, windowHeight); // You can randomize the Y position if needed
    }

    // Display the moving image (responsibilitiesImg)
    image(responsibilitiesImg.img, responsibilitiesImg.imgX, responsibilitiesImg.imgY);

    // Display user
    fill(user.fill.r, user.fill.g, user.fill.b);
    ellipse(user.x, user.y, user.size);

    // Check for catching the moving image
    let d = dist(user.x, user.y, responsibilitiesImg.imgX + responsibilitiesImg.img.width / 2, responsibilitiesImg.imgY + responsibilitiesImg.img.height / 2);
    if (d < responsibilitiesImg.img.width / 2 + user.size / 2) {
        noLoop();
    }

    // Change user fill color based on distance
    if (d > responsibilitiesImg.img.width * 2.5 + user.size * 2.5) {
        user.fill.r = 0;
        user.fill.g = 255;
        user.fill.b = 0;
    } else if (d > responsibilitiesImg.img.width * 2 + user.size * 2) {
        user.fill.r = 255;
        user.fill.g = 125;
        user.fill.b = 0;
    } else { // Very close
        user.fill.r = 255;
        user.fill.g = 0;
        user.fill.b = 0;
    }
}

// User movement
function mouseDragged() {
    if (mouseIsPressed) {
        user.x = mouseX;
        user.y = mouseY;
    }
}
