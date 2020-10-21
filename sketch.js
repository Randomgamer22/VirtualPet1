var dog, hungryDog, happyDog, database, foodS, foodStock;

function preload()
{
  hungryDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(hungryDog);

  foodStock = database.ref("Food")
  foodStock.on("value", readStock);
}


function draw() {  
  background('#339966')

  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyDog);
  }
  textSize(20);
  fill("white");
  stroke("black");
  text("FoodStock: "+ foodStock, 190, 50);

  drawSprites();
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {

  if(x == 0){
    x = 0;
  }else {
    x=x-1
  }
  database.ref('/').update({
    Food: x
  });
}



