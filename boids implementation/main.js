var flock;

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
  flock.run();
}

// Add a new boid into the System
function mousePressed() {
  flock.addBoid(new Boid(mouseX,mouseY));
}

class Flock {

  constructor () {
    this.boids = []; // Initialize the ArrayList
  }

  run() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }

}


