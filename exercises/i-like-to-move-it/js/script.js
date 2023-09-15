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

//Declares the square object and its attributes
let square1 = {
    x: 0,
    y: 250,
    square1Width: 100,
    square1Height: 100,
    speed: 0.5,
    fill: 0
};

//Declares the circle object and its attributes
let circle1 = {
    x: 250,
    y: 0,
    diameter: 100,
    speed: 0.5,
    fill: 0
};





/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);
}


/**
 * Description of draw()
*/
function draw() {
    //Randomizes the background color based on mouse position
    background(mouseX, mouseY, 0);
    //The X and Y axis are now attributed to the center (rather than top left)
    rectMode(CENTER);

    //Randomizes the square's width
    square1.square1Width = random(50,150);
    //Randomizes the square's height
    square1.square1Height = random(50,150);
    //Makes the square move to the right
    square1.x += square1.speed;
    
    //Fills the square's color
    fill(square1.fill);
    //Randomizes the square's color
    square1.fill = random(0,255);
    //Draws the square according to the previous specifications
    rect(square1.x, square1.y, square1.square1Width, square1.square1Height);

    //Makes the circle travel down
    circle1.y += circle1.speed;

    //Uses map to adjust the circle's diamater according to the position of the mouse
    circle1.diameter = map(mouseY,0,height,50,500);
    //Fills the circle color
    fill(circle1.fill);
    //Draws the circle according to the previous specifications
    circle(circle1.x, circle1.y, circle1.diameter);
    



}