var buttons = [];
var buttonColors=[];
var colorSelected = [];
var petal = [];
var ptouches = [];
var json= {};
var paddingX= 420;
var paddingY= 10;
var flowerX = [250,250,window.innerWidth-250,window.innerWidth-250];
var flowerY= [400,400+window.innerHeight/2,200,200+window.innerHeight/2];
var smallerPetal;
var largerPetal;

function setup() {
  json.flowers=[];
  createCanvas(windowWidth, windowHeight);
    petal[0] = createGraphics(150, 300); //buffer graphic
      petal[1] = createGraphics(150, 300); //buffer graphic
    petal[2] = createGraphics(150, 300); //buffer graphic
      petal[3] = createGraphics(150, 300); //buffer graphic
      smallerPetal = createGraphics(150,300);

      try {
        port = (process.env.PORT || 4000);
        } catch {
          
        }
      socket = io.connect(port);
      socket.on('flower', newFlower4);
  
  buttonColors[0]= color(223,51,133);
  buttonColors[1]= color(230,160,216);
  buttonColors[2]= color(167,215,189);
  buttonColors[3]= color(240,186,78);
  buttonColors[4]= color(250,132,0);
  buttonColors[5]= color(250,250,250);
  
  for (var i=0; i<4; i++) {
   buttons[i] = [];
      for (var j=0; j<5; j++) {
   buttons[i][j]= createButton(" ");
    buttons[i][j].size(height/20,height/20);
   
    buttons[i][j].style('background-color',buttonColors[j]);  
      
  }
          for (var j=5; j<6; j++) {
   buttons[i][j]= createButton("Clear");
    buttons[i][j].size(height/20,height/20);

    buttons[i][j].style('background-color',buttonColors[j]);  
      
  }
  }
  
  buttons[0][5].style("transform", "rotate(90deg)");
    buttons[1][5].style("transform", "rotate(90deg)");
    buttons[2][5].style("transform", "rotate(270deg)");
    buttons[3][5].style("transform", "rotate(270deg)");
  
    for (var i=0; i<2; i++) {
       for (var j=0; j<6; j++) {
      buttons[i][j].position(20,height/15*j+i*height/2+height/15); 
    }}

      for (var i=0; i<2; i++) {
       for (var j=0; j<6; j++) {
      buttons[i+2][j].position(width-height/15,height-(height/15*j+i*height/2+height/7.5)); 
    }}
  
  
buttonClickingSetup();
   buttons[0][0].style('border-color', color(0, 0, 0));
   buttons[1][0].style('border-color', color(0, 0, 0));
   buttons[2][0].style('border-color', color(0, 0, 0));
   buttons[3][0].style('border-color', color(0, 0, 0));
  
  colorSelected[0]=buttonColors[0];
  colorSelected[1]=buttonColors[0];
  colorSelected[2]=buttonColors[0];
  colorSelected[3]=buttonColors[0];
  
  buttons[0][5].touchStarted(clearFlower0);
    buttons[1][5].touchStarted(clearFlower1);
    buttons[2][5].touchStarted(clearFlower3);
    buttons[3][5].touchStarted(clearFlower2);

}

function newFlower4(data) {

  console.log(data.petal);
  largerPetal = loadImage(data.petal,addNewFlower4);
  }
  
  function addNewFlower4(data) {
    smallerPetal.image(largerPetal,0,0,smallerPetal.width,smallerPetal.height);
    var d = smallerPetal.elt.toDataURL();
    smallerPetal.clear();
    json.flowers.push(d);
    //flowers.push(new GeneratedFlower(json.flowers.length-1, random(0,width), random(0,height)));
    let xpos = random(width);
    
     for (let i = 0; i < 5; i++) {
      addBoid(new Boid(json.flowers.length-1,xpos+random(-100,100),height,4));
      numFlowers++;
    }
    
    console.log("new flower");
    }

function clearFlower0() {
  petal[0].clear();
}

function clearFlower1() {
  petal[1].clear();
}

function clearFlower2() {
  petal[2].clear();
}

function clearFlower3() {
  petal[3].clear();
}

function newFlower0() {
 newFlower(petal[0].elt.toDataURL(),0); 
 
  flowerX[0]=250;
  flowerY[0]=400;
  var largerPetal = createGraphics(450,900);
  largerPetal.pixelDensity(1);
  largerPetal.image(petal[0],0,0,450,900);
  var data = {
    id : 0,
    petal : largerPetal.elt.toDataURL()
  };
  socket.emit('flower',data);
  petal[0].clear();
}

function newFlower1() {
 newFlower(petal[1].elt.toDataURL(),1); 
   
    flowerX[1]=250;
  flowerY[1]=400+height/2;
  var largerPetal = createGraphics(450,900);
  largerPetal.pixelDensity(1);

  largerPetal.image(petal[1],0,0,450,900);
  var data = {
    id : 0,
    petal : largerPetal.elt.toDataURL()
  };
  socket.emit('flower',data);
  petal[1].clear();
}

function newFlower2() {
 newFlower(petal[2].elt.toDataURL(),2); 
   
    flowerX[2]=width-250;
  flowerY[2]=200;
  var largerPetal = createGraphics(450,900);
  largerPetal.pixelDensity(1);

  largerPetal.image(petal[2],0,0,450,900);
  var data = {
    id : 0,
    petal : largerPetal.elt.toDataURL()
  };
  socket.emit('flower',data);
  petal[2].clear();
}

function newFlower3() {
 newFlower(petal[3].elt.toDataURL(),3);
  
      flowerX[3]=width-250;
  flowerY[3]=200+height/2;
  var largerPetal = createGraphics(450,900);
  largerPetal.pixelDensity(1);

  largerPetal.image(petal[3],0,0,450,900);
  var data = {
    id : 0,
    petal : largerPetal.elt.toDataURL()
  };
  socket.emit('flower',data);
  petal[3].clear();
}



function draw() {

  background(240);

  fill(255);
  stroke(0);
  strokeWeight(3);

  
    var petalBoxOffsetX = 100;
  var petalBoxOffsetY = 100;
  if (true) {
   for (var i=0; i<min(touches.length,ptouches.length); i++) {

   if (touches[i].x<width/2&&touches[i].y<height/2 &&
      ptouches[i].x<width/2&&ptouches[i].y<height/2) {
    petal[0].noFill();
    petal[0].stroke(colorSelected[0]);
    petal[0].strokeWeight(10);
    petal[0].line(touches[i].y - petalBoxOffsetY,300-(touches[i].x - petalBoxOffsetX),ptouches[i].y- petalBoxOffsetY,300-(ptouches[i].x- petalBoxOffsetX));
   }

  
    

      else if (touches[i].x<width/2&&touches[i].y>height/2&&
              ptouches[i].x<width/2&&ptouches[i].y>height/2) {
    petal[1].noFill();
    petal[1].stroke(colorSelected[1]);
    petal[1].strokeWeight(10);
    petal[1].line(touches[i].y - petalBoxOffsetY - height/2,300-(touches[i].x - petalBoxOffsetX),ptouches[i].y- petalBoxOffsetY- height/2,300-(ptouches[i].x- petalBoxOffsetX));
   }
     
           else if (touches[i].x>width/2&&touches[i].y<height/2 &&
  ptouches[i].x>width/2&&ptouches[i].y<height/2) {
              //rect(width-400,350,300,150);
    petal[2].noFill();
    petal[2].stroke(colorSelected[3]);
    petal[2].strokeWeight(10);
             var mx= map(touches[i].x,width-400,width-400+300,0,300);
             var my= map(touches[i].y,350,500,150,0);
            var pmx= map(ptouches[i].x,width-400,width-400+300,0,300);
             var pmy= map(ptouches[i].y,350,500,150,0);
                 petal[2].line(my,mx,pmy,pmx);
             
   }            else if (touches[i].x>width/2&&touches[i].y>height/2 &&
 ptouches[i].x>width/2&&ptouches[i].y>height/2) {
            //    rect(width-400,350+height/2,300,150);
    petal[3].noFill();
    petal[3].stroke(colorSelected[2]);
    petal[3].strokeWeight(10);
             var mx= map(touches[i].x,width-400,width-400+300,0,300);
             var my= map(touches[i].y,350+height/2,500+height/2,150,0);
            var pmx= map(ptouches[i].x,width-400,width-400+300,0,300);
             var pmy= map(ptouches[i].y,350+height/2,500+height/2,150,0);
                 petal[3].line(my,mx,pmy,pmx);
             
   }
  }
  }
  
    
  rect(100,100,300,150);
  
  push();
    translate(400,100);
    rotate(radians(90));
    translate(0,0);
    image(petal[0], 0, 0);
pop();
  
  if (touches.length == ptouches.length) {
for (let i=0; i<touches.length; i++) {
  if (touches[i].y>flowerY[0]-50 && touches[i].y<flowerY[0]+50 && touches[i].x<paddingX +50)  {
    flowerX[0]+=touches[i].x-ptouches[i].x;
    if (flowerX[0]>paddingX) {
      newFlower0();
    }
  } else if (touches[i].y>flowerY[1]-50 && touches[i].y<flowerY[1]+50&& touches[i].x<paddingX+50)  {
    flowerX[1]+=touches[i].x-ptouches[i].x;
    if (flowerX[1]>paddingX) {
      newFlower1();
    }
  } else if (touches[i].y>flowerY[2]-50 && touches[i].y<flowerY[2]+50 && touches[i].x>(width-paddingX-50))  {
    flowerX[2]+=touches[i].x-ptouches[i].x;
    if (flowerX[2]<width-paddingX) {
      newFlower2();
    }
  } else if (touches[i].y>flowerY[3]-50 && touches[i].y<flowerY[3]+50&& touches[i].x>(width-paddingX-50))  {
    flowerX[3]+=touches[i].x-ptouches[i].x;
    if (flowerX[3]<width-paddingX) {
      newFlower3();
    }
  }
}}
  
  for (var currFlower = 0; currFlower<1; currFlower++) {
  var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
  var flowerScale = .25 + .05*sin(radians(currFlower*70));
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(flowerX[0],flowerY[0]);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
    translate(-petal[0].width/2*flowerScale, -petal[0].height*flowerScale);
    image(petal[0], 0, 0, petal[0].width*flowerScale, petal[0].height*flowerScale);
    pop();
  }
}
  
  
    rect(100,100+height/2,300,150);

      push();
    translate(400,100+height/2);
    rotate(radians(90));
    translate(0,0);
    image(petal[1], 0, 0);
pop();
  
    for (var currFlower = 0; currFlower<1; currFlower++) {
  var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
  var flowerScale = .25 + .05*sin(radians(currFlower*70));
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(flowerX[1],flowerY[1]);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
    translate(-petal[1].width/2*flowerScale, -petal[1].height*flowerScale);
    image(petal[1], 0, 0, petal[1].width*flowerScale, petal[1].height*flowerScale);
    pop();
  }
}
  
    rect(width-400,350,300,150);

        push();
    translate(width-400,500);
    rotate(radians(270));
    translate(0,0);
    image(petal[2], 0, 0);
pop();
  
      for (var currFlower = 0; currFlower<1; currFlower++) {
  var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
  var flowerScale = .25 + .05*sin(radians(currFlower*70));
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(flowerX[2],flowerY[2]);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
    translate(-petal[2].width/2*flowerScale, -petal[2].height*flowerScale);
    image(petal[2], 0, 0, petal[2].width*flowerScale, petal[2].height*flowerScale);
    pop();
  }
}
  
  
    rect(width-400,350+height/2,300,150);
        push();
    translate(width-400,500+height/2);
    rotate(radians(270));
    translate(0,0);
    image(petal[3], 0, 0);
pop();
  
      for (var currFlower = 0; currFlower<1; currFlower++) {
  var petalCount = 12 + floor(3*sin(radians(currFlower*235)));
  var flowerScale = .25 + .05*sin(radians(currFlower*70));
  for (var i = 0; i < petalCount; i++) {
    push();
    translate(flowerX[3],flowerY[3]);
    rotate(radians(i / petalCount * 360 + 5 * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
    translate(-petal[3].width/2*flowerScale, -petal[3].height*flowerScale);
    image(petal[3], 0, 0, petal[3].width*flowerScale, petal[3].height*flowerScale);
    pop();
  }
}
  
  fill(0,80,40);
  noStroke();

  rect(paddingX,paddingY,width-paddingX*2,height-paddingY*2);
  
maindraw();
  ptouches=[];
  for (var i=0; i<touches.length; i++) {
    ptouches[i]=touches[i];
  }
}

function mouseDragged() {
 return false; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}

function touchEnded() {
   ptouches=[];
  for (var i=0; i<touches.length; i++) {
    ptouches[i]=touches[i];
  } 
}