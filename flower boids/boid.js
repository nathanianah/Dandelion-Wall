class Boid {

  constructor (x, y) {
    this.location = new p5.Vector(x, y);
		this.velocity = p5.Vector.random2D();
    this.acceleration = new p5.Vector(0, 0);
		
		this.maxForce = maxForce;
		this.maxVelocity = maxVelocity;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let ca = this.collisionAvoidance(boids);   // Separation
    let vm = this.velocityMatching(boids);      // Alignment
    let fc = this.flockCentering(boids);   // Cohesion
    // Weigh these forces
    ca.mult(caWeight);
    vm.mult(vmWeight);
    fc.mult(fcWeight);
    // Add the force vectors to acceleration
    this.applyForce(ca);
    this.applyForce(vm);
    this.applyForce(fc);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Calculates and applies a steering force towards a target
  seek(target) {
    let desired = p5.Vector.sub(target, this.location);  // A vector pointing from the location to the target
    // Scale to maximum speed
    desired.setMag(this.maxVelocity);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);  // Limit to maximum steering force
    return steer;
  }

  render() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + radians(90);
    
    fill(200, 100);
    stroke(0);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(0, -radius*1.2);
    vertex(-radius, radius*1.2);
    vertex(radius, radius*1.2);
    endShape();
    pop();
  }

  // Wraparound
  borders() {
    if (this.location.x < -radius) this.location.x = windowWidth+radius;
    if (this.location.y < -radius) this.location.y = windowHeight+radius;
    if (this.location.x > windowWidth+radius) this.location.x = -radius;
    if (this.location.y > windowHeight+radius) this.location.y = -radius;
  }

  // Collision Avoidance: steers away from neighbors
  collisionAvoidance (boids) {
    let distance = collisionDistance;
    let steer = new p5.Vector(0, 0, 0);
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = this.location.dist(boids[i].location);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < distance)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.location, boids[i].location);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
      }
    }

    if (steer.mag() > 0) {
      steer.setMag(this.maxVelocity);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  // Velocity matching: find average velocity of neighbors
  velocityMatching (boids) {
    let neighbordist = 50;
    let sum = new p5.Vector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.location, boids[i].location);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxVelocity);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } 
    else {
      return new p5.Vector(0, 0);
    }
  }

  // Flock centering find average location of neighbors
  flockCentering (boids) {
    let neighbordist = 50;
    let sum = new p5.Vector(0, 0);   // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.location, boids[i].location);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].location); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);  // Steer towards the location
    } 
    else {
      return new p5.Vector(0, 0);
    }
  }
}