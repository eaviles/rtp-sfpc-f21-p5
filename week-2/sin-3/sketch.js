function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  for (let i = 0; i < 800; i += 1) {
    fill(
      127 + 127 * sin(i * 0.01),
      127 + 127 * sin(i * 0.011),
      127 + 127 * sin(i * 0.012)
    );
    const offset = 400 + 200 * sin(time + i * 0.02);
    const diameter = 50 + 50 * sin(time + i * 0.01);
    circle(offset, i, diameter);
  }
}
