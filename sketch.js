var track,track2;
var player;
var bg, bgImage;
var gameOverImage;

var obstacle1Group,obstacle2Group;
var playerImage;
var playerleftImage;
var score=0;
var obstacleRightImage,obstacleImage;
var invisImage,invis;
var skipImage, skip;
var insImage;
var pb,pbImage;
var startImage;
var START=0;
var PLAY=1;
var END=2;
var gameState=START;

var obstacle2Groupl2;
var obstacle1Groupl2;
var invisl2;
var skipl2;



function preload() {
  bgImage=loadImage("Background.jpg");
  gameOverImage=loadImage("Game Over.jpg");
playerImage=loadAnimation("Bird_Image_1.png", "Bird_Image_2.png", "Bird_Image_3.png", "Bird_Image_4.png");
playerleftImage=loadAnimation("leftbird_1.png","leftbird_2.png","leftbird_3.png","leftbird_4.png");
obstacleRightImage=loadImage("Obstacle 1.PNG");
obstacleImage=loadImage("Obstacle_2.png");
invisImage=loadImage("Invis.png");
insImage=loadImage("start.PNG");
pbImage=loadImage("Pb.png");


}


function setup() {
  createCanvas(500,displayHeight-105);
  bg=createSprite(250,(displayHeight-105)/2,20,20);
  
  bg.scale=2.25;

   track=createSprite(150,displayHeight/2,10,displayHeight);
   track2=createSprite(350,displayHeight/2,10,displayHeight);
player=createSprite(200,500,20,20);
player.shapeColor="cyan";
player.addAnimation("bird",playerImage);
player.addAnimation("left",playerleftImage);
player.scale=0.2;
player.setCollider("circle",0,0,50);



obstacle1Group=new Group();
obstacle2Group=new Group();
invis=createSprite(390,displayHeight/2+200,50,50);
invis.addImage(invisImage);
invis.scale=0.1;
skip=createSprite(420,displayHeight/2+200,50,50);
obstacle1Groupl2=new Group();
obstacle2Groupl2=new Group();

startImage=createSprite(250,325);
startImage.addImage("instructions",insImage);
startImage.scale=1.1;

pb=createSprite(375,575,50,50);
pb.addImage("playbutton",pbImage);
pb.scale=0.4;



invisl2=createSprite(390,displayHeight/2+150,50,50);
invisl2.addImage(invisImage);
invisl2.scale=0.1;
invisl2.visible=false;


skipl2=createSprite(420,displayHeight/2+150,50,50);
skipl2.visible=false;



}

function draw() {
  


if(gameState===START){
  
if(mousePressedOver(pb)){
  player.x=155;
  gameState=PLAY;
  startImage.visible=false;
  pb.visible=false;
  console.log("Hello");
}

}

if(gameState===PLAY){
  startImage.destroy();
  bg.addImage( "clouds",bgImage);

spawnLeftObstacles();
spawnRightObstacles();

score=Math.round(frameCount/20);


if(player.isTouching(track) && keyDown("RIGHT_ARROW")){
player.x=345;
}



if(player.isTouching(track)){
  player.changeAnimation("bird",playerImage);
 // console.log("leftTrack");
}

if(player.isTouching(track2)){
  player.changeAnimation("left",playerleftImage);
  //console.log("rightTrack");
}

if(player.isTouching(track2) && keyDown("LEFT_ARROW")){
  player.x=155;
  }


  if(player.isTouching(obstacle1Group)|| player.isTouching(obstacle2Group)){
    gameState=END;
 
  }

  if(mousePressedOver(invisl2)){
    obstacle1Group.destroyEach();
    obstacle2Group.destroyEach();
    invis.destroy();
  }

  if(mousePressedOver(skipl2)){
    for(var i=0;i<obstacle1Group.length;i++){
      obstacle1Group.get(i).y=600;
    }
    for(var k=0;k<obstacle2Group.length;k++){
      obstacle2Group.get(k).y=600;
    }
    skip.destroy();
  }
  
  drawSprites();
fill("#ff0011");
textSize(20);
textFont("Courier New");
textStyle(BOLD);
  text("Score: "+score,30,30);


  if(score===100){
    gameState="level 2";
  }
    
}


if(gameState===END){
  drawSprites();
  bg.addImage("clouds",gameOverImage);
  bg.scale=1.25;
  //text("Game Over",250,displayHeight/2);
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  track.destroy();
  track2.destroy();
  player.destroy();
  skipl2.visible=false;
  skip.visible=false;
  invisl2.visible=false;
  invis.visible=false;

}

if(gameState==="level 2"){
  bg.addImage( "clouds",bgImage);
  score=Math.round(frameCount/20);
obstacle1Group.destroyEach();
obstacle2Group.destroyEach();
  spawnLeftObstacles2();
  spawnRightObstacles2();
  skip.destroy();
  invis.destroy();
  skipl2.visible=true;
  invisl2.visible=true;

if(player.isTouching(track) && keyDown("RIGHT_ARROW")){
player.x=345;
}



if(player.isTouching(track)){
  player.changeAnimation("bird",playerImage);

}

if(player.isTouching(track2)){
  player.changeAnimation("left",playerleftImage);
  
}

if(player.isTouching(track2) && keyDown("LEFT_ARROW")){
  player.x=155;
  }


  if(player.isTouching(obstacle1Groupl2)|| player.isTouching(obstacle2Groupl2)){
    gameState=END;
 
  }

  if(mousePressedOver(invisl2)){
    obstacle1Groupl2.destroyEach();
    obstacle2Groupl2.destroyEach();
    invisl2.destroy();
  }

  if(mousePressedOver(skipl2)){
    for(var i=0;i<obstacle1Groupl2.length;i++){
      obstacle1Groupl2.get(i).y=600;
    }
    for(var k=0;k<obstacle2Groupl2.length;k++){
      obstacle2Groupl2.get(k).y=600;
    }
    skipl2.destroy();
  }
  
  drawSprites();
fill("#ff0011");
textSize(20);
textFont("Courier New");
textStyle(BOLD);
  text("Score: "+score,30,30);


  if(score===200){
    gameState="level 3";
  }
    
}


if(gameState===END){
  drawSprites();
  bg.addImage("clouds",gameOverImage);
  bg.scale=1.25;
  //text("Game Over",250,displayHeight/2);
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  track.destroy();
  track2.destroy();
  player.destroy();
}
  
}



function spawnLeftObstacles(){
  if(frameCount%229===0){
    var obstacle=createSprite(170,0,20,20);
    obstacle.addImage("obLeft",obstacleRightImage);
    obstacle.scale=0.05;
    obstacle.velocityY=2;
    obstacle.shapeColor="white";
    obstacle1Group.add(obstacle);
    

    obstacle.setCollider("circle",-90,0,30);

  }
}


function spawnRightObstacles(){
  if(frameCount%279===0){
    var obstacleRight=createSprite(330,0,20,20);
    obstacleRight.addAnimation("obRight",obstacleImage);
    obstacleRight.scale=0.1;
    obstacleRight.velocityY=2;
    obstacleRight.shapeColor="black";

    obstacleRight.setCollider("circle", 50,0,30);

  obstacle2Group.add(obstacleRight);
  }
}

function spawnRightObstacles2(){
  if(frameCount%167===0){
    var obstacleRight=createSprite(330,0,20,20);
    obstacleRight.addAnimation("obRight",obstacleImage);
    obstacleRight.scale=0.1;
    obstacleRight.velocityY=5;
    obstacleRight.shapeColor="black";

    obstacleRight.setCollider("circle", 50,0,30);

  obstacle2Groupl2.add(obstacleRight);
  }
}

function spawnLeftObstacles2(){
  if(frameCount%127===0){
    var obstacle=createSprite(170,0,20,20);
    obstacle.addImage("obLeft",obstacleRightImage);
    obstacle.scale=0.05;
    obstacle.velocityY=5;
    obstacle.shapeColor="white";
    obstacle1Groupl2.add(obstacle);
    

    obstacle.setCollider("circle",-90,0,30);

  }
}

// Level 1: 229, 279
// Level 2: 
