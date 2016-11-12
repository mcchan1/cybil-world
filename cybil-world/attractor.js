var Attractor = function(x,y) {
  this.pos = createVector(x,y);
  this.x = x;
  this.y = y;
  this.r = 60; //r has to be a variable to changeColor
  this.col = color(255);
  this.G = .05;

  //change color on intersect/collide
  this.changeColor = function(red) {
    this.col = color(random(255),255,0,100);
  }

  this.calculateAttraction = function(p) {
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Artificial constraint
    distance = constrain(distance, 5, 8);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (this.G * this.r * p.r) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }


  this.display = function() {
    stroke(255);
    fill(this.col);

    ellipse(this.pos.x, this.pos.y, this.r*2);
    fill(200,10,200);
    //ellipse(this.pos.x, this.pos.y +20, 20,10);
    arc(this.pos.x, this.pos.y +20, 50, 20, 0, PI);
    ellipse(this.pos.x -15, this.pos.y -15, 10, 10);
    ellipse(this.pos.x +15, this.pos.y -15, 10, 10);
  }
}
