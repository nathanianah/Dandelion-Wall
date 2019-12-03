var numFlowers=0;
var json;
var boids = [];
var flowers = [];
var petals = [];
var socket;
let port;

function preload() {
  json = loadJSON("flowers-1.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  // Initialize with 5 petals
	for (let j=0; j<3; j++) {
let xpos = random(width);
		let f = Math.floor(random(5,json.flowers.length));
		 for (let i = 0; i < 5; i++) {
			addBoid(new Boid(f,xpos+random(-100,100),height));
			numFlowers++;
		 }
}
try {
	port = (process.env.PORT || 4000);
	} catch {
	  
	}
socket = io.connect(port);
socket.on('flower', newFlower);

}

function newFlower(data) {
	json.flowers.push(data.petal);
	//flowers.push(new GeneratedFlower(json.flowers.length-1, random(0,width), random(0,height)));
	let xpos = random(width);
	
	 for (let i = 0; i < 5; i++) {
		addBoid(new Boid(json.flowers.length-1,xpos+random(-100,100),height));
		numFlowers++;
	}
	
	console.log("new flower");
	}

function draw() {
  background(0);

  boids.sort((a, b) => {
	if (a.location.y < b.location.y) {
		return -1
	} else {
		return 1
	}
});	

	for (let i = 0; i < boids.length; i++) {
if (boids[i].flower){
		boids[i].flower.update(boids[i].location);
}
	}

	// for (let i = 0; i < flowers.length; i++) {
	// flowers[i].update(boids[i].location); //draw the flowers
	// }

  for (let i = boids.length -1; i > -1; i--) {
    if (boids[i].flower && boids[i].flower.flowerScale < 0.02) {
			boids.splice(i,1);
    }
  }
  run();
}

// Add a new boid into the System
function touchStarted() {

		let xpos = random(width);
		let f = Math.floor(random(5,json.flowers.length));
		 for (let i = 0; i < 5; i++) {
			addBoid(new Boid(f,xpos+random(-100,100),height));
			numFlowers++;
		 }
	
}

function mousePressed() {

	let xpos = random(width);
		let f = Math.floor(random(5,json.flowers.length));
		 for (let i = 0; i < 5; i++) {
			addBoid(new Boid(f,xpos+random(-100,100),height));
			numFlowers++;
		 }
}

function run() {
	for (let i = 0; i < this.boids.length; i++) {
		this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
	}
}

function addBoid(b) {
	this.boids.push(b);
	flowers.push(null);
}


