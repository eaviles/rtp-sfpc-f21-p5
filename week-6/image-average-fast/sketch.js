const NUM_OF_IMAGES = 4;
const WIDTH = 640;
const HEIGHT = 480;

const images = [];

function preload() {
  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    const fileName = `/assets/images/polar-bear-${i + 1}.jpg`;
    images.push(loadImage(fileName));
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(1);
  noLoop();
}

function draw() {
  const sums = [];
  for (let x = 0; x < WIDTH; x += 1) {
    sums[x] = [];
    for (let y = 0; y < HEIGHT; y += 1) {
      sums[x][y] = [0, 0, 0];
    }
  }

  for (let i = 0; i < NUM_OF_IMAGES; i += 1) {
    image(images[i], 0, 0);
    loadPixels();
    for (let x = 0; x < WIDTH; x += 1) {
      for (let y = 0; y < HEIGHT; y += 1) {
        let off = (y * WIDTH + x) * 4;
        sums[x][y][0] += pixels[off];
        sums[x][y][1] += pixels[off + 1];
        sums[x][y][2] += pixels[off + 2];
      }
    }
  }

  let average = createImage(WIDTH, HEIGHT);
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
  image(average, 0, 0);
}
