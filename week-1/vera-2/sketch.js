function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(255);
  randomSeed(mouseX);
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      const x = map(i, 0, 4, 100, 700);
      const y = map(j, 0, 4, 100, 700);
      for (let k = 0; k < 10; k += 1) {
        const width = map(k, 0, 9, 5, 144);
        if (random() < 0.95) {
          rect(x, y, width, width);
        }
      }
    }
  }
}
