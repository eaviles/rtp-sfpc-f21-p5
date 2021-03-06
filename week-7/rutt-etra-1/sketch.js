const WIDTH = 640;
const HEIGHT = 480;

let capture;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  capture = createCapture(VIDEO);
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);
  noFill();
  stroke(255);
}

function draw() {
  background(0);
  capture.loadPixels();
  for (let y = 0; y < height; y += 5) {
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      const off = (y * width + x) * 4;
      const { pixels: pixs } = capture;
      const r = pixs[off];
      const g = pixs[off + 1];
      const b = pixs[off + 2];
      const l = brightness(color(r, g, b));
      const d = map(l, 0, 255, 0, mouseX, true);
      curveVertex(x, y + d);
    }
    endShape();
  }
  image(capture, 0, height * 0.75, width * 0.25, height * 0.25);
}
