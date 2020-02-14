$(document).ready(function() {

/*************************
*  Variables  - COMPLETE *
**************************/

  // Systems Variables
  const HEIGHT = $("#cursor").height();
  const WIDTH = $("#cursor").width();
  var interval;
  const alienSprite = [
      ["global/a1.png", "global/a2.png"], 
      ["global/a1.png", "global/a2.png"],
      ["global/b1.png", "global/b2.png"],
      ];
  
  //Game Variables
  var countdown = 5, aliensAlive = [], alienMovement = [], score=0, levelFrame = 3000, motion, frames = 0, gameOver = false, alienTag = 0;
/**************************************
*  Main Function - main()  - COMPLETE *
***************************************
  The main() function is the main entry point to run our game.*/

  function main(){
    console.log("main function activated");
      if(gameOver==false){
       update();
       draw();
       //update frames
      } 
      else{
        //call gameover function
          clearInterval(interval);
          console.log("gameOver function activated");
          $(".set").attr("style", "display: none");
          $(".gameset").attr("style", "display: none");
          $("#scoreCount").attr("style", "display: none");
          $("#retry").attr("style", "display: block");
          setInterval(function(){countDown()}, 1000);
      }
  }

/*************************************
*  Initialization Function - init()  *
**************************************
init() function helps us initialize and start off our game 
by preparing the sprites we need and put them in the right positions.
Once the sprite is loaded, we can the main() function to start the main loop!*/
  function init(){
    console.log("init function activated");
    gameOver = false;
    aliensAlive = [];
    aliensMovement = [];
    motion = 0;
    for (let i = 0; i<$(".aliens").length; i++){
      let check = $("#"+i);
      check.remove();
    }
    alienTag = 0;
    countdown = 5;
    
    //ALIENS
      //sorting alien sprites
      

    //DIALOGUE (HIDDEN)
      

    //call main function to start game
    interval = setInterval(function(){main()}, 1000);
  }

/*******************************
*  Update Function - update()  *
********************************
update() function helps you update the positions and check for events (collisions, bullet shots).*/
  function update(){
    console.log("update function activated");
    // Create a generateAlien function to generate aliens
      function generateAlien(){
        console.log("generating new alien...");
        let skin =alienSprite[Math.floor(Math.random() * alienSprite.length)][0];
        let positionTop = Math.floor(Math.random() * (575-312));
        let positionLeft = Math.floor(Math.random() * (2163-440));
        let newAlien = $('<img id = '+alienTag+' class="aliens 5" style="top: '+(positionTop+209)+'px; left: '+(positionLeft)+'px" src='+ skin +'>;');
        
        //determine what type of alien
        // newAlien.src = alienSprite[Math.floor(Math.random() * alienSprite.length)][motion];
  
        aliensAlive.push(newAlien);
        //tracks alien's current frame, if >5, die, should be the same order as aliens entering
        alienMovement.push(0);
        $('#inGame').append(newAlien);
        console.log("alien generated");
      }

    // //update motion
    //   if (motion == 0){
    //     motion = 1;
    //   }
    //   else {
    //     motion = 0;
    //   }

    //frame update
    frames+=1000;
    console.log(frames);
    $("#scoreCount").html(score);
    $("#scoreCount").attr("color", "white");
    if(frames%levelFrame == 0){
      generateAlien();
      alienTag++;

    //CHALLENGE: change alienMovement interval
      switch (score) {
        case 0: levelFrame = 8000; 
        case 5: levelFrame = 6000; 
        case 20: levelFrame = 4000; 
        case 40: levelFrame = 2000; 
        case 60: levelFrame = 1000; 
      }

    //If player clicks on the aliens, they die and give points
      $(".aliens").click(function(){
        console.log("clicked on an alien");
          if ($(this).src == alienSprite[2][0]){
            console.log("a lot of points received");
            score += 8
          }
          else{
            console.log("points received");
            score += 3
          }
          $(this).remove();
          
      })

    //Initiate Dialogue

  }
  // Check for game over
  for (let i = 0; i<$(".aliens").length; i++){
    
    let check = $("#"+i);

       if (check.hasClass("0")){
            console.log(check);
            gameOver = true;
          } 
          else if (check.hasClass("1")){
            console.log(check);
            check.removeClass("1");
            check.addClass("0");
          }
          else if (check.hasClass("2")){
            console.log(check);
            check.removeClass("2");
            check.addClass("1");
          }
          else if (check.hasClass("3")){
            console.log(check);
            check.removeClass("3");
            check.addClass("2");
          }
          else if (check.hasClass("4")){
            console.log(check);
            check.removeClass("4");
            check.addClass("3");
          }
         else if (check.hasClass("5")){
            console.log(check);
            check.removeClass("5");
            check.addClass("4");
          }
      }}
/***************************
*  Draw Function - draw()  *
****************************
draw() function helps you display the game onto the screen.*/
  function draw(){
    console.log("draw function activated");
    //aliens display

    //score display

    //dialogue options display
    
  }

/**********************************************
*  Handling User's Inputs & Clicks  - COMPLETE*
***********************************************
This handles the user's inputs / clicks for controlling the game. */
  
  //Make the cursor picture follow your cursor 
    $(document).mousemove(function(event){
      $("#cursor").css({"top": event.pageY - HEIGHT/2, "left": event.pageX - WIDTH/2})
    });
  //cursor animation
    $(document).on("mousedown", function(){
      $(cursor).css("transform", "scale(1.5)")
    })
    $(document).on("mouseup", function(){
      $(cursor).css("transform", "scale(1)")
    })
    
    function countDown(){
    if(countdown == 0){
      goBack();
    }
    else{
      countdown -= 1;
      $("#retry").html(countdown);
    }
   }
     // When retry button is click, restart the game.
    function goBack() {
      console.log("retry button pressed");
      init();
      $(".set").attr("style", "display: block");
      $(".gameset").attr("style", "display: block");
      $("#retry").attr("style", "display: none");
      $("#scoreCount").attr("style", "display: block");
    };

/*************************************************
*  Run the init function to kick start the game  *
**************************************************
This will run the init() function to load the resources, and eventually start the main loop.*/
  init();
});