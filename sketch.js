// by SamuelYAN
 // more works //
 // https://twitter.com/SamuelAnn0924
 // https://www.instagram.com/samuel_yan_1990/

 let seed;
 let mySize, margin;
 let tile_x, tile_y;
 let tile_x_size, tile_y_size;

 let color_set = [];
 let palette1, palette2, color_bg;

 let t, par_num, count;
 let originalGraphics;
 let bgGraphics;

 function preload() {
 	theShader = new p5.Shader(this.renderer, vert, frag)
 }

 function setup() {
 	seed = Math.random() * 9999
 	// pixelDensity(3);
 	frameRate(25);
 	randomSeed(seed);
 	angleMode(DEGREES);
 	mySize = min(windowWidth, windowHeight) * 0.9;
 	margin = mySize / 100;
 	createCanvas(mySize /16*11, mySize );
 	webGLCanvas = createGraphics(width, height, WEBGL);
 	originalGraphics = createGraphics(width, height);
 	bgGraphics = createGraphics(width, height);

 	palette1 = random(colorScheme).colors.concat();
 	palette2 = random(colorScheme).colors.concat();
 	color_bg = random(bgcolor);
 	background(color_bg);
 	color_set[0] = random(palette1);
 	color_set[1] = random(palette2);
 	color_set[2] = random(palette1);
 	color_set[3] = random(palette2);
 	color_set[4] = random(palette1);

 	color1 = random(color_set);
 	color2 = random(color_set);
 	t = 0;
 	count = 0;
 	makeFilter();
 }

 function draw() {

 	randomSeed(seed);
 	// noiseSeed(seed);

 	webGLCanvas.shader(theShader);
 	theShader.setUniform('u_resolution', [width / width, height / height]);
 	theShader.setUniform('u_time', millis() / 10);
 	theShader.setUniform("u_frame", frameCount / 1.0);
 	theShader.setUniform('u_tex', originalGraphics);

 	webGLCanvas.clear();
 	webGLCanvas.rect(-width / 2, -height / 2, width, height);


 	par_num = int(random(4, 8));
 	for (let x = -width * 0.025; x <= width * 2.05; x += random(width / par_num)) {
 		for (let y = -height * 0.025; y <= height * 1.05; y += random(height / par_num)) {

 			originalGraphics.fill(random(color_set));
 			// originalGraphics.fill(str(random(color_set)) + "80");
 			originalGraphics.noStroke();
 			// originalGraphics.drawingContext.shadowColor = str(color_bg) + "80";
 			originalGraphics.drawingContext.shadowColor = random(color_set);
 			originalGraphics.drawingContext.shadowOffsetX = 5;
 			originalGraphics.drawingContext.shadowOffsetY = 5;
 			originalGraphics.drawingContext.shadowBlur = 0;

 			const xAngle = map(0, 0, width, -random(0.5, 1) * 180, random(0.5, 1) * 180, true);
 			const yAngle = map(height, 0, height, -random(0.5, 1) * 180, random(0.5, 1) * 180, true);
 			const angle = xAngle * (x / width) + yAngle * (y / height);

 			let myX = x + random(10, 5) * sin(random(0.1, 0.5) * random(360) * t + angle);
 			let myY = y + random(5, 10) * cos(random(0.1, 0.5) * random(360) * t + angle);

 			originalGraphics.push();
 			originalGraphics.translate(random(-width / par_num, width / par_num)+myX+ frameCount/5+random([-1,1])*random(2,5)*random(1, par_num / 2), myY + random(1, par_num / 2) * cos(random(0.5, 1.5) * 360 * t + angle));
 			originalGraphics.rotate(random([-1, 1]) * sin(t) * 180 / 10);
 			originalGraphics.ellipse(0, 0, 10 * random(random(random())), random(1, 2) * cos(1 * t + 0.1) + t / random(1, 0.15)); // draw particle
 			if (frameCount < 50) {
			originalGraphics.fill(str(random(color_set)) + "80");
 				originalGraphics.circle(0, 0, random(1, 2) * cos(2 * t + 0.1)/1 ); // draw particle
 			}
 			originalGraphics.pop();
 		}
 	}
 	image(webGLCanvas, 0, 0);
 	t += 0.25;
 	if (int(abs(sin(t * 10) * 100)) == 0) {
 		count++;
 	}

 	if (count == 2) {
 		noLoop();
 		blendMode(BLEND);
 		// image(overAllTexture, 0, 0);
 		blendMode(ADD);
 		strokeWeight(random(0.10, 0.5) / 1);
 		stroke(str(random(color_set)) + "0d");
 		noFill();
 		drawingContext.setLineDash([1, 4, 1, 3]);
 		drawOverPattern();
 		drawingContext.setLineDash([1, 1]);
 		blendMode(BLEND);

 		noFill();
 		strokeWeight(margin);

 		rectMode(CORNER);
 		stroke("#202020");

 		rect(0, 0, width, height);
 	}
 }