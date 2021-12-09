const WIDTH = 320;
const HEIGHT = 240;

let video;
let srcImg;
let gryImg;
let thrImg;
let playing = false;
let history = [];

function setup() {
  createCanvas(WIDTH * 2, HEIGHT * 2);
  strokeWeight(2);
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
  background(0);

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
  let topX;
  let topY;
  let vertices;
  for (let i = 0; i < contours.size(); i += 1) {
    vertices = [];
    let contour = contours.get(i);
    beginShape();
    for (let j = 0; j < contour.total(); j += 1) {
      const [x, y] = contour.intPtr(j);
      vertices.push([x, y]);
    }
    endShape(CLOSE);
  }

  if (vertices) history.push(vertices);
  const maxHistory = int(map(mouseX, 0, width, 1, 120, true));
  while (history.length > maxHistory) {
    history.shift(0, 1);
  }

  for (let i = 0; i < history.length; i += 1) {
    const c = map(i, 0, history.length - 1, 0, 255);
    stroke(255, 255, 255, c);
    if (i === history.length - 1) fill(0);
    const vertices = history[i];
    beginShape();
    for (let j = 0; j < vertices.length; j += 2) {
      const [x, y] = vertices[j];
      vertex(x * 2, y * 2);
    }
    endShape();
  }
}
