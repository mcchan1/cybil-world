
//shiffman flow field 

function Blob (x, y, maxspeed, maxforce) {
  this.position = createVector(x, y);
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.r = 4;
  this.maxspeed =  4;
  this.maxforce = 0.1;

  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  this.follow = function(flow) {
    // What is the vector at that spot in the flow field?
    var desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    //var theta = this.velocity.heading() + PI / 2;
    //fill(127);
    stroke(200);
    strokeWeight(1);
    penguin = new Penguin(this.position.x, this.position.y, 30);
  //   push();
  //   translate(this.position.x, this.position.y);
  //   rotate(theta);
  //   beginShape();
  //   vertex(0, -this.r * 2);
  //   vertex(-this.r, this.r * 2);
  //   vertex(this.r, this.r * 2);
  //   endShape(CLOSE);
  //   pop();
  // }
  }
} //end of Blob


function Penguin(x,y,r) {
  fill(200,255,0);
  ellipse(x,y,r+10,r);

  //eyeball
  fill(255);
  ellipse(x-7, y-5, 10); 
  ellipse(x+7, y-5,10);

  //FACE 
  fill(200,0,100);
  ellipse(x, y+5, 8); //mouth
  ellipse(x-7, y-5, 5); //iris
  ellipse(x+7, y-5,5); //iris
  
  //ears
  ellipse(x-10,y-18, 8,12);
  ellipse(x+10,y-18, 8,12);

  //feet
  fill(random(0,255),random(0,255),random(0,255));
  ellipse(x-10,y+18, 14,8);
  ellipse(x+10,y+18, 14,8);
}
