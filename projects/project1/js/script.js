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
* Main drawing function that handles the different gameStates and draws the according texts.
*/
function draw() {
    if (gameState.isTitleScreen) {
      // Displays the title screen
      background(220);
      fill(0); 
      textSize(32);
      text("Type as many words as you can before the block hits the top of the screen!", width / 2, height / 2 - 30);
      text("Press Spacebar to enter the program.", width / 2, height / 2 + 30);
    } else if (gameState.isGameStarted) {
      // Displays the game screen
      background(220);
      fill(0); 
      textSize(32);
      stroke(100, 200, 100); // Sets stroke color to green
      strokeWeight(2);
      text(wordState.currentWord, width / 2, height / 2);
      drawRocket();
    } else if (gameState.isGameEnded) {
      // Displays the end screen
      background(220);
      fill(0); 
      textSize(32);
      noStroke(); // Reset stroke settings
      celebration(); // Calls the celebration function to display confetti
      // Displays the current count of correctly typed words (using template literals) on the canvas
      text(`Game Over! You typed ${wordState.correctWords} words.`, width / 2, height / 2 - 30);
      text("Press Enter to restart.", width / 2, height / 2 + 30);
    }
  }

/**
* Function that displays the title screen with according starting boolean attributes for the game state.
*/
  function displayTitleScreen() {
    gameState.isTitleScreen = true;
    gameState.isGameStarted = false;
    gameState.isGameEnded = false;
  }
  
/**
* Starts the game simulation with according wordState attributes
*/
  function startGame() {
    gameState.isTitleScreen = false;
    gameState.isGameStarted = true;
    wordState.currentWord = random(wordState.words); // Provides the random words you see on the screen
    wordState.correctWords = 0; // Used for tracking how many correct words you will have correctly typed at the end
    rocketShip.y = height - rocketShip.height; // Makes the rocket move up
    gameState.isGameEnded = false; 
  }
  
/**
* THis function ends the game and transitions into the end screen/state.
*/
  function endGame() {
    gameState.isGameStarted = false;
    gameState.isGameEnded = true;
  }