const WIDTH = 320;
const HEIGHT = 240;

let capture;
let bgImg;
let diffImg;
let grayImg;
let srcImg;
let thrhImg;
let recordBg = true;

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
  background(0);

  srcImg = captureToMat(capture);
  cv.cvtColor(srcImg, grayImg, cv.COLOR_RGBA2GRAY);
  if (recordBg) {
    grayImg.copyTo(bgImg);
    recordBg = false;
  }
  cv.absdiff(grayImg, bgImg, diffImg);
  const thrh = map(mouseX, 0, width, 0, 255);
  cv.threshold(diffImg, thrhImg, thrh, 255, cv.THRESH_BINARY);

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    thrhImg,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_NONE
  );

  drawMat(srcImg, 0, 0);
  drawMat(grayImg, WIDTH, 0);
  drawMat(bgImg, 0, HEIGHT);
  drawMat(diffImg, WIDTH, HEIGHT);
  drawMat(thrhImg, WIDTH * 2, 0);

  const offX = WIDTH * 2;
  const offY = HEIGHT;
  for (var i = 0; i < contours.size(); i++) {
    fill(255, 0, 0, 128);
    var contour = contours.get(i);
    beginShape();
    var k = 0;
    for (var j = 0; j < contour.total(); j++) {
      const cnt = contour.intPtr(j);
      var x = cnt[0];
      var y = cnt[1];
      vertex(x + offX, y + offY);
    }
    endShape(CLOSE);
    noFill();
    stroke(255, 255, 255);
    var box = cv.boundingRect(contour);
    rect(box.x + offX, box.y + offY, box.width, box.height);
  }
}
