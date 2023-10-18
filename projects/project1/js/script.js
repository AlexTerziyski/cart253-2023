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

/**
* Function that handles crucial keyboard input during the game.
*/
function keyPressed() {
    if (gameState.isTitleScreen && keyCode === 32) { // keyCode 32 means the SPACEBAR
      startGame();
    } else if (gameState.isGameStarted) {
      if (keyCode === ENTER) { // Used at the end of the game if you want to play again
        startGame();
      } else {
        if (key === wordState.currentWord[0]) {
          // Checks if the key matches the first letter of the currentWord.
          // If it matches the player typed the letter correctly.
          wordState.currentWord = wordState.currentWord.substring(1); // Progresses the word by removing the first character.
          if (wordState.currentWord.length === 0) {
            wordState.correctWords++; // Updates the amount of correctWords you've typed to have your score at the end
            wordState.currentWord = random(wordState.words); // Gives you a new random word
            alienHead(); // changes the background for the Alien design
          }
        }
      }
    } else if (gameState.isGameEnded && keyCode === ENTER) { // Starts the game again if you press 'ENTER' at the end
      startGame();
    }
  }

/**
* Function that draws the rocket ship and controls its movement.
*/
function drawRocket() {
    if (!gameState.isTitleScreen) {
      image(rocketShip.img, rocketShip.x, rocketShip.y, rocketShip.width, rocketShip.height);
      rocketShip.y -= 10; // Moves the rocket upwards
    }
  
    if (rocketShip.y < -rocketShip.height) {
      endGame(); // Ends the game when the rocket goes off the top of the canvas
    }
  }

/**
*  This function is for drawing the Alien
*/
function alienHead() {
    // Clears the canvas and set the background to black
    background(220);
    stroke(0);
  
    // Sets the position of the alien's head
    let centerX = width / 2;
    let centerY = height / 2;
  
    // Alien's head
    fill(100, 200, 100); // Green color for the head
    noStroke();
    ellipse(centerX, centerY, 100, 120);
  
    // Alien's eyes
    fill(255); // White color for the eyes
    ellipse(centerX - 30, centerY - 30, 30, 30);
    ellipse(centerX + 30, centerY - 30, 30, 30);
  
    // Alien's pupils
    fill(0); // Black color for the pupils
    ellipse(centerX - 30, centerY - 30, 10, 10);
    ellipse(centerX + 30, centerY - 30, 10, 10);
  
    // Alien's mouth
    noFill();
    stroke(255); // White color for the mouth
    arc(centerX, centerY + 20, 60, 40, 0, PI);
  
    // Alien's antennae
    stroke(100, 200, 100); // Green color for the antennae
    strokeWeight(4);
    line(centerX - 20, centerY - 60, centerX - 20, centerY - 90);
    line(centerX + 20, centerY - 60, centerX + 20, centerY - 90);
  }

/**
* This function is to be used and drawn at the end screen as a celebratory design for finishing the simulation
*/
function celebration() {
    background(255); // White background for the celebration
  
    // Creates random conffetti shapes and colors to be displayed
    for (let i = 0; i < 100; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 20);
      let angle = random(TWO_PI); // Random angle for rotation
      let confettiColor = color(random(255), random(255), random(255));
  
      fill(confettiColor);
      noStroke();
  
      // Randomly chooses between rectangle and ellipse for confetti shape
      if (random() > 0.5) {
        rect(x, y, size, size);
      } else {
        push();
        translate(x, y);
        rotate(angle);
        ellipse(0, 0, size);
        pop();
      }
    }
  }