const WIDTH = 320;
const HEIGHT = 240;

let capture;
let bgImg;
let diffImg;
let grayImg;
let srcImg;
let thrhImg;
let recordBg = true;
let pixelsOnSmth = 0;

function setup() {
  createCanvas(WIDTH * 3, HEIGHT * 2);
  capture = createCapture(VIDEO);
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);

  srcImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
  grayImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
  bgImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
  diffImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
  thrhImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
}

function captureToMat(cpt) {
  const img = cpt.get();
  img.loadPixels();
  return cv.matFromImageData(img.imageData);
}

function drawMat(mat, x, y) {
  let img = createImage(mat.cols, mat.rows);
  cv.imshow(img.canvas, mat);
  image(img, x, y);
  img = null;
}

function keyPressed() {
  recordBg = true;
}

function draw() {
  srcImg = captureToMat(capture);
  cv.cvtColor(srcImg, grayImg, cv.COLOR_RGBA2GRAY);
  if (recordBg) {
    grayImg.copyTo(bgImg);
    recordBg = false;
  }
  cv.absdiff(grayImg, bgImg, diffImg);
  const thrh = map(mouseX, 0, width, 0, 255);
  cv.threshold(diffImg, thrhImg, thrh, 255, cv.THRESH_BINARY);

  let pixelsOn = 0;
  for (let i = 0; i < thrhImg.data.length; i += 1) {
    if (thrhImg.data[i] > 127) pixelsOn += 1;
  }

  pixelsOnSmth = int(0.9 * pixelsOnSmth + 0.1 * pixelsOn);
  const bgColor = int(map(pixelsOnSmth, 0, 20000, 0, 255, true));
  background(bgColor);

  drawMat(srcImg, 0, 0);
  drawMat(grayImg, WIDTH, 0);
  drawMat(bgImg, 0, HEIGHT);
  drawMat(diffImg, WIDTH, HEIGHT);
  drawMat(thrhImg, WIDTH * 2, 0);

  fill(bgColor <= 127 ? 255 : 0);
  const debugStr = JSON.stringify({ pixelsOn, pixelsOnSmth, bgColor }, null, 2);
  text(debugStr, WIDTH * 2 + 20, HEIGHT + 30);
}
