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
* Creates the canvas and initializes the game.
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    //random words stored as strings in an array
    wordState.words = ["alien", "cosmos", "astronomy", "galaxy", "telescope", "exploration", "universe", "extraterrestrial", "orbit", "cosmic", "celestial", "rocket", "planet", "mars", "asteroid", "interstellar", "cosmonaut", "lunar", "spacetime", "comet", "cosmology", "stellar", "spacesuit", "observatory", "cosmonaut", "astronaut", "gravity", "launch", "telemetry", "moonwalk", "starship", "outerspace", "redshift", "galactic", "meteorite", "extraplanetary", "constellation", "exploratory", "quasar", "martian", "astronomer", "nucleosynthesis", "blackhole", "nebula", "interplanetary", "stellarwind", "ufo", "supernova", "spaceshuttle", "solarsystem", "astrobiology"];
    textAlign(CENTER, CENTER);
    textSize(32);
    frameRate(5); // Sets the frame of the screen to 5 (can be changed to make the rocket move faster or slower)
    displayTitleScreen();
  }


/**
 * Description of draw()
*/
function draw() {

}