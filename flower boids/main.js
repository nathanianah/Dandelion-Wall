var numFlowers;
var json;
var boids = [];
var flowers = [];

function preload() {
  json = loadJSON("flower.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  // Initialize with 20 boids in the center
  for (let i = 0; i < 20; i++) {
    addBoid(new Boid(random(width),random(height)));
  }
}

function draw() {
  background(255);
	
	for (let i = 0; i < flowers.length; i++) {
    flowers[i].update(boids[i].location); //draw the flowers
  }

  for (let i = flowers.length -1; i > -1; i--) {
    if (flowers[i].flowerScale < 0.02) {
      flowers.splice(i, 1); //if the flower is very small, kill it
			boids.splice(i,1);
    }
  }
  run();
}

// Add a new boid into the System
function mousePressed() {
  addBoid(new Boid(mouseX,mouseY));
}

function run() {
	for (let i = 0; i < this.boids.length; i++) {
		this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
		// this.flowers[i].setLoc(this.boids[i].location);
		// this.flowers[i].update();
	}
}

function addBoid(b) {
	this.boids.push(b);
	flowers.push(new GeneratedFlower(Math.floor(random(5)), width / 2, height / 2));
}


