function setup() {
  createCanvas(800, 800);
  randomSeed(0);
  noiseSeed(0);
  noLoop();
}

function draw() {
  for (let i = 0; i < 40; i += 1) {
    for (let j = 0; j < 40; j += 1) {
      const x = map(i, 0, 39, 50, 750);
      const y = map(j, 0, 39, 50, 750);
      push();
      translate(x, y);
      rotate(random(0, TAU));
      if (noise(i * 0.1, j * 0.1) < 0.6) {
        line(-15, 0, 15, 0);
      }
      pop();
    }
  }
}
