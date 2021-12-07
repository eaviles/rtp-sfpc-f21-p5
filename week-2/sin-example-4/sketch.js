function setup() {
  createCanvas(800, 800);
  noStroke();
  fill(255);
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  for (let i = 0; i < 10; i += 1) {
    const radius = 100 + i * 20;
    const angle = time * map(i, 0, 10, 1, 10);
    const x = 400 + radius * cos(angle);
    const y = 400 + radius * sin(angle);
    circle(x, y, 40);
  }
}
