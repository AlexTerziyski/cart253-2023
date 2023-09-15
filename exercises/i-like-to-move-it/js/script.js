/**
 * Exercise: I like to move it!
 * Alexander Terziyski
 * 
 * 
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

//Attributes for the Square
let squareX, squareY, squareSize, squareSpeed, squareColor;
//Attributes for the Triangle
let triangleX, triangleY, triangleSize, triangleSpeed, triangleColor;
//Attributes for the Circle
let circleX, circleY, circleSize, circleSpeed, circleColor;

/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);

    //Initializes the Square
    squareX = random(width);
    squareY = random(height);
    squareSize = random(20, 50);
    squareSpeed = random(1, 3);
    squareColor = color(random(255), random(255), random(255));

    //Initializes the Triangle
    triangleX = random(width);
    triangleY = random(height);
    triangleSize = random(20, 50);
    triangleSpeed = random(1, 3);
    triangleColor = color(random(255), random(255), random(255));

    //Initializes the Circle
    circleX = random(width);
    circleY = random(height);
    circleSize = random(20, 50);
    circleSpeed = random(1,3);
    circleColor = color(random(255), random(255), random(255));
}


/**
 * Description of draw()
*/
function draw() {

}