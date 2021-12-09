let srcImg;
let tmpImg;
let w, h;

function preload() {
  srcImg = loadImage("/assets/images/lillian.jpg");
}

function resetImg() {
  tmpImg.copy(srcImg, 0, 0, w, h, 0, 0, w, h);
  tmpImg.filter(THRESHOLD);
}

function setup() {
  pixelDensity(1);
  w = srcImg.width;
  h = srcImg.height;
  createCanvas(w, h * 2);
  tmpImg = createImage(w, h);
  resetImg();
}

function draw() {
  background(0);
  image(srcImg, 0, 0);
  image(tmpImg, 0, h);
  if (frameCount % 4 === 0) {
    tmpImg.filter(DILATE);
  }
}

function keyPressed() {
  resetImg();
}

function mouseClicked() {
  resetImg();
}
