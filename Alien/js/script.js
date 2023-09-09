/**
 * Drawing an Alien: Activity
 * Alex Terziyski
 * 
 * 
 * This is the first activity of the semester: Drawing an Alien!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
//creating canvas size
createCanvas(524,524);

//creating canvas color
background(50, 76, 168);
noStroke();

//creating alien body
fill(3, 252, 32)
ellipse(262,500,300,200);

//creating alien head
fill(11, 150, 27);
ellipse(262,350,200,300);

//creating alien eyes
fill(0);
ellipse(202,375,50,80);
ellipse(322,375,50,80);

//creating alien nostrils
fill(0);
ellipse(245,400,10,10);
ellipse(275,400,10,10);

//creating the mouth
stroke(176, 16, 16);
strokeWeight(25);
rectMode(CENTER);
rect(260,450,25,2);

stroke(0);
strokeWeight(10);
rectMode(CENTER);
rect(260,450,25,2);



}


/**
 * Description of draw()
*/
function draw() {

}