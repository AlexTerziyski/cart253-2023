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

let circle = {
    x: 0,
    y: 250,
    size: 100,
    speed: 1,
    fill: 255
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
    background(backgroundShade);

  
    circle.x += circle.speed;
    circle.x = constrain(circle.x,0,width);

    

    circle.fill = map(circle.x,0,width,0,255);
    fill(circle.fill);
    ellipse(circle.x, circle.y, circle.size);

    
    
}
