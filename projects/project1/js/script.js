/**
 * Project 1
 * Alex Terziyski
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";

// Defines the rocketShip object with according attributes
let rocketShip = {
    img: null,   // Rocket image (null as a placeholder)
    x: 50,       // X position
    y: 0,        // Y position 
    width: 60,   // Rocket width
    height: 150  // Rocket height
  };

/**
* Preload function to load the rocket image
*/
function preload() {
    rocketShip.img = loadImage("assets/images/Rocket.gif");
  }
  
// gameState object that stores the initial boolean values
let gameState = {
    isGameStarted: false,
    isGameEnded: false,
    hasFailed: false,
    isTitleScreen: true,
  };
  
  // wordState object that stores the initial attributes for usage later
  let wordState = {
    words: [], 
    currentWord: '',
    correctWords: 0,
  };

/**
 * Description of setup
*/
function setup() {

}


/**
 * Description of draw()
*/
function draw() {

}