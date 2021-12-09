let img;
let radio;

const SIZE = 128;
const SCALE = 4;

function setup() {
  createCanvas(SIZE * SCALE, SIZE * SCALE);
  pixelDensity(1);
  img = createImage(SIZE, SIZE);
  radio = createRadio();
  radio.option("corners");
  radio.option("mouse");
  radio.option("checkers");
  radio.option("noise");
  radio.selected("corners");
}

function draw() {
  background(0);
  img.loadPixels();
  const sel = radio.value();
  for (let i = 0; i < SIZE; i += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      const off = (j * SIZE + i) * 4;
      let r, g, b;

      switch (sel) {
        case "corners":
          r = map(i, 0, SIZE, 0, 255);
          g = map(j, 0, SIZE, 0, 255);
          b = map(mouseX, 0, width, 0, 255, true);
          break;

        case "mouse":
          const d = dist(mouseX, mouseY, i * SCALE, j * SCALE);
          if (d < 100) {
            const pct = map(d, 0, 100, 1, 0);
            r = g = b = 255 * pct;
          } else {
            r = g = b = 0;
          }
          break;

        case "checkers":
          r = g = b = sin(i * SCALE * 0.1) * sin(j * SCALE * 0.1) * 127 + 127;
          break;

        case "noise":
          r = g = b = random(0, 255);
          break;
      }

      img.pixels[off] = r;
      img.pixels[off + 1] = g;
      img.pixels[off + 2] = b;
      img.pixels[off + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, SIZE * SCALE, SIZE * SCALE);
}
