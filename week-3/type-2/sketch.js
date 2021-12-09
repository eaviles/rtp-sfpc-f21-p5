let font;

function preload() {
  font = loadFont("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  textFont(font);
  textSize(120);
  debugMode(AXES, 400, 0, 0, 0);
}

function draw() {
  background(60);
  orbitControl();
  push();
  fill(0, 255, 0);
  rotateY(PI / 2);
  text("world", 0, 0);
  pop();
  fill(255, 0, 0);
  text("hello", 0, 0);
}
