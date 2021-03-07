var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameState = 1;
var gameOver;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  gameOver = createSprite(200,200);
  gameOver.addImage("end",endImg);
  gameOver.visible = false;
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    
  
  if(gameState === 1) {
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if(cashG.isTouching(boy)) {
      cashG.destroyEach();
      score = score + 500;
    }
    if(diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score = score + 1500;
    }
    if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score + 1000;
    }
    if(swordGroup.isTouching(boy)) {
      gameState = 0;  
    }
  }
  
  if(gameState === 0) {
    swordGroup.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    cashG.destroyEach();
    boy.destroy();
    path.velocityY = 0;
    gameOver.visible = true;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: $"+ score,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}