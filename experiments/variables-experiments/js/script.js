/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 200;

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
    background(backgroundShade);
    ellipse(circleX, circleY, circleSize);
    
}
