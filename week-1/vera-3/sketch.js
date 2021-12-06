function setup() {
  createCanvas(800, 800);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  randomSeed(mouseX * 1000);
  const offset = mouseY;
  beginShape();
  vertex(200 + random(-offset, offset), 200);
  vertex(600 + random(-offset, offset), 200);
  vertex(600 + random(-offset, offset), 600);
  vertex(200 + random(-offset, offset), 600);
  endShape(CLOSE);
}
