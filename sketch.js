const World=Matter.World;
const Engine=Matter.Engine;
const Bodies=Matter.Bodies;
const Body=Matter.Body;
const Composites=Matter.Composites;
const Composite=Matter.Composite;
const Constraint=Matter.Constraint;
var engine;

var world;

var bg;
var bunny,blink,sad,eat;
var ground,shelf;
var fruit;
var rope01,rope2;
var con1,con2;
var button1,button2;
var bubble,bubbleImg;

function preload(){
bg=loadImage("images/background.png");
blink=loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png")
sad=loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
eat=loadAnimation("images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png")
melon=loadImage("images/melon.png");
bubbleImg=loadImage("images/bubble.png");

}

function setup() {
  createCanvas(500,800);
  engine=Engine.create();
  world=engine.world;

  ground=new Ground(250,790,500,20);

  bunny=createSprite(350, 160, 70, 70);
  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("blinking");
  bunny.scale=0.2;

  shelf=new Ground(350,230,100,10);

  fruit_options={
    restitution:0.8
  }
  fruit=Matter.Bodies.circle(450,700,20,fruit_options);
  World.add(world,fruit);

  rope01=new Rope(5,{x:220,y:280});
  rope2=new Rope(4,{x:50,y:450});

  con1=new Link(rope01,fruit);
  con2=new Link(rope2,fruit);

  button1=createImg("images/cut_btn.png");
  button1.position(220,300);
  button1.size(50,50);
  button1.mouseClicked(drop)

  button2=createImg("images/cut_btn.png");
  button2.position(30,420);
  button2.size(50,50);
  button2.mouseClicked(drop2)

  bubble=createSprite(280,480,20,20);
  bubble.addImage(bubbleImg);
  bubble.scale=0.1;
}

function draw() {
  background(bg); 
  image(melon,fruit.position.x,fruit.position.y,70,70) ;
  ground.display();
  shelf.display();
  rope01.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true){
    drop1()
    bubble.visible=false;
    World.remove(world,fruit);
    fruit=null;
    bunny.changeAnimation(eating);

  }
  if(collide(fruit,bubble,40)==true){
    world.gravity.y=-1;
    bubble.position.x=fruit.position.x
    bubble.position.y=fruit.position.y


  }
  drawSprites();
  Engine.update(engine);
}

function drop(){
  rope01.break();
  con1.dettach();
  con1=null;

}

function drop2(){
  rope2.break();
  con2.dettach();
  con2=null;

}

function collide(body,sprite,x){
  if(body!=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
  }

  if(d<=x){
    return true
  }
  else{
    return false
  }

}