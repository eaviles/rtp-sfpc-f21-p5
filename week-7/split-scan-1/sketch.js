const WIDTH = 640;
const HEIGHT = 480;

let capture;
let img;
let x = 0;
let ready = false;

function setup() {
  frameRate(60);
  createCanvas(WIDTH, HEIGHT);
  capture = createCapture(VIDEO, () => {
    ready = true;
  });
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);
  img = createImage(WIDTH, HEIGHT);
  stroke(255, 0, 0);
  strokeWeight(2);
}

function draw() {
  background(0);
  if (!ready) return;
  img.copy(capture, x, 0, 1, height, x, 0, 1, height);
  x += 1;
  if (x >= width) x = 0;
  image(img, 0, 0);
  image(capture, 0, 0, width * 0.2, height * 0.2);
  line(x * 0.2, 0, x * 0.2, height * 0.2);
}
