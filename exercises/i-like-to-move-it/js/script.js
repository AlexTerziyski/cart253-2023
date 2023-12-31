/**
 * Exercise: I like to move it!
 * Alexander Terziyski
 * 
 * Draws 3 different shapes (circle, square, and a triangle) that all interact in different ways
 * The square randomizes is width, height, and color, while moving to the right until it goes off the screen
 * The circle's diameter fluctates depending on the position of the mouse on the Y axis using map(), moving downward
 * the triangle moves to the left until it is stopped by constrain() at the border of the canvas
 * the background changes color depending on the position of your mouse on the screen (X and Y axis)
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

//Declares the triangle object and its attributes
let triangle1 = {
    x1: 400,
    y1: 300,
    x2: 500,
    y2: 300,
    x3: 450,
    y3: 200,
    speed: 3,
    
};





/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);
}


/**
 * Draws the square, circle, and triangle
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

    //Makes the triangle move to the left
    triangle1.x1 -= triangle1.speed;
    triangle1.x2 -= triangle1.speed;
    triangle1.x3 -= triangle1.speed;

    //Constrains the triangle so that when it hits the border on the left it stops
    triangle1.x1 = constrain(triangle1.x1,0,width);
    triangle1.x2 = constrain(triangle1.x2,100,width);
    triangle1.x3 = constrain(triangle1.x3,50,width);

    //Makes the triangle pink
    fill(255,0,255);

    //Draws the triangle according to the previous specifications
    triangle(triangle1.x1, triangle1.y1, triangle1.x2, triangle1.y2, triangle1.x3, triangle1.y3);
    



}