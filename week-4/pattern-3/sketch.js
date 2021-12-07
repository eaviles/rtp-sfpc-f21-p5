function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0);
  for (let i = 0; i < 30; i += 1) {
    for (let j = 0; j < 30; j += 1) {
      const x = map(i, 0, 29, 50, 750);
      const y = map(j, 0, 29, 50, 750);
      const distance = dist(x, y, mouseX, mouseY);
      const pct = map(distance, 0, 200, 1, 0, true);
      let diffX = x - mouseX;
      let diffY = y - mouseY;
      let length = sqrt(diffX ** 2 + diffY ** 2);
      if (length > 0) {
        diffX /= length;
        diffY /= length;
      }
      circle(x + diffX * pct * 50, y + diffY * pct * 50, (5 + 8 * pct) * 2);
    }
  }
}
