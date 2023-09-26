/**
 * Exercise 2: Dodge Em
 * Alexander Terziyski
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

let covid19 = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
    fill: {
        r: 255,
        g: 0,
        b: 0
    }
};

let user = {
    x: 250,
    y: 250,
    size: 100,
    fill: {
        r: 255,
        g: 255,
        b: 255
    }
};

let numStatic = 1500;


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth,windowHeight);

    covid19.y = random(0,height);
    covid19.vx = covid19.speed;
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    // Displays static
    for (let i = 0; i < numStatic; i++) {
        let x = random(0,width);
        let y = random(0,height);
        stroke(255);
        point(x,y);
    }
    
    //Covid movement
    covid19.x = covid19.x + covid19.vx;
    covid19.y = covid19.y + covid19.vy;

    if (covid19.x > width){
        covid19.x = 0;
        covid19.y = random(0,height);
    }
    //Display Covid
    fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
    ellipse(covid19.x,covid19.y,covid19.size);


    //Display user
    fill(user.fill.r, user.fill.g, user.fill.b);
    ellipse(user.x, user.y, user.size);

    //Check for catching Covid
    let d = dist(user.x, user.y, covid19.x, covid19.y);
    if (d < covid19.size/2 + user.size/2){
        noLoop();
    }
    
    // Change user fill color based on distance
    if (d > covid19.size * 2.5 + user.size * 2.5) {
        user.fill.r = 0;
        user.fill.g = 255;
        user.fill.b = 0;
    } else if (d > covid19.size * 2 + user.size * 2) {
        user.fill.r = 255;
        user.fill.g = 125;
        user.fill.b = 0;
    } else { // Very close
        user.fill.r = 255;
        user.fill.g = 0;
        user.fill.b = 0;
    }

    

}
//User movement
function mouseDragged() {
    if (mouseIsPressed) {
        user.x = mouseX;
        user.y = mouseY;
    }
}
    
   

    