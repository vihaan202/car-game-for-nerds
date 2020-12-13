class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1image);

    car2 = createSprite(300,200);
    car2.addImage(car2image);

    car3 = createSprite(500,200);
    car3.addImage(car3image);

    car4 = createSprite(700,200);
    car4.addImage(car4image);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    
    if(allPlayers !== undefined){
      //var display_position = 100;

      background(76,76,76)
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5)
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipse(x,y,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        textAlign(CENTER)
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y-75 )
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance  = player.distance+random(10,50)
      console.log(player.distance)
      player.update();
    }

    if(player.distance>3420){
      Player.updateFinishedPlayers()
      gameState = 2
      console.log(gameState)
    }

    drawSprites();
  }
}
