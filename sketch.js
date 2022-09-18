var gameState = "Play";
var ground, groundImage, bg, bgImage;
var mario, mAnimation;
var obstacle, obstacleAnimation, coin, coinsImage;
var score;
var obstaclesGroup, coinsGroup;
var jumpSound, dieSound, checkPointSound;
var collidedAnimation;
var gameOver, gameOverImage, restart, restartImage;
var highScore=0;


function preload() {
mAnimation=loadAnimation("mario01.png","mario02.png","mario03.png")
groundImage=loadImage("ground2.png")
obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
bgImage=loadImage("bg.png")
coinImage=loadImage("coin.png")
marioCollied=loadAnimation("collided.png")

}

function setup() {
  createCanvas(600, 400);
  bg=createSprite(200,200,600,400)
  bg.addImage(bgImage)
  bg.x=bg.width/2
  bg.scale=1.1
mario=createSprite(50,300,10,14)
mario.addAnimation("running",mAnimation)
mario.addAnimation("collided",marioCollied)
mario.scale=1.5
ground=createSprite(200,370,250,10)
ground.addImage(groundImage)
ground.scale=1.0
obstaclesGroup=new Group()
coinsGroup=new Group()
score=0
}


function draw() {
  background(210);
  if(gameState==="Play"){
  if(keyDown("SPACE")&&mario.y>150){
    mario.velocityY=-10
  }
mario.velocityY +=0.8
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
  ground.velocityX=-10
  spawnObstacle()
  spawnCoin()

if(mario.isTouching(obstaclesGroup)){
  gameState="End"
  mario.changeAnimation("collided")

}
for(i=0;i<coinsGroup.length;i++){
if(mario.isTouching(coinsGroup.get(i))){
score=score+1
coinsGroup.get(i).destroy()

  
}
} 
}
else if(gameState==="END"){
ground.velocityX=0
mario.velocityY=0
obstaclesGroup.setVelocityXEach(0)
}

mario.collide(ground)
drawSprites()
textSize(18)
text("SCORE"+score,350,40)
}

function spawnObstacle()
{
if(frameCount%100===0){
  obstacle=createSprite(600,315,10,30)
  obstacle.velocityX=-3
  obstacle.addAnimation("obs",obstacleAnimation)
  obstacle.scale=0.7
  obstacle.lifeTime=170
  obstaclesGroup.add(obstacle)
  
}
}
function spawnCoin()
{
if(frameCount%150===0){
  coin=createSprite(600,315,10,30)
  coin.velocityX=-3
  coin.addImage(coinImage)
  coin.scale=0.7
  coin.lifeTime=170
  coinsGroup.add(coin)
  coin.y=Math.round(random(170,200))
}
}