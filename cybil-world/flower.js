function Flower(plantX, plantY){
	//'plant' is arg for x - coordinate 
	this.display = function() {
			//STEM
	push();
	
		stroke(100,256,100,127);
		strokeWeight(8);
		line(plantX,plantY, plantX,plantY-100);
	pop();
	
	
	push(); //start translation of x,y
		translate(plantX,plantY-80);

	//PETALS

	for(var q =0; q<6; q++) {
		//stroke(255,255,0);
		noStroke();
		//stroke(256,0,256,127);
		fill(255,255,0, 127);
		ellipse(0,0,30,100);
		rotate(PI/5);
		//rotate(frameCount/80.0);
	}
	
	//MIDDLE DIAMETER CHANGES BASED ON VOLUME
	// var rms = analyzer.getLevel();
	
	// var xEllipse = 20 + (sin(frameCount/10)*(rms*200));
		fill(200,0,200,127);
		ellipse(0,0,30);
	// //fill(0,130);
	
	// if (xEllipse > 40){
	// 	fill(256,100,100,130);
	// 	ellipse(0,0,xEllipse,xEllipse);
	// }
	// else{
	// 	fill(0,130);
	// 	ellipse(0,0,xEllipse,xEllipse);
	// }	

	pop(); //END OF TRANSLATION

	}

}
