function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0);

  const w = width / 30;
  const h = width / 30;

  for (let i = 0; i < 30; i += 1) {
    for (let j = 0; j < 30; j += 1) {
      let xPct = map(i, 0, 30, 0, 1);
      xPct = xPct ** (mouseX * 0.01);

      let xPct2 = map(i + 1, 0, 30, 0, 1);
      xPct2 = xPct2 ** (mouseX * 0.01);

      const x = map(xPct, 0, 1, 0, width);
      const x2 = map(xPct2, 0, 1, 0, width);

      const y = map(j, 0, 30, 0, width);

      if ((j + i) % 2 === 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(x, y, x2 - x, h);
    }
  }
}
