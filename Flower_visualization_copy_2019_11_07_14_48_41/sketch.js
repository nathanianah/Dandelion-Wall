var petalImg;
var petal;
var imageIsLoaded = false;
var numFlowers;
var flowersXPos;
var flowersYPos;


function setup() {
  createCanvas(windowWidth, windowHeight);
  petal = createGraphics(150, 300); //buffer graphic

    numFlowers=1;
 flowersXPos = [];
flowersYPos = [];
flowersXPos[0] = width/2;
flowersYPos[0] = height/2;
}

function draw() {
  
  background(255);
  
  //drawing the bounding box for petal and the graphics buffer
  noFill();
  strokeWeight(2);
  stroke(0);
  var petalBoxOffsetX = 10;
  var petalBoxOffsetY = 10;
  rect(petalBoxOffsetX, petalBoxOffsetY, 150, 300);
  image(petal, petalBoxOffsetX, petalBoxOffsetY);

  //if drawing in the box
  if (mouseIsPressed) {
    petal.noStroke();
    petal.fill(255, 0, 0);
    petal.ellipse(mouseX - petalBoxOffsetX, mouseY - petalBoxOffsetY, 15, 15);
  }

  //this code would exist in a different sketch that is just visualizations 
if (imageIsLoaded) {

  for (var currFlower = 0; currFlower<numFlowers; currFlower++) {
  var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
  var flowerScale = .25 + .05*sin(radians(currFlower*70));
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(flowersXPos[currFlower],flowersYPos[currFlower]);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
    translate(-petalImg.width/2*flowerScale, -petalImg.height*flowerScale);
    image(petalImg, 0, 0, petalImg.width*flowerScale, petalImg.height*flowerScale);
    pop();
  }
}
}
}

function mouseClicked() {
  //proof of concept that we can use dataURL to store and send images
  //This will be replaced with websockets code to send from one sketch to another 
  petalImg = loadImage(petal.elt.toDataURL(), drawImg);
  
  if (mouseX>150) {
     flowersXPos[numFlowers]= mouseX;
  flowersYPos[numFlowers]= mouseY;
numFlowers++; 
  }
}


function drawImg() {
  //call back function so there's no errors if image is loaded yet
  imageIsLoaded = true;
}