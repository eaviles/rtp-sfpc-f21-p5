let font;

function preload() {
  font = loadFont("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800);
  textFont(font);
  noFill();
  stroke(255);
  strokeWeight(8);
  strokeJoin(ROUND);
}

function draw() {
  background(60);

  const points = font.textToPoints("hello", 100, 240, 200, {
    sampleFactor: map(mouseX, 0, width, 0.001, 0.1)
  });

  beginShape();
  points.forEach(({ x, y }) => curveVertex(x, y));
  endShape();

  translate(0, 200);
  beginShape();
  points.forEach(({ x, y }) => vertex(x, y));
  endShape();

  translate(0, 200);
  beginShape(POINTS);
  points.forEach(({ x, y }) => vertex(x, y));
  endShape();
}
