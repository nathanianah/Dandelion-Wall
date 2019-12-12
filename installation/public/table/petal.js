class Petal {
	constructor(id, location, theta){
		this.petalImg = loadImage(json.flowers[id]);
		this.location = location;
		this.theta = theta;
	}
	
	render(speed) {
		let pwidth = this.petalImg.width * petalScale * speed, pheight = this.petalImg.height * petalScale * speed;
		image(this.petalImg, -pwidth/12, -pheight/12, pwidth/6, pheight/6);
	}
}