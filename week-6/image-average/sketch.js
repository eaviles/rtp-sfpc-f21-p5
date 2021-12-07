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
  noLoop();
}

function draw() {
  let average = createImage(WIDTH, HEIGHT);
  average.loadPixels();
  for (let i = 0; i < WIDTH; i += 1) {
    for (let j = 0; j < HEIGHT; j += 1) {
      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;
      for (let k = 0; k < NUM_OF_IMAGES; k += 1) {
        const color = images[k].get(i, j);
        sumRed += color[0];
        sumGreen += color[1];
        sumBlue += color[2];
      }
      sumRed /= NUM_OF_IMAGES;
      sumGreen /= NUM_OF_IMAGES;
      sumBlue /= NUM_OF_IMAGES;
      average.set(i, j, color(sumRed, sumGreen, sumBlue));
    }
  }
  average.updatePixels();
  image(average, 0, 0);
}
