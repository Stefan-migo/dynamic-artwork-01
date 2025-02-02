// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("What_I_am_thinking_about_2024_31", "png");
	}
}

function makeFilter() {
	let filterNum = int(Math.random() * 99999);
	randomSeed(seed);
	// noiseのフィルターをつくる
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(0, 0, 5, 10);
	overAllTexture = createGraphics(width, height);
	overAllTexture.loadPixels();
	for (var i = 0; i < width; i += 1) { // noprotect
		for (var j = 0; j < height; j += 1) { // noprotect
			if (filterNum % 4 == 0) {
				overAllTexture.set(i, j, color(random(60), 5, 95, noise(i / 3, j / 3, (i * j) / 50) * 12)); // white
			} else if (filterNum % 4 == 1) {
				overAllTexture.set(i, j, color(48, 25, 98, noise(i / 3, j / 3, (i * j) / 50) * 12)); // yellow
			} else if (filterNum % 4 == 2) {
				overAllTexture.set(i, j, color(random(5, 8), 25, 98, noise(i / 3, j / 3, (i * j) / 50) * 12));
			} else if (filterNum % 4 == 3) {
				overAllTexture.set(i, j, color(random(200, 210), 10, 86, noise(i / 3, j / 3, (i * j) / 50) * 12));
			}
		}
	}
	overAllTexture.updatePixels();
}

function makeFilter2() {
	let filterNum = int(Math.random() * 9999);
	randomSeed(seed);
	// noiseのフィルターをつくる
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(0, 0, 5, 10);
	overAllTexture2 = createGraphics(width, height);
	overAllTexture2.loadPixels();
	for (var i = 0; i < width; i += random([5])) { // noprotect
		for (var j = 0; j < height; j += random([5])) {
			if (filterNum % 4 == 0) {
				overAllTexture2.set(i, j, color(random(60), 5, 95, noise(i / 3, j / 3, (i * j) / 50) * 12)); // white
			} else if (filterNum % 4 == 1) {
				overAllTexture2.set(i, j, color(48, 25, 98, noise(i / 3, j / 3, (i * j) / 50) * 12)); // yellow
			} else if (filterNum % 4 == 2) {
				overAllTexture2.set(i, j, color(random(5, 8), 25, 98, noise(i / 3, j / 3, (i * j) / 50) * 12));
			} else if (filterNum % 4 == 3) {
				overAllTexture2.set(i, j, color(random(60), 5, 10, noise(i / 3, j / 3, (i * j) / 50) * 12)); // black
			}
		}
	}
	overAllTexture2.updatePixels();
}

function drawOverPattern() {
	push();
	translate(width / 2, height / 2);
	//rotate(-PI / 2);

	let s = max(width, height) / 1 * sqrt(3) - 2;
	let n = 6;

	for (let theta = 360 / 6; theta < 360 + 60; theta += 360 / 6) { // noprotect
		divideOP(0, 0, s * cos(theta), s * sin(theta), s * cos(theta + 360 / 6), s * sin(theta + 360 / 6), n);
	}
	pop();
}

function prop(x1, y1, x2, y2, k) {
	let x3 = (1 - k) * x1 + k * x2;
	let y3 = (1 - k) * y1 + k * y2;
	return [x3, y3];
}

function divideOP(x1, y1, x2, y2, x3, y3, n) {
	if (n > 1) {
		let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
		let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
		let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
		let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
		let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
		let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
		let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
		divideOP(x1, y1, xA, yA, xF, yF, n - 1);
		divideOP(xA, yA, xB, yB, xG, yG, n - 1);
		divideOP(xB, yB, x2, y2, xC, yC, n - 1);
		divideOP(xG, yG, xF, yF, xA, yA, n - 1);
		divideOP(xC, yC, xG, yG, xB, yB, n - 1);
		divideOP(xF, yF, xG, yG, xE, yE, n - 1);
		divideOP(xG, yG, xC, yC, xD, yD, n - 1);
		divideOP(xD, yD, xE, yE, xG, yG, n - 1);
		divideOP(xE, yE, xD, yD, x3, y3, n - 1);
	} else {
		makeTriangle([x1, y1], [x2, y2], [x3, y3]);
	}
}

function makeTriangle(v1, v2, v3) {
	let points = shuffle([v1, v2, v3]);
	let [x1, y1] = points[0];
	let [x2, y2] = points[1];
	let [x3, y3] = points[2];
	let iStep = 1 / (pow(2, floor(random(4, 2))));
	for (let i = 0; i < 1; i += iStep) { // noprotect
		let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
		let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
		triangle(x1, y1, x4, y4, x5, y5);
	}
}