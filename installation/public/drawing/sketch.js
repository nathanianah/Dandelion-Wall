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

window.addEventListener('touchstart', this.touchstart, {
    passive: false
  });
  window.addEventListener('touchmove', this.touchmove, {
    passive: false
  });
  
  
  function touchstart(e) {

    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      e.preventDefault();
    }
  }
  
  function touchmove(e) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        e.preventDefault();
    }
  }

function setup() {
  //  createCanvas(windowWidth * .9, windowHeight * .85);
    createCanvas(windowWidth, windowHeight*.85);

    bg = loadImage('background.png');
    petal = createGraphics(150, 300);
    petal.pixelDensity(1);
    noSmooth();
    socket = io.connect(port);
    socket.on('flower', newFlower);

    buttonGreen= createButton("GREEN");
    // buttonGreen.mouseClicked(setActiveButtonGreen);
    buttonGreen.mouseClicked(colorGreen);
    buttonGreen.style('background-color','rgb(184,241,162)');
    buttonGreen.size(50, 50);

    buttonOrange= createButton("ORANGE");
    buttonOrange.mouseClicked(colorOrange);
    buttonOrange.style('background-color','rgb(248,196,134)');
    buttonOrange.size(50, 50);

    buttonPurple= createButton("PURPLE");
    buttonPurple.mouseClicked(colorPurple);
    buttonPurple.style('background-color','rgb(197,134,248)');
    buttonPurple.size(50, 50);

    buttonRed= createButton("RED");
    buttonRed.mouseClicked(colorRed);
    buttonRed.style('background-color','rgb(248,134,134)');
    buttonRed.size(50, 50);

    buttonYellow= createButton("YELLOW");
    buttonYellow.mouseClicked(colorYellow);
    buttonYellow.style('background-color','rgb(255,215,65)');
    buttonYellow.size(50, 50);

    buttonBlue= createButton("BLUE");
    buttonBlue.mouseClicked(colorBlue);
    buttonBlue.style('background-color','rgb(179,213,249)');
    buttonBlue.size(50, 50);

    buttonPink= createButton("PINK");
    buttonPink.mouseClicked(colorPink);
    buttonPink.style('background-color','rgb(246,177,220)');
    buttonPink.size(50, 50);

    buttonClear= createButton("CLEAR");
    buttonClear.mouseClicked(clearCanvas);
    buttonClear.style('background-color','rgb(255,255,255)');
    buttonClear.size(50, 50);

    submitButton= createButton("SUBMIT");
    submitButton.mouseClicked(sendFlower);
    submitButton.style('background-color','rgb(255,255,255)');
    submitButton.size(50, 50);

    // setActiveButtonGreen();
    colorGreen();
    clearCanvas();
}

function newFlower(data) {
    petalImg = loadImage(data.petal, drawImg);
  }

function draw() {
    background(bg);
    // noFill();
    strokeWeight(2);
    stroke(0);
    var petalBoxOffsetX = 30;
    var petalBoxOffsetY = 130;
    rect(petalBoxOffsetX, petalBoxOffsetY, 150, 300);
    image(petal, petalBoxOffsetX, petalBoxOffsetY);

    if (mouseIsPressed) {
        petal.strokeWeight(10);
        petal.stroke(colorSelected);
        petal.line(mouseX - petalBoxOffsetX, mouseY - petalBoxOffsetY, pmouseX - petalBoxOffsetX, pmouseY - petalBoxOffsetY);
    }

    for (var currFlower = 0; currFlower<1; currFlower++) {
        var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
        var flowerScale = .5 + .05*sin(radians(currFlower*70));
        for (var i = 0; i < petalCount; i++) {
          push();
          translate(width*3/4,height/2);
          rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
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
    }
