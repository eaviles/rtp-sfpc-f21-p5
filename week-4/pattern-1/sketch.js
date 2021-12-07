function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(128);
  for (let y = 0; y <= 20; y += 1) {
    let offset = y % 8;
    if (offset > 4) {
      offset = 8 - offset;
    }
    for (let x = 0; x <= 20; x += 1) {
      if ((x + offset) % 4 < 2) {
        fill(255);
      } else {
        fill(0);
      }
      circle(x * 30 + 100, y * 30 + 100, 30);
    }
  }
}
