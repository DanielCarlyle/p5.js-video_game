function Bullet(config){
	this.position = config.position;
	this.speed = config.speed;
	this.type = config.type;

	this.update = function(delta){
		this.position.x += this.speed * delta;
	};

	this.draw = function(){
		image(Data.get(this.type), 
			this.position.x, this.position.y);	
	};
}