var flock;
var numFlowers;
var json;

function preload() {
  json = loadJSON("flower.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
  flock = new Flock();
  // Initialize with 20 boids in the center
  for (let i = 0; i < 20; i++) {
    flock.addBoid(new Boid(windowWidth/2,windowHeight/2));
  }
}

function draw() {
  background(255);
  // flock.run();
}

// Add a new boid into the System
function mousePressed() {
  flock.addBoid(new Boid(mouseX,mouseY));
}

class Flock {

  constructor () {
    this.boids = []; // Initialize the ArrayList
		this.flowers = [];
  }

  run() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
			this.flowers[i].xpos = this.boids[i].location.x;
			this.flowers[i].ypos = this.boids[i].location.y;
			this.flowers[i].update();
    }
  }

  addBoid(b) {
    this.boids.push(b);
		this.flowers.push(new Flower(random(5),b.location.x, b.location.y));
  }

}


