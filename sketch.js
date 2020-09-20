var dog, happyDog, database, foodS, foodStock,dogImage;
var Button,Button1;
var fedTime,lastFed;
var food;
var feed;
var foodObj; 
var feedFood;

function preload()
{
 dogImage=loadImage("images/Dog.png");
 happyDog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000, 400);
  food=new Food();
  dog=createSprite(250,250,10,10);
  dog.scale=0.1;
  dog.addImage(dogImage);
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  food.display();

  
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  
textSize(15);
if (lastFed>=12){
    text("lastFeed :"+lastFed%12 + "pm",350,30);
}else if(lastFed==0){
    text("last Feed:12AM",350,30);
}else{
    text("last Feed :"+lastFed+"AM",340,30);
}

  
  drawSprites();

}

function readStock (data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}




function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
    
  })
}

