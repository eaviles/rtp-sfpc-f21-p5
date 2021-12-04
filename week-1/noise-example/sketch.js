function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  for (let i = 0; i < 80; i += 1) {
    for (let j = 0; j < 80; j += 1) {
      fill(noise(i * 0.01, j * 0.01, mouseX * 0.1) * 255);
      rect(i * 10, j * 10, 10, 10);
    }
  }
}
