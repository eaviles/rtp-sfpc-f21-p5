const WIDTH = 320;
const HEIGHT = 240;
const NUM_OF_PTS = 80;

let capture;
let thrsImg;
let pts = [];

function setup() {
  createCanvas(WIDTH * 2, HEIGHT * 2);
  capture = createCapture(VIDEO);
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);
  noStroke();
  fill(255, 0, 0);

  thrsImg = createImage(WIDTH, HEIGHT);

  for (let i = 0; i <= NUM_OF_PTS; i += 1) {
    const x = int(map(i, 0, NUM_OF_PTS, 0, WIDTH, true));
    pts.push([x, 0]);
  }
}

function pointToOffset(x, y) {
  return (y * WIDTH + x) * 4;
}

function draw() {
  thrsImg.copy(capture, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
  const thrs = map(mouseX, 0, width - 1, 0, 1, true);
  thrsImg.filter(THRESHOLD, thrs);
  thrsImg.filter(INVERT);

  background(0);
  image(capture, 0, 0, WIDTH * 2, HEIGHT * 2);
  image(thrsImg, 0, HEIGHT * 1.5, WIDTH * 0.5, HEIGHT * 0.5);

  thrsImg.loadPixels();
  for (let i = 0; i < pts.length; i += 1) {
    let [x, y] = pts[i];
    if (thrsImg.pixels[pointToOffset(x, y)] >= 127) {
      for (let j = pts[i][1]; j >= 0; j -= 1) {
        if (thrsImg.pixels[pointToOffset(x, j)] < 127) {
          pts[i][1] = j;
          break;
        }
      }
    } else {
      pts[i][1] += 1;
    }
    if (pts[i][1] > HEIGHT) {
      pts[i][1] = 0;
    }
    circle(pts[i][0] * 2, pts[i][1] * 2, 8);
  }
}
