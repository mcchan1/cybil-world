
function preload() {
	bebe = loadImage('Panda.png');

}

function Cybil(x,y,r) {

	this.pos = createVector(x,y);
	this.acc = createVector(0,0);
	this.vel= createVector(0,0);
	this.x = x;
  	this.y = y;
  	this.r = r; //r arg needed to talk to attractor.js 
  	this.col = color(255,127,80);
  	this.maxspeed = 4;

  	this.display = function() {
  		stroke(255);
  		fill(this.col);

  		image(bebe,this.pos.x,this.pos.y);
  		bebe.resize(150,150);
  		//ellipse(this.pos.x, this.pos.y, r*4); 

  	}

  	this.update = function() {
	   this.vel.add(this.acc);
	   this.pos.add(this.vel);
	   this.vel.limit(this.maxspeed);
	   this.acc.set(0,0);
	}

//WRAPAROUND OR BOUNCE OF EDGES
  this.edges = function() {
  	//WRAPAROUND EDGES OF CANVAS
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;

    //BOUNCE OFF EDGES OF CANVAS
    //   if (this.pos.x > width) {
    //   this.pos.x = width;
    //   this.vel.x *= -1;
    // } else if (this.pos.x < 0) {
    //   this.vel.x *= -1;
    //   this.pos.x = 0;
    // }
    // if (this.pos.y > height) {
    //   this.vel.y *= -1;
    //   this.pos.y = height;
    // }
  }

   this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    var forceCopy = force.copy();
	  	forceCopy.div(this.r);
	  	this.acceleration.add(force);
  }

   this.intersects = function(other) {
   	//define borders of intersection 
    var d = dist(this.pos.x, this.pos.y, other.x, other.y);
	    if (d < this.r + other.r && d > this.r + other.r -20) {
	      return true;
	    } else {
	      return false;
	    }
 	 }

 	 this.test = function() {
 	 	console.log('cybil! ');
 	 }

  //need to make it a vector instead of position
  	this.keyPressed = function() {
  		var arrowSpeed = 2; 
  		//up arrow
  		if(keyCode == 38) {
  			
  			//this.vel.y = -arrowSpeed;
  			this.vel.y = this.vel.y -=arrowSpeed;		
  		}
  		//down arrow
  		else if (keyCode == 40){
  			//this.vel.y = arrowSpeed;
  			this.vel.y = this.vel.y +=arrowSpeed;
  		}
  		//left arrow
  		else if (keyCode == 37){
  			//this.vel.x = -arrowSpeed;
  			this.vel.x = this.vel.x -=arrowSpeed;
  		}
  		//right arrow
  		else if (keyCode == 39){
  			//this.vel.x = arrowSpeed; 
  			this.vel.x = this.vel.x +=arrowSpeed;
  		}

  		return false; 
  	}


} //end of Cybil 