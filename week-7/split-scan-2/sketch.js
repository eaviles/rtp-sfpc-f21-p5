const WIDTH = 320;
const HEIGHT = 240;

let capture;
let img;
let imgs = [];
let ready = false;

function setup() {
  frameRate(30);
  createCanvas(WIDTH * 2, HEIGHT * 2);
  capture = createCapture(VIDEO, () => {
    ready = true;
  });
  capture.size(WIDTH, HEIGHT);
  capture.hide();
  pixelDensity(1);
  img = createImage(WIDTH, HEIGHT);
}

function draw() {
  background(0);
  if (!ready) return;

  const newImg = createImage(WIDTH, HEIGHT);
  newImg.copy(capture, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
  imgs.push(newImg);
  if (imgs.length > 80) {
    imgs.shift(0, 1);
  }

  if (imgs.length > 0) {
    const yskip = Math.round(HEIGHT / imgs.length);
    for (let y = 0; y < HEIGHT; y += yskip) {
      const imgIdx = map(y, 0, HEIGHT, 0, imgs.length);
      const srcImg = imgs[Math.round(imgIdx)];
      if (srcImg) img.copy(srcImg, 0, y, WIDTH, yskip, 0, y, WIDTH, yskip);
    }
  }

  image(img, 0, 0, WIDTH * 2, HEIGHT * 2);
}
