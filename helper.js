/*
*******************************
*  Roland Weary information  *
*******************************
- A stupid, cruel soldier taken prisoner by the Germans along with Billy. 
- Unlike Billy, who is totally out of place in the war, 
- Weary is a deluded glory-seeker who fancies himself part of the Three Musketeers and saves Billy’s life out of a desire to be heroic.
pg. 33~38, pg. 48, pg. 51- contribution to group
pg. 39~40- items he had
pg. 41- appearance, 
pg. 42, pg. 49- his perspective
*\

/*
***********************
*  Utility Functions  *
***********************
Utility functions here are for specific purposes in our game.
*/

// Game Over Function
function GameOver(screen, win){
  screen.clear(); // Clear the screen
  screen.ctx.font = "Press Start 2P"; 
  screen.ctx.fillStyle = "white";
  screen.ctx.textAlign = "center";
  screen.ctx.fillText("This isn't right...", screen.width / 2, screen.height / 2);
}

/*
*******************************************
*  Classes for Creating Object Instances  *
*******************************************
  There are 2 classes in this game:
  1. Screen
  2. Sprite
*/

// Class Definition for Screen
class Screen {
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
  }

  // drawSprite method to simplify drawing sprite on screen from 8 inputs to 3 inputs
  drawSprite(sprite, x, y) {
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
  }

  // clear method to clear everything on the screen
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

// Class Definition for Sprite
class Sprite {
  constructor(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}