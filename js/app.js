/*global $, jQuery, setTimeout, console, Resources, document, ctx*/
/* jshint esversion: 6 */
let allEnemies = [];
let velocity = 100;


let checkCollision = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (playerOne.x < allEnemies[i].x + 65 && playerOne.x + 55 > allEnemies[i].x && playerOne.y < allEnemies[i].y + 40 && 60 + playerOne.y > allEnemies[i].y) {
            console.log("boom");
            playerOne.reset();
        }
    }
};



// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.width = 100;
        this.speed = velocity;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;
        if (this.x > 505) {
            this.x = 0;
        }
        checkCollision();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let createEnemies = function(){
    let posX = [80, 20, 200, 60, 150, 100],
        posY = [50, 55, 140, 145, 220, 222],
        bug1 = new Enemy(posX[Math.floor((Math.random()*4))], posY[Math.floor((Math.random()*5))]),
        bug2 = new Enemy(posX[Math.floor((Math.random()*4))], posY[Math.floor((Math.random()*5))]),
        bug3 = new Enemy(posX[Math.floor((Math.random()*4))], posY[Math.floor((Math.random()*5))]);
        allEnemies = [bug1, bug2, bug3];
        allEnemies.forEach(function(enemy) {
        enemy.speed = velocity + (Math.random() * (20 - 1) - 1); 
    });
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        //Image for our player
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-boy.png';
    }
    
    update(dt) {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 400) {
            this.x = 400;
        } else if (this.y < -10) {
            this.y = -10;
        } else if (this.y > 400) {
            this.y = 400;
        }
        if (this.y === -10) {
            this.reset();
        }
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(direction) {
        if (direction == 'left') {
            this.x -= 100;
        } else if (direction == 'right') {
            this.x += 100;
        } else if (direction == 'up') {
            this.y -= 82;
        } else if (direction == 'down') {
            this.y += 82;
        }
        
        checkCollision();
    }
    
    reset() {
        this.x = 200;
        this.y = 400;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called playerOne
let playerOne = new Player();
createEnemies();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
$(document).on('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    playerOne.handleInput(allowedKeys[e.keyCode]);
});
