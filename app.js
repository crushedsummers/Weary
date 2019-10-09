$(document).ready(function() {
/**************
*  Variables  *
***************
	Here are the global variables we'll use in our game.
	*/

	// Variable for overall set up
	var screen, gameOver = false, win = false, var score = 0;
	var invaders_image, helmet_image, scarf_image, gun_image, heart_image, tree_image, text_image, think_image, dialouge_image, system_image; 

	// Variables for frames to control screen's updates
	var frames, levelFrame, motion;

	// Variables for the sprites
	var alienSprite;

	// Variables for storing the game objects
	var aliens;

	// Variable for game control
	var alien_direction;

	//Constants
	const PI = Math.PI, const HEIGHT = canvas.height, const WIDTH = canvas.width;

	/*
		OBJECTS
		var ai = {
			x: null,
			y: null,
			width: 20,
			height: 100,
			update: function() {
				//ai hit balls, ai follow ball
				let target;
				if(ball.speedy >2){
					target = ball.y - ((this.height - ball.size))/4;
				}
				else if(ball.speedy<-2){
					target = ball.y - (this.height + (ball.size))/4;
				}
				else if(ball.speedy >4){
					target = ball.y - ((this.height - ball.size))/8;
				}
				else if(ball.speedy<-4){
					target = ball.y - (this.height + (ball.size))/8;
				}
				else{
					target = ball.y - ((this.height - ball.size))/2;
				}
				//this.y += (target - this.y) * 0.1;
				this.y += (target - this.y) * aiChallenge;
			},
			draw: function() {
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
	*/

/***************************
*  Main Function - main()  *
****************************
	The main() function is the main entry point to run our game.
	*/

	function main(){
	    // Repeatedly loop and update the game & draw the result on the screen
	    let loop = function() {
	      update();
	      draw();
	      if(!gameOver){
	        window.requestAnimationFrame(loop, screen.canvas);
	      } 
	      else{
	        //call gameover function
	        GameOver(screen, win);
	      }
	    }
	    window.requestAnimationFrame(loop, screen.canvas);
	  }

/*************************************
*  Initialization Function - init()  *
**************************************
	init() function helps us initialize and start off our game 
	by preparing the sprites we need and put them in the right positions.
	Once the sprite is loaded, we can the main() function to start the main loop!
	*/
	
	function init(){
	    // Creating screen - only if it is not there yet
	    //name of Screen object is screen
	    //null = empty = none = acune
	    if (screen == null){
	      screen = new Screen(1280,540);

	    }

	    gameOver = false;
	    win = false;

	    // Calculating screen's update using variables for frames
	    frames = 0;
	    motion = 0;//for alien, either 0 or 1
	    levelFrame = 60;//frames required before switching to next level AKA when aliens come forward
	    alien_direction = 1;//1 = right, -1 = left

	 	// Assigning image source
	    invaders_image = new Image();
	    invaders_image.src = "global/sprite-sheet.png";

	    $(invaders_image).on("load", function(){
			alienSprite = [
				// Parameters for Sprite => (image's src, top left corner x, y, width, height)
				[new Sprite(this, 0,0,428,308), new Sprite(this, 0,310,427,620)], //first alien, cropping img file
				[new Sprite(this,428,0,733,305), new Sprite(this, 427,316,733,620)] //second alien
			]
			
		helmet_image = new Image();
	    helmet_imagee.src = "global/helmet.png";
	    helmet = {
	    	x: 0,
			y: 0,
			width: WIDTH,
			height: 100,
	    }

	    //let citySprite = this.sprite;
      	//this.ctx.drawImage(citySprite.img, citySprite.x, citySprite.y, citySprite.width, citySprite.height, 68 + 111 * i, 0, citySprite.width, citySprite.height);

		scarf_image = new Image();
	    scarf_imagee.src = "global/scarf.png";

		gun_image = new Image();
	    gun_imagee.src = "global/gun.png";

		heart_image = new Image();
	    heart_imagee.src = "global/heart.png";

		tree_image = new Image();
	    tree_imagee.src = "global/tree.png";

		text_image = new Image();
	    text_imagee.src = "global/dialogue-text.png";

		think_image = new Image();
	    think_imagee.src = "global/dialogue-think.png";	    

		dialouge_image = new Image();
	    dialouge_imagee.src = "global/dialogue-base.png";	  

		system_image = new Image();
	    system_imagee.src = "global/system.png";	 

		/*
			// Create alien objects
			aliens = [];
			let rows = [1, 0, 0];
			for (let i = 0; i < rows.length; i++){
				for(let z = 0; z<10;z++){
					let alienType = rows[i];
						aliens.push({
						sprite: alienSprite[alienType],
						x: 30+z * 30 + [0,4,0][alienType],
						y: 30+i*30,
						width: alienSprite[alienType][0].width,
						height: alienSprite[alienType][0].height
					})
				}
			}
		*/
	 	 // Calling the main function when the picture is ready after load
	      main();
	    });
 	}

/*******************************
*  Update Function - update()  *
********************************
	update() function helps you update the positions and check for events (collisions, bullet shots).
	*/

	function update(){
		//if(!gameOver) ball.update();
		//player.update();
		//ai.update();
	}

/***************************
*  Draw Function - draw()  *
****************************
	draw() function helps you display the game onto the screen.
	*/

	function draw(){
		
		ctx.fillRect(0,0,WIDTH,HEIGHT);

		ctx.save();
		ctx.fillStyle = "white";
		//Draw the objects
		ball.draw();
		ai.draw();
		player.draw();

		//keep things in a block
		let w = 4;
		let x = (WIDTH - w)/2;
		let y = 0;
		let step = HEIGHT/15;
		while(y<HEIGHT){
			ctx.fillRect(x,y+step*0.25,w,step*0.5);
			y+=step;
		}

		//score
		const prepareFontLoad = (fontList) => Promise.all(fontList.map(font => document.fonts.load(font )))
		async function WriteCanvasText() {
			 ctx.font="100px 'Press Start 2P'"
			 ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
			if (score < 10){
				ctx.fillText(score, (WIDTH/2)-45, (HEIGHT/2)+57);
			}
			else {
				ctx.fillText(score, (WIDTH/2)-94, (HEIGHT/2)+57);
			}

		}
		WriteCanvasText()

		ctx.restore();
	}
	

	main();
	init();
});
