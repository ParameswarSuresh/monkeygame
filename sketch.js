
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var score=0;
var death=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400)

  monkey=createSprite(50, 330, 30, 30);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  
  ground =createSprite(200, 364, 900, 10);
  ground.velocityX=-7;
  ground.x=ground.width/2;
 
  
 
  foodGroup=new Group();
  obstacleGroup=new Group();
  
}


function draw() {
background("lightgreen");
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY=-12
  }
  
  if(ground.x < 0){
    ground.x=ground.width /2;
  }
 
   
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
  obstaclefunc();
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    reset();
    death=death+1;
  }
  
  drawSprites();
  stroke(0);
  textSize(15);
  fill(0);
  text("Score :"+ score, 300, 50);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivaltime=survivaltime + Math.round(getFrameRate()/60);
  text("Survival Time :" + survivaltime, 140, 50);
  
  stroke("black");
  textSize(15);
  fill(0);
  text("Death :"+death,40, 50);
}
function food(){
  if(World.frameCount%80===0){
    banana=createSprite(700, 600, 30, 30);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120, 285));
    banana.velocityX=-7;
    banana.lifetime=200;
    foodGroup.add(banana);
  }
}
function obstaclefunc(){
  if(World.frameCount%300===0){
    obstacle=createSprite(700, 390, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.4;
    obstacle.debug=false;
    obstacle.velocityX=-5; 
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0,220, 350);

  }
}
function reset(){
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  foodGroup.setVelocityEach(0);
 obstacleGroup.setVelocityEach(0);
  monkey.xPosition=50;
  monkey.yPosition=330;
  survivaltime=0;
  score=0;
if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY=0;
  }
}



