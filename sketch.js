var monkey, monkeyRunning, monkeyCollided;
var ground;

var  banana, bananaImage, bananaGroup;
var  obstacle, obstaclesGroup, obstacle; 

var survivalTime;

function preload(){
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 500);
  
  monkey = createSprite(50,460,20,50);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale=0.2;
  
  ground = createSprite(600,490,600,20);
  ground.shapeColor="black"
  ground.velocityX=-4
  ground.x = ground.width /2;

  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
  
}

function draw() {
  background("grey");

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : "+ survivalTime, 250,50);
  survivalTime = survivalTime + Math.round(frameRate()/60);
    
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 300) {
     monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
    
  spawnBananas();
  spawnObstacles();
     
  obstaclesGroup.setLifetimeEach(500);
  bananaGroup.setLifetimeEach(500);  

  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,465,10,40);
   obstacle.addImage("obstacles",obstacleImage)
   obstacle.velocityX = -6; 
   obstacle.scale=0.3;
   obstacle.collide(ground);
   obstacle.lifetime = 500;
   obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,420,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale=0.2;
    banana.lifetime = 500;
    bananaGroup.add(banana);
  }
}