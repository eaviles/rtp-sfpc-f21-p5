const NUM_OF_IMAGES = 20;
const WIDTH = 640;
const HEIGHT = 480;

const images = [];
const tmpImgs = [];
let strip;
let average;

function preload() {
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    const counter = (i + 1).toString().padStart(2, "0");
    const fileName = `/assets/images/kitten-${counter}.jpg`;
    images.push(loadImage(fileName));
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT + HEIGHT / NUM_OF_IMAGES);
  pixelDensity(1);

  // Resize and crop all the images.
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    tmpImgs[i] = createImage(WIDTH, HEIGHT);
    const srcImg = images[i];
    let { width: sw, height: sh } = srcImg;
    const wRatio = WIDTH / sw;
    const hRatio = HEIGHT / sh;
    const ratio = max(wRatio, hRatio);
    sw *= ratio;
    sh *= ratio;
    srcImg.resize(sw, sh);
    const ox = (WIDTH - sw) / 2;
    const oy = (HEIGHT - sh) / 2;
    tmpImgs[i].copy(images[i], 0, 0, sw, sh, ox, oy, sw, sh);
  }

  // Find the average brightness across all images.
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    let avg = 0;
    const img = tmpImgs[i];
    img.loadPixels();
    for (let x = 0; x < WIDTH; x += 1) {
      for (let y = 0; y < HEIGHT; y += 1) {
        let off = (y * WIDTH + x) * 4;
        const r = img.pixels[off];
        const g = img.pixels[off + 1];
        const b = img.pixels[off + 2];
        avg += brightness(color(r, g, b));
      }
    }
    avg /= WIDTH * HEIGHT;
    img.brightness = avg;
  }

  // Sort the images by brightness.
  tmpImgs.sort((img1, img2) => {
    const a = img1.brightness;
    const b = img2.brightness;
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  });

  // Draw a strip with all the images.
  const dw = int(WIDTH / NUM_OF_IMAGES);
  const dh = int(HEIGHT / NUM_OF_IMAGES);
  strip = createImage(WIDTH, dh);
  for (let i = 0; i < tmpImgs.length; i += 1) {
    const srcImg = tmpImgs[i];
    const sw = srcImg.width;
    const sh = srcImg.height;
    const dx = i * dw;
    strip.copy(srcImg, 0, 0, sw, sh, dx, 0, dw, dh);
  }
  strip.filter(GRAY);
}

function draw() {
  const idx = int(map(mouseX, 0, width, 0, tmpImgs.length));
  image(tmpImgs[constrain(idx, 0, tmpImgs.length - 1)], 0, 0);
  image(strip, 0, HEIGHT);
}
