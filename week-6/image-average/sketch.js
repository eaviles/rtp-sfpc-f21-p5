const NUM_OF_IMAGES = 20;
const WIDTH = 640;
const HEIGHT = 480;

const images = [];
let average;

function preload() {
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    const counter = (i + 1).toString().padStart(2, "0");
    const fileName = `/assets/images/polar-bear-${counter}.jpg`;
    images.push(loadImage(fileName));
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(1);

  // Resize and crop all the images.
  const tmpImgs = [];
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

  // Prepare to sum the values of all pixels.
  const sums = [];
  for (let x = 0; x < WIDTH; x += 1) {
    sums[x] = [];
    for (let y = 0; y < HEIGHT; y += 1) {
      sums[x][y] = [0, 0, 0];
    }
  }

  // Sum the values of all pixels across all images.
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    const img = tmpImgs[i];
    img.loadPixels();
    for (let x = 0; x < WIDTH; x += 1) {
      for (let y = 0; y < HEIGHT; y += 1) {
        let off = (y * WIDTH + x) * 4;
        sums[x][y][0] += img.pixels[off];
        sums[x][y][1] += img.pixels[off + 1];
        sums[x][y][2] += img.pixels[off + 2];
      }
    }
  }

  // Create the average image.
  average = createImage(WIDTH, HEIGHT);
  average.loadPixels();
  for (let x = 0; x < WIDTH; x += 1) {
    for (let y = 0; y < HEIGHT; y += 1) {
      const avgR = sums[x][y][0] / NUM_OF_IMAGES;
      const avgG = sums[x][y][1] / NUM_OF_IMAGES;
      const avgB = sums[x][y][2] / NUM_OF_IMAGES;
      average.set(x, y, color(avgR, avgG, avgB));
    }
  }
  average.updatePixels();
}

function draw() {
  image(average, 0, 0);
}
