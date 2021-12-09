let capture;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  pixelDensity(1);
  noFill();
  stroke(255);
}

function draw() {
  background(0);
  capture.loadPixels();
  for (let j = 0; j < height; j += 5) {
    beginShape();
    for (let i = 0; i <= width; i += 10) {
      const off = (j * width + i) * 4;
      const { pixels: pixs } = capture;
      const r = pixs[off];
      const g = pixs[off + 1];
      const b = pixs[off + 2];
      const l = brightness(color(r, g, b));
      const d = map(l, 0, 255, 0, mouseX, true);
      curveVertex(i, j + d);
    }
    endShape();
  }
  image(capture, 0, height * 0.75, width * 0.25, height * 0.25);
}
