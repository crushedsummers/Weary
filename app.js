$(document).ready(function() {
	var ctx = document.getElementById("canvas").getContext("2d");
	var gameOver = false;
	var score = 0;
	var startScore = false;
	var prevScore = 0
	var aiChallenge = 0.1;

	//VARIABLES/CONSTS
	const PI = Math.PI;
	const HEIGHT = canvas.height;
	const WIDTH = canvas.width;
	const UP_KEY = 38, DOWN_KEY = 40;

	//USER INPUT
	var keyPressed = null;

	//OBJECTS
	var player = {
		x: null,
		y: null,
		width: 20,
		height: 100,
		update: function() {
			//key press
			if(keyPressed == UP_KEY) {
				if (this.y > 11){
					this.y -= 10;
				}
			}
			if(keyPressed == DOWN_KEY && (this.y < HEIGHT - this.height - 11)) this.y += 10;
		},
		draw: function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
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
	var ball = {
		x: null,
		y: null,
		size: 20,
		speedx: null,
		speedy: null,
		speed: 5,
		update: function() {
			this.x += this.speedx;
			this.y += this.speedy;

			//check collision
			//top and bottom boundaries 
			if(this.y >= (HEIGHT-ball.size) || this.y <= 0){
				this.speedy *= -1;
			}

			//function for players collisions
			//input a is always the ball
			//input b is always the player
			function checkCollision(a,b){
				return((a.x < b.x + b.width) && (a.y < b.y + b.height) && (b.x < a.x + a.size) && (b.y < a.y + a.size));
			}

			//simplify checking procedure
			let other;
			//if it's going left
			if(ball.speedx < 0){
				//check player
				other = player;
			}
			else {
				other = ai;
			}

			//check for collision (boolean)
			let collided = checkCollision(ball, other);

			if (collided){
				//check angle parameter (insert reflections and mechanics!)
				let n = (this.y + this.size - other.y) / (other.height + this.size);
				let phi = 0.25 * PI * (2*n-1);
				this.speedx = this.speed * Math.cos(phi);
				this.speedy = this.speed * Math.sin(phi);

				if(other == ai) this.speedx *= -1;
				if (other == player && startScore == true) {
					score += 1;
				}
			}

			if(this.x > WIDTH || this.x < -this.size){
				gameOver = true;
				$("button").fadeIn();
				//check who wins
				if (this.x > WIDTH){
					$("h1").html("You Win!");
				}
				else {
					$("h1").html("You Lose!");
				}
			}

		},
		draw: function() {
			ctx.fillRect(this.x, this.y, this.size, this.size);
		}
	}

	function main(){
		//make them exist, position them
		init();

		var loop = function(){
			update();
			draw();
			window.requestAnimationFrame(loop, canvas);
		}

		window.requestAnimationFrame(loop, canvas);
	}

	function init(){
		gameOver = false;
		score = 0;
		startScore = false;
		prevScore = 0;
		player.height = 100;
		ai.height = 100;
		ball.speed = 5;

		// Change title
		$("h1").html("Pong");

		//player position
		player.x = 20;
		player.y = (HEIGHT-player.height)/2;

		//enemy position
		ai.x = 660;
		ai.y = (HEIGHT-ai.height)/2;

		//ball position
		ball.x = (WIDTH-ball.size)/2;
		ball.y = (HEIGHT-ball.size)/2;

		//initialise speed of ball
		ball.speedx=ball.speed;
		//randomise initial direction

		//math.round(math.random()) = either 0 or 1
		//any number in a if statement that aint 0 or negative, is true
		//if (1), ball.speedx = -10
		//if (0), ball speed != -10, aka = 10
		if(Math.round(Math.random())) ball.speedx *= -1;
		ball.speedy = 0;		
	}

	function update(){
		if(!gameOver) ball.update();
		player.update();
		ai.update();
	}

	function draw(){
		console.log(ball.speedy);
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

		//CHALLENGES!
		if(score != prevScore){
			player.height = player.height - (score*0.5);
			ai.height = ai.height - (score*0.5);
			aiChallenge = 0.1+(score*0.1);
			ball.speed = ball.speed + 1;
			prevScore++;
			//console.log("ball speed is: "+ball.speed+" height is"+player.height);
		}

		ctx.restore();
	}
	

	$(document).on("keyup", function() {
		keyPressed = null;
	});

	//if function needs input, use e!!
	$(document).on("keydown", function(e){
		keyPressed = e.which;
		if(keyPressed == UP_KEY || keyPressed == DOWN_KEY) startScore = true;
	});
	$("button").on("click", function() {
		$(this).hide();
		init();
	});

	main();
});