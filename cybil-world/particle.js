
function Particle(x,y,r) {
	this.pos = createVector(x,y);
	this.acc = createVector(0,0);
	this.vel= createVector(0,0);
	this.x = x;
  	this.y = y;
  	this.r = 10; //r arg needed to talk to attractor.js 
  	this.col = color(200,100,200);
  	this.maxspeed = 15;

  this.applyForce = function(force) {
  	var forceCopy = force.copy();
  	forceCopy.div(this.r);
  	this.acc.add(force);
  }

    this.update = function() {
   this.vel.add(this.acc);
   this.pos.add(this.vel);
   this.vel.limit(this.maxspeed);
   this.acc.set(0,0);
  
  this.display = function() {
    stroke(255);
    fill(this.col);
    //ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    heart = new Heart(this.pos.x, this.pos.y, this.r*2, this.r *2);
  }

  this.edges = function() {
		if(this.pos.y > height) {
			this.vel.y *= -1;
			this.pos.y = height;
		}

		if(this.pos.x > width) {
			this.vel.x *=-1;
			this.pos.x = width;
		}
	}

   this.intersects = function(other) {
   	//define borders of intersection 
    var d = dist(this.pos.x, this.pos.y, other.x, other.y);
	    if (d < this.r + other.r && d > this.r + other.r -3) {
	      return true;
	    } else {
	      return false;
	    }
 	 }

 	this.changeColor = function(red) {
	    this.col = color(100,random(255),200);
	}
}


function Heart(x,y,width,height){

  var WIDTH = width / 2 * 0.85;
  var HEIGHT = height / 2;
  var OFFSET = y - (HEIGHT / 6 * 5);

  beginShape();

  for(var i = 0; i < 30; i++){
    var tx = abs(sin(radians(i * 12))) * (1 + cos(radians(i * 12))) * sin(radians(i * 12)) * WIDTH + x;
    var ty = (0.8 + cos(radians(i * 12))) * cos(radians(i * 12)) * HEIGHT + OFFSET;
    vertex(tx, ty);
  }
  endShape(CLOSE);
}
}

