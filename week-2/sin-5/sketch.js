let trail = [];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  noFill();
  stroke(255);
  const radius = 300;
  const x = 400 + radius * cos(time * 3);
  const y = 400 + radius * sin(time * 3.7);
  trail.push([x, y]);
  if (trail.length > 600) {
    trail.shift(0, 1);
  }
  beginShape();
  for (let i = 0; i < trail.length; i += 1) {
    vertex(trail[i][0], trail[i][1]);
  }
  endShape();
  noStroke();
  fill(255);
  circle(x, y, 20);
}
