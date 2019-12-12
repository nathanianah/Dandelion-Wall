var numFlowers=0;
var maxFlowers= 100;
var boids = [];
var flowers = [];
var petals = [];
let port;




function newFlower(data,id) {
	json.flowers.push(data);
	//flowers.push(new GeneratedFlower(json.flowers.length-1, random(0,width), random(0,height)));
	let xpos = random(width);
	
	 for (let i = 0; i < 5; i++) {
		addBoid(new Boid(json.flowers.length-1,xpos+random(-100,100),height,id));
		numFlowers++;
	}
	
	console.log("new flower");
	}

function maindraw() {

/*
  boids.sort((a, b) => {
	if (a.location.y < b.location.y) {
		return -1
	} else {
		return 1
	}
});	
*/
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
  
 
    for( let i=0; i<(boids.length-maxFlowers); i++) {
      boids[i].flower.growth = boids[i].flower.death;
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


