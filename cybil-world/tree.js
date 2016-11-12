//based on fractal lession Nature of Code

function Tree(x,y, len, generation) {
  //angle = random(-PI/3, PI/3);
  angleRight = random(0,PI/3);
  angleLeft = random(0,-PI/3)
  this.r = 100; 
  this.position = createVector(x,y);
  this.velocity = createVector(); 
  this.x = x; 
  this.y = y; 

  this.display = function() {
    
    push();
    // Start the tree from the bottom of the screen
    translate(this.position.x, this.position.y);
    // Start the recursive branching!
    //branch(80,1);
    branch(len,generation)
    pop();

    }

  this.update = function() {

  }

  this.applyForce = function(force) {
    var forceCopy = force.copy();
      forceCopy.div(this.r);
  }
}

function branch(len, generation) {

  // Draw the branch
  strokeWeight(map(generation, 1, 10, 4, 1));
 line(0, 0, 0, -len);

  // Move to the end and shrink.
  translate(0, -len);
  // each branch is 2/3 size of previous branch
  len *= 0.66;

  generation++;

  if (len > 4) {
    //BRANCH TO THE RIGHT
    push();
    rotate(angleRight);
    branch(len, generation);
    pop();

    // BRANCH TO THE LEFT
    push();
    rotate(angleLeft);
    branch(len, generation);
    pop();
  }
}
