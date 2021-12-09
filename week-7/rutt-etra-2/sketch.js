const WIDTH = 640;
const HEIGHT = 480;

let capture;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);
  noFill();
  stroke(255);
  strokeWeight(2);
  ortho();
}

function draw() {
  background(0);
  orbitControl();
  scale(0.8);
  capture.loadPixels();
  for (let y = 0; y < height; y += 15) {
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      const off = (y * width + x) * 4;
      const { pixels: pixs } = capture;
      const r = pixs[off];
      const g = pixs[off + 1];
      const b = pixs[off + 2];
      const l = brightness(color(r, g, b));
      const z = map(l, 0, 255, -mouseX, mouseX);
      const nx = x - width / 2;
      const ny = y - height / 2;
      curveVertex(nx, ny, z);
    }
    endShape();
  }
}
