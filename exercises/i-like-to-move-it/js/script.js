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

let square1 = {
    x: 0,
    y: 250,
    square1Width: 100,
    square1Height: 100,
    speed: 2
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
    background(mouseX, mouseY, 0);
    rectMode(CENTER);

    square1.x += square1.speed;
    rect(square1.x, square1.y, square1.square1Width, square1.square1Height);
    



}