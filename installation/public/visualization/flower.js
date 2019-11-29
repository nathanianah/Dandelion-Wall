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
	this.stemHeight=0.0;
	this.death= 720;
	this.leafWidth= random(30,50);
	this.leafHeight= random(20,40);

}


GeneratedFlower.prototype.update = function(location) {

	this.xpos = location.x;
	this.ypos = location.y-this.stemHeight;
this.stemHeight+= 15*speedCurve(this.growth/50.0);
	if (this.doneMoving) {
		this.growth++;
		var leafGrowth= min(1,this.growth/50.0);
		//start dying after 720 frames
		if (this.growth > this.death) {
			this.flowerScale *= .95;
			this.globalRotation += 2;
			this.stemHeight-= 15*speedCurve((this.growth-this.death)/50.0);
			this.ypos = location.y-this.stemHeight;
			leafGrowth= max(0,1-(this.growth-this.death)/30.0);
		}

stroke(0,255,0,70);
strokeWeight(4);
line(this.xpos,min(this.ypos + this.petalImg.height * this.flowerScale*.5,location.y), this.xpos,location.y);

fill(0,30,0);
stroke(0,70,0);
strokeWeight(4);
if (leafGrowth>.05){
bezier(this.xpos,location.y,
	 this.xpos+this.leafWidth/2*leafGrowth,location.y,
	 this.xpos+this.leafWidth*leafGrowth,location.y-this.leafHeight/2,
	 this.xpos+this.leafWidth*leafGrowth,location.y-this.leafHeight);
bezier(this.xpos,location.y,
	this.xpos,location.y-this.leafHeight/2,
	this.xpos+this.leafWidth/2*leafGrowth,location.y-this.leafHeight,
	this.xpos+this.leafWidth*leafGrowth,location.y-this.leafHeight);
	bezier(this.xpos,location.y,
		this.xpos-this.leafWidth/2*leafGrowth,location.y,
		this.xpos-this.leafWidth*leafGrowth,location.y-this.leafHeight/2,
		this.xpos-this.leafWidth*leafGrowth,location.y-this.leafHeight);
   bezier(this.xpos,location.y,
	   this.xpos,location.y-this.leafHeight/2,
	   this.xpos-this.leafWidth/2*leafGrowth,location.y-this.leafHeight,
	   this.xpos-this.leafWidth*leafGrowth,location.y-this.leafHeight);
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

function speedCurve(x) {
return max(0,-x*x+x);
}