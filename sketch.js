
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
var ground;
var gameState=PLAY;
var PLAY=1;
var END=0;
var obstacle,obstacleImage;
var jungle,jungleImage;
var bananaCollected=0;
function preload(){
  obstacleImage=loadImage("obstacle.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  jungleImage=loadImage("360_F_321717755_bmJHIOL43Nj0nn4flaHQjoGmLB0Obut3.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 500);
  jungle=createSprite(200,290,10,10);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=2.5;
  jungle.velocityX=-5;
  jungle.x = jungle.width /2;
  
  
  obstacle=createSprite(433,434);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  
  
  monkey=createSprite(200,435,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.139;
  monkey.setCollider("circle",0,0,279);
  monkey.debug=false; 
  
    score=0
}


function draw() {
  background("green");
  if(jungle.x < 0){
    jungle.x = jungle.width/2;
}
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
    jungle.velocityX = -(5 + 2*score/100);
 if(keyDown("space") && monkey.y >677) {
      monkey.velocityY = -2;
    }     
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
  monkey.collide(jungle);
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }}
  else if (gameState === END) {
    fill("red");
    textSize(50)
    text ("Game Over",200,200);
    
    ground.destroy();
   
    monkey.destroy();
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    
 
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function foods() {
  
  if (frameCount % 150 === 0) {
    var food = createSprite(600,300,40,10);
    banana.y = Math.round(random(240,260));
    banana.addImage(foodImage);
    banana.scale = 0.1;
    banana.velocityX = -(3 + 3*score/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    bananaGroup.add(banana);
    
    if(monkey.isTouching(banana)) {
       banana.destroy(); 
    }
    
  }
  
}

function obstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,355,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(3 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

 