var petal;
var buttonGreen;
var buttonOrange;
var buttonPurple;
var buttonRed;
var buttonYellow;
var buttonBlue;
var buttonPink;
var buttonClear;
var colorSelected;

var activeButton;
var submitButton;

var socket;
var port = (process.env.PORT || 4000);
var mic;
var drawnFlower=false;
var cnv;
var micOn = false;
var drawingBoxSize;
document.addEventListener('touchstart', this.touchstart, {
  passive: false
});
document.addEventListener('touchmove', this.touchmove, {
  passive: false
});

function touchstart(e) {

  if (mouseX > 30 && mouseX < 180 && mouseY > 130 && mouseY < 430) {
    e.preventDefault();
  }
}

function touchmove(e) {
  if (mouseX > 30 && mouseX < 180 && mouseY > 130 && mouseY < 430) {
    e.preventDefault();
  }
}

function setup() {

  //  createCanvas(windowWidth * .9, windowHeight * .85);
    cnv = createCanvas(windowWidth-10, windowHeight-10);
cnv.parent("c");
    bg = loadImage('background.png');
    petal = createGraphics(450, 900);
    petal.pixelDensity(1);
    noSmooth();
    petal.noSmooth();
    frameRate(100);
    socket = io.connect(port);
    socket.on('flower', newFlower);

    buttonGreen= createButton("GREEN");
    // buttonGreen.mouseClicked(setActiveButtonGreen);
    buttonGreen.mouseClicked(colorGreen);
    buttonGreen.style('background-color','rgb(184,241,162)');
    buttonGreen.size(windowWidth*0.1, windowHeight*0.1);
    buttonGreen.position(width/9*0,windowHeight*.85);

    buttonOrange= createButton("ORANGE");
    buttonOrange.mouseClicked(colorOrange);
    buttonOrange.style('background-color','rgb(248,196,134)');
    buttonOrange.size(windowWidth*0.1, windowHeight*0.1);
    buttonOrange.position(width/9*1,windowHeight*.85);

    buttonPurple= createButton("PURPLE");
    buttonPurple.mouseClicked(colorPurple);
    buttonPurple.style('background-color','rgb(197,134,248)');
    buttonPurple.size(windowWidth*0.1, windowHeight*0.1);
    buttonPurple.position(width/9*2,windowHeight*.85);

    buttonRed= createButton("RED");
    buttonRed.mouseClicked(colorRed);
    buttonRed.style('background-color','rgb(248,134,134)');
    buttonRed.size(windowWidth*0.1, windowHeight*0.1);
    buttonRed.position(width/9*3,windowHeight*.85);

    buttonYellow= createButton("YELLOW");
    buttonYellow.mouseClicked(colorYellow);
    buttonYellow.style('background-color','rgb(255,215,65)');
    buttonYellow.size(windowWidth*0.1, windowHeight*0.1);
    buttonYellow.position(width/9*4,windowHeight*.85);

    buttonBlue= createButton("BLUE");
    buttonBlue.mouseClicked(colorBlue);
    buttonBlue.style('background-color','rgb(179,213,249)');
    buttonBlue.size(windowWidth*0.1, windowHeight*0.1);
    buttonBlue.position(width/9*5,windowHeight*.85);

    buttonPink= createButton("PINK");
    buttonPink.mouseClicked(colorPink);
    buttonPink.style('background-color','rgb(246,177,220)');
    buttonPink.size(windowWidth*0.1, windowHeight*0.1);
    buttonPink.position(width/9*6,windowHeight*.85);

    buttonClear= createButton("CLEAR");
    buttonClear.mouseClicked(clearCanvas);
    buttonClear.style('background-color','rgb(255,255,255)');
    buttonClear.size(windowWidth*0.1, windowHeight*0.1);
    buttonClear.position(width/9*7,windowHeight*.85);

    submitButton= createButton("SUBMIT");
    submitButton.mouseClicked(sendFlower);
    submitButton.style('background-color','rgb(255,255,255)');
    submitButton.size(windowWidth*0.1, windowHeight*0.1);
    submitButton.position(width/9*8,windowHeight*.85);

    // setActiveButtonGreen();
    colorGreen();
    clearCanvas();

    mic = new p5.AudioIn();
    mic.start();

    if (height>width) {
      drawingBoxSize= width*0.4;
    } else {
      drawingBoxSize= height*0.3;
    }
}

function newFlower(data) {
    petalImg = loadImage(data.petal, drawImg);
  }

function draw() {

  var vol = mic.getLevel();

  if (vol > .2 && drawnFlower) {
    sendFlower();
  }
    background(bg);
    text(vol,10,10);
    // noFill();
    strokeWeight(2);
    stroke(0);
    var petalBoxOffsetX = drawingBoxSize/4;
    var petalBoxOffsetY = drawingBoxSize/4;
    rect(petalBoxOffsetX, petalBoxOffsetY, drawingBoxSize, drawingBoxSize*2);
    image(petal, petalBoxOffsetX, petalBoxOffsetY, drawingBoxSize, drawingBoxSize*2);

    if (mouseIsPressed && mouseX >petalBoxOffsetX && mouseX < (petalBoxOffsetX+drawingBoxSize) 
    && mouseY >petalBoxOffsetY && mouseY < (petalBoxOffsetY+drawingBoxSize*2)
    && pmouseX >petalBoxOffsetX && pmouseX < (petalBoxOffsetX+drawingBoxSize) 
    && pmouseY >petalBoxOffsetY && pmouseY < (petalBoxOffsetY+drawingBoxSize*2)) {
      drawnFlower=true;
        petal.strokeWeight(30/150*drawingBoxSize/pixelDensity());
        petal.stroke(colorSelected);
        let mx = map(mouseX,petalBoxOffsetX,petalBoxOffsetX+drawingBoxSize,0,450);
        let my = map(mouseY,petalBoxOffsetY,petalBoxOffsetY+drawingBoxSize*2,0,900);
        let pmx = map(pmouseX,petalBoxOffsetX,petalBoxOffsetX+drawingBoxSize,0,450);
        let pmy = map(pmouseY,petalBoxOffsetY,petalBoxOffsetY+drawingBoxSize*2,0,900);
        petal.line(mx,my,pmx,pmy);
    }

    for (var currFlower = 0; currFlower<1; currFlower++) {
        var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
        var flowerScale = (.5 + .05*sin(radians(currFlower*70)))/3;
        for (var i = 0; i < petalCount; i++) {
          push();
          translate(width*3/4,height/2-vol*height);
          rotate(radians(i / petalCount * 360 + (5) * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
          translate(-petal.width/2*flowerScale, -petal.height*flowerScale);
          image(petal, 0, 0, petal.width*flowerScale, petal.height*flowerScale);
          pop();
        }
      }
      
}

function colorGreen() {
    colorSelected= color(184,241,162);
    // if (activeButton == 'green') {
    //     buttonGreen.style('background-color', 'black');
    //     colorSelected= color(184,241,162);
    // } else {
    //     buttonGreen.style('background-color', rgb(184,241,162));
    // }
    // buttonGreen.style('background-color', 'black');
}

// function setActiveButtonGreen() {
//     activeButton = 'green';
// }

function colorOrange() {
    colorSelected= color(248,196,134);
    // if (activeButton == 'orange') {
    //     buttonOrange.style('background-color', 'black');
    //     colorSelected= color(248,196,134);
    // } else {
    //     buttonGreen.style('background-color', rgb(184,241,162));
    // }
}

// function setActiveButtonOrange() {
//     activeButton = 'orange';
// }

function colorPurple() {
    colorSelected= color(197,134,248);
}

function colorRed() {
    colorSelected= color(248,134,134);
}

function colorYellow() {
    colorSelected= color(255,215,65);
}

function colorBlue() {
    colorSelected= color(179,213,249);
}

function colorPink() {
    colorSelected= color(246,177,220);
}

function clearCanvas() {
    petal.clear();
    // petal = createGraphics(150, 300);
    // petal.pixelDensity(1);
}

function sendFlower() {
    //proof of concept that we can use dataURL to store and send images
    //This will be replaced with websockets code to send from one sketch to another 
    var data = {
      id : 0,
      petal : petal.elt.toDataURL()
    };
    socket.emit('flower',data);
    console.log("sending");
    petal.clear();
    drawnFlower = false;
    }

    function mouseDragged() {
      mic.input.context.resume();
      return false;
    }

