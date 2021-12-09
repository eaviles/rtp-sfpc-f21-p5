let font;
let points;

function preload() {
  font = loadFont("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(255);
  strokeWeight(4);
  points = font.textToPoints("hello", 0, 0, 240, {
    sampleFactor: 1
  });
}

function draw() {
  const time = Date.now() / 1000;
  background(60);
  translate(140, 300);
  beginShape(POINTS);
  points
    .map(({ x, y }) => [x + mouseX * 0.1 * sin(y * 0.04 + time * 2), y])
    .forEach(([x, y]) => vertex(x, y));
  endShape();
}
