/**
 * Conditionals Experiments
 * Alex Terziyski
 * 
 */

"use strict";

let angle=0;
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
    background(127);
    
    push();
    fill(255,0,0);
    rectMode(CENTER);
    translate(width/2,height/2);
    rotate(angle);
    scale(.25);
    rect(0,0,100,100);
    pop();

    angle = angle + 10;
}


