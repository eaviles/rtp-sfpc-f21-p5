function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0);

  // randomSeed(mouseX);
  // for (let i = 0; i < 800; i += 1) {
  //   circle(i, 400 + random(-100, 100), 4);
  // }

  for (let i = 0; i < 800; i += 1) {
    const signedNoise = map(noise(i * 0.01 + mouseX * 0.1), 0, 1, -1, 1);
    circle(i, 400 + signedNoise * 100, 4);
  }
}
