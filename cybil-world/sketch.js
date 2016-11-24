
//Heart Particles Attracted to 'Sun'
var particles=[];
var attractor;


//Individual TRees
var tree;
var tree2;
var tree3;
var tree4;

var flowers = [];

//Flocking and Sliders 
var flock;
var cohesionSlider;
var separationSlider;
var alignmentSlider;


var clouds = [];

//Flow field
var blobs = [];
var debug = true; 
var flowfield; 

//Cybil 
var cybil; 

function setup() {
  var canvas = createCanvas(windowWidth, 600);
  canvas.parent('canvas');

  //Flow field for Blobs. Arg is length of vector in pixels
  flowfield = new FlowField(40);

  //Initialize Blob (x,y,maxspeed, maxforce)
  for (var i =0; i< 40; i++) {
    blobs.push(new Blob(random(width), random(height), random(2,5), random(0.1,0.5)));
  }

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
  // Add an initial set of boids/Fish into the system
  for (var i = 0; i < 80; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }

 //CLOUDS
  for (var i = 0; i <50;i++) {
    clouds[i] = new Cloud(random(width),random(0,200));
  }

  //TREES
  tree = new Tree(200, height,80,2);
  tree2 = new Tree(400,height,80,1);
  tree3 = new Tree(600,height,100,1);
  tree4 = new Tree(700,height,120,1);

  //FLOWERS
  for (var i = 0; i < 8; i++) {
    flowers[i] = new Flower(random(width), height);
  };
  
  //Cybil 
  cybil = new Cybil(500,500,20); 
} //END OF SETUP 

function draw() {
  background(75,0,130,50);

  //CYBIL MOVER
  cybil.keyPressed();
  cybil.update();
  cybil.edges();
  cybil.display(); 
   
      

  
 
  //Flow field for Blobs
  if(debug) flowfield.display();

  for (var i = 0; i < blobs.length; i++) {
    blobs[i].follow(flowfield);
    blobs[i].run();
    if (blobs[i].intersects(cybil)){
      //DO SOMETHING ON INTERSECTION WITH CYBIL 
      cybil.test();
      blobs.splice(blobs.indexOf(this.blobs),1);
    }
  }

  //Flowers at request 
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

  //Particles and Blob change color when they intersect/collide 
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

  //Wind Vector applied to Clouds
  var wind = createVector(.01,0);

  for (var i = 0; i< clouds.length; i++) {
    clouds[i].update();
    clouds[i].edges();
  
    clouds[i].display();
   
    clouds[i].applyForce(wind);    
  }
 
  //attractor.update(); 
  attractor.display();  

  //Functions for FLOW FIELD 
  function keyPressed() {
    if(key == ' ') {
      debug = !debug;
    }
  }

  //flowfield.keyPressed();

  function mousePressed() {
    flowfield.init(); 
  }

} //end of Draw function 

