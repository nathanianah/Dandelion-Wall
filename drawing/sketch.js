var socket;
var port = (process.env.PORT || 4000);
var petalImg;
var petalGraphic;
var imageIsLoaded;

function setup() {
 createCanvas(400,600); 
 petalGraphic = createGraphics(150, 300); //buffer graphic
 petalGraphic.pixelDensity(1);
imageIsLoaded= false;
   socket = io.connect(port);
    socket.on('flower', newFlower);
}

function newFlower(data) {
  petalImg = loadImage(data.petal, drawImg);
}

function drawImg() {
  //call back function so there's no errors if image is loaded yet
  imageIsLoaded = true;
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
image(petalGraphic, petalBoxOffsetX, petalBoxOffsetY);

//if drawing in the box
if (mouseIsPressed) {
  petalGraphic.noStroke();
  petalGraphic.fill(255, 0, 0);
  petalGraphic.ellipse(mouseX - petalBoxOffsetX, mouseY - petalBoxOffsetY, 15, 15);
}

/*
//this code would exist in a different sketch that is just visualizations 
if (imageIsLoaded) {
  var petalCount = 12;
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(450, 300);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount))));
    translate(-petalImg.width/2, -petalImg.height);
    image(petalImg, 0, 0);
    pop();
  }
}
*/
}

function mouseClicked() {
//proof of concept that we can use dataURL to store and send images
//This will be replaced with websockets code to send from one sketch to another 
var data = {
  id : 0,
  petal : petalGraphic.elt.toDataURL()
};
socket.emit('flower',data);
}


