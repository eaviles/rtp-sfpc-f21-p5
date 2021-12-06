function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  const x = map(sin(time), -1, 1, 0, width);
  circle(x, 400, 60);
}
