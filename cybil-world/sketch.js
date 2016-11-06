var particles=[];
var attractor;

var flock;
//var trees = [];
var tree;
var tree2;
var tree3;
var tree4;

var flowers = [];
var cohesionSlider;
var separationSlider;
var alignmentSlider;

var clouds = [];

function setup() {
  var canvas = createCanvas(1000, 600);
  canvas.parent('canvas');

  //attractor - 'Sun' in middle
  attractor = new Attractor(600, 200);

  //PARTICLES
  for (var i = 0; i < 2; i++) {
    particles[i] = new Particle(random(width), random(height));
  }

  //FLOCK SLIDERS
  cohesionSlider = createSlider(0, 5, 1, 0.1).parent('cohesion');
  separationSlider = createSlider(0, 5, 2, 0.1).parent('separation');
  alignmentSlider = createSlider(0, 5, 1, 0.1).parent('alignment');
  
  //FLOCK
  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 80; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }

 //CLOUDS
  for (var i = 0; i <50;i++) {
    clouds[i] = new Cloud(random(width),random(0,200));
  }

  //TREES
  // for (var i = 0; i < trees<2; i++) {
  //   trees[i] = new Tree(random(width), height);
  // };
  tree = new Tree(200, height,80,2);
  tree2 = new Tree(400,height,80,1);
  tree3 = new Tree(600,height,100,1);
  tree4 = new Tree(700,height,120,1);

  //FLOWERS
  for (var i = 0; i < 8; i++) {
    flowers[i] = new Flower(random(width), height);
  };
 
}


function draw() {
  background(75,0,130,50);

  for (var i = 0; i < flowers.length; i++) {
    flowers[i].display();
  };
   //TREES
  stroke(0,255,0);
  tree.display();
  tree2.display();
  tree3.display();
  tree4.display();

  //BOIDS
  flock.run();


  for (var i = 0; i < particles.length; i++) {
    var force = attractor.calculateAttraction(particles[i]);
        
    particles[i].applyForce(force);
    
    particles[i].update();
    particles[i].display();
    if (particles[i].intersects(attractor)) {
      attractor.changeColor();
      particles[i].changeColor();
    }
  }

  var wind = createVector(.01,0);

  for (var i = 0; i< clouds.length; i++) {
    clouds[i].update();
    clouds[i].edges();
  
    clouds[i].display();
   
    clouds[i].applyForce(wind);    
  }
  //attractor.update();
  attractor.display();  

}
