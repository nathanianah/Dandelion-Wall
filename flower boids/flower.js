var GeneratedFlower = function(p, x, y) {
	this.petalImg = loadImage(json.flowers[p]);
	this.xpos = x;
	this.ypos = y;
	this.petalCount = floor(random(9, 15));
	this.flowerScale = random(0.2, 0.3);
	this.growth = 0;
	this.rotateOption = random(-0.0, 0.5);
	this.growSpeed = random(2.0, 7.0);
	this.globalRotation = random(0, 720);
	this.doneMoving = true;
	this.fanning = floor(random(0.1, 1.9)) * 360;

}


GeneratedFlower.prototype.update = function(location) {

	this.xpos = location.x;
	this.ypos = location.y;

	if (this.doneMoving) {
		this.growth++;

		//start dying after 720 frames
		if (this.growth > 720) {
			this.flowerScale *= .95;
			this.globalRotation += 2;
		}

		for (var i = 0; i < this.petalCount; i++) {
			var growScale = min(1.0, (this.growth * (this.petalCount - i)) / 360 * this.growSpeed)
			push();
			translate(this.xpos, this.ypos);
			rotate(radians(this.globalRotation - min(360, this.growth * this.growSpeed) * this.rotateOption + i / this.petalCount * min(360, max(this.fanning, 180 + this.growth * this.growSpeed / 2)) + 5 * sin(radians(2 * i / this.petalCount * 360 + this.growth))));
			translate(-this.petalImg.width / 2 * this.flowerScale * growScale, -this.petalImg.height * this.flowerScale * growScale);

			image(this.petalImg, 0, 0, this.petalImg.width * this.flowerScale * growScale, this.petalImg.height * this.flowerScale * growScale);
			pop();
		}
	}
}