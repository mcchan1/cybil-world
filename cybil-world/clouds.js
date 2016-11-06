function Cloud (x,y,r) {
	this.r = random(50,100);
	this.x = random(0,600);
	this.y = random(0,600);
	this.position = createVector(x,y);
	this.velocity = createVector(0.0,0);
	this.acceleration = createVector(0,0);
	this.maxspeed = 2; 

	this.applyForce = function(force) {
	  	var forceCopy = force.copy();
	  	forceCopy.div(this.r);
	  	this.acceleration.add(force);
	}

	this.display = function() {
		cloudysky = new cloudShape(this.position.x, this.position.y, this.r, this.r);
	}

    this.update = function() {
	   this.velocity.add(this.acceleration);
	   this.position.add(this.velocity);
	   this.velocity.limit(this.maxspeed);
	  	this.acceleration.set(0,0);
	}

	 // Wraparound
  this.edges = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
} //cloud()

function cloudShape(x,y,r,r) {
	fill(255,180);
	ellipse(x,y,r, r);
	ellipse(x+20,y,r-15, r);
}