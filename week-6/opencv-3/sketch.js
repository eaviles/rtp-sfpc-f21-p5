const WIDTH = 320;
const HEIGHT = 240;

let video;
let srcImg;
let gryImg;
let thrImg;
let topXSmt = WIDTH * 1.5;
let topYSmt = HEIGHT;
let playing = false;
let history = [];

function setup() {
  createCanvas(WIDTH * 2, HEIGHT);
  video = createVideo("/assets/videos/input.mov");
  video.size(WIDTH, HEIGHT);
  video.hide();
  srcImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
  gryImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
  thrImg = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
}

function mousePressed() {
  playing = true;
  video.loop();
}

function draw() {
  background(60);

  if (!playing) {
    fill(255);
    text("click to play video", 10, 20);
    return;
  }

  video.loadPixels();
  srcImg = cv.matFromImageData(video.imageData);
  cv.cvtColor(srcImg, gryImg, cv.COLOR_RGBA2GRAY);
  cv.threshold(gryImg, thrImg, 127, 255, cv.THRESH_BINARY);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    thrImg,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_NONE
  );

  image(video, 0, 0);

  noFill();
  stroke(255);
  const offX = WIDTH;
  let topX;
  let topY;
  for (let i = 0; i < contours.size(); i += 1) {
    let contour = contours.get(i);
    beginShape();
    for (let j = 0; j < contour.total(); j += 1) {
      const [x, y] = contour.intPtr(j);
      vertex(x + offX, y);
      if (j === 0 || y < topY) {
        topX = x + offX;
        topY = y;
      }
    }
    endShape(CLOSE);
  }

  if (topX && topY) {
    topXSmt = topXSmt * 0.9 + topX * 0.1;
    topYSmt = topYSmt * 0.9 + topY * 0.1;
    history.push([topXSmt, topYSmt]);
    if (history.length > 120) {
      history.shift(0, 1);
    }
  }

  stroke(255, 255, 0);
  beginShape();
  for (let i = 0; i < history.length; i += 1) {
    vertex(history[i][0], history[i][1]);
  }
  endShape();

  noStroke();
  fill(255, 0, 0);
  circle(topXSmt, topYSmt, 6);
}
