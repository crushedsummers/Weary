$(document).ready(function() {
/**************
*  Variables  *
***************
	Here are the global variables we'll use in our game.*/

	// Variable for overall set up
	var screen, gameOver = false, win = false, score = 0, invaders_image; 

	// Variables for frames to control screen's updates
	var frames, levelFrame, motion;

	// Variables for the sprites
	var alienSprite, helmetSprite, scarfSprite, heartSprite, textSprite, thinkSprite, systemSprite, treeSprite, gunSprite, baseSprite;

	// Variables for storing the game objects
	var aliens, helmet, scarf, heartCanvas, gunCanvas, dialouge, textCanvas, thinkCanvas, system, tree;

	// Variable for game control
	var alien_direction;

/***************************
*  Main Function - main()  *
****************************
	The main() function is the main entry point to run our game.*/

	function main(){
	    // Repeatedly loop and update the game & draw the result on the screen
	    // let loop = function() {
	      update();
	      draw();

	  //     if(!gameOver){
	  //       window.requestAnimationFrame(loop, screen.canvas);
	  //     } else{
	  //       //call gameover function
	  //       GameOver(screen, win);
	  //     }
	  //   }
	  //   window.requestAnimationFrame(loop, screen.canvas);
	}

/*************************************
*  Initialization Function - init()  *
**************************************
	init() function helps us initialize and start off our game 
	by preparing the sprites we need and put them in the right positions.
	Once the sprite is loaded, we can the main() function to start the main loop!*/
	
	function init(){
	    //name of Screen object is screen
	    if (screen == null){
	      screen = new Screen(1280,540);

	    }
	    gameOver = false;
	    win = false;
	    frames = 0; // Calculating screen's update using variables for frames
	    motion = 0; //for alien, either 0 or 1
	    levelFrame = 60;//frames required before switching to next level AKA when aliens come forward

	 	// Assigning image source
	    invaders_image = new Image();
	    invaders_image.src = "global/fullspritesheet.png";

	    $(invaders_image).on("load", function(){
			alienSprite = [
				[new Sprite(this, 0,0,431,307), new Sprite(this, 0,307,429,619)], //first alien, cropping img file
				[new Sprite(this,432,0,736,304), new Sprite(this, 430,315,736,619)] //second alien
			];
			heartSprite = new Sprite(this, 741, 0, 890, 143);
	  		textSprite = new Sprite(this, 737, 142, 914, 284);
	  		thinkSprite = new Sprite(this, 737, 284, 945, 421);
			systemSprite = new Sprite(this, 893, 13, 1005, 126);
			treeSprite = new Sprite(this, 988, 0, 1358, 797);
			gunSprite = new Sprite(this, 1358, 297, 2556, 802);
			baseSprite = new Sprite(this, 0, 802, 1992, 990);
			helmetSprite = new Sprite(this, 0, 990, 2556, 1230);
			scarfSprite = new Sprite(this, 0, 1230, 2556, 1514);

			helmet = {
		      sprite: helmetSprite,
		      x: 0,
		      y: 0,
		      width: helmetSprite.width,
		      height: helmetSprite.height
		    }
		    scarf = {
		      sprite: scarfSprite,
		      x: 0,
		      y: screen.height - scarfSprite.height,
		      width: scarfSprite.width,
		      height: scarfSprite.height
	     	}
     		main();
		});
 	}

/*******************************
*  Update Function - update()  *
********************************
	update() function helps you update the positions and check for events (collisions, bullet shots).*/

	function update(){
	}

/***************************
*  Draw Function - draw()  *
****************************
	draw() function helps you display the game onto the screen.*/

	function draw(){
		screen.clear();
		screen.ctx.fillStyle = "white";
		screen.ctx.fillRect(0,0,screen.width,screen.height);
		screen.ctx.save();

		screen.drawSprite(helmet.sprite, helmet.x, helmet.y);
		screen.drawSprite(scarf.sprite, scarf.x, scarf.y);
	}

init();
});
