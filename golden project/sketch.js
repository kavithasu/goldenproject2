const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var ground,groundimage;
var horse,horseimage;
var obstacle,obstacleimage;
var invisiableground;
var gameover,gameoverimage;
var obstacleGroup;
var horsestading,horsestandingimage;
var gameState=1;


function preload(){
groundimage=loadImage("background.jpg")
horseimage=loadAnimation("horse final.gif")
obstacleimage=loadImage("brick final.png")
gameoverimage=loadImage("game over1.jpg")
horsestandingimage=loadAnimation("horse standing.png")

}

function setup() {
  createCanvas(500,500);

  engine = Engine.create();
  world = engine.world;

  ground=createSprite(500,200,800,100);
  ground.addImage(groundimage);
  ground.scale=4;
  //ground.x=ground.width/2
 
horse=createSprite(45,400,10,10);
horse.addAnimation("running",horseimage)
horse.addAnimation("standing",horsestandingimage)
horse.scale=0.2;

invisiableground=createSprite(250,450,500,20);
invisiableground.visible=false

obstacleGroup=new Group();

}

function draw() {
  background(180);
  Engine.update(engine);
  if(gameState===1){
    ground.velocityX=-2;

  if(keyDown("space")&& horse.y >=370) {
    horse.velocityY = -8;
}

horse.velocityY = horse.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
console.log(ground.x)

if(horse.isTouching (obstacleGroup)){
  gameState=0
}
  
createobstacle();
} else if(gameState===0){
 ground.velocityX=0;
 obstacleGroup.setVelocityXEach(0);
 obstacleGroup.setLifetimeEach(-1); 
 gameover=createSprite(250,250,10,10);
 gameover.addImage(gameoverimage);
 gameover.scale=0.5;
horse.changeAnimation("standing",horsestandingimage)
}
horse.collide(invisiableground)
drawSprites()
}




function createobstacle(){
  if(frameCount%200===0){
    obstacle=createSprite(400,425,20,20);
    obstacle.addImage(obstacleimage);
    obstacle.velocityX=-2;
    obstacle.lifetime=800;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
 }