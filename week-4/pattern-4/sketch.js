function setup() {
  createCanvas(700, 700);
  noStroke();
}

function draw() {
  background(60);
  const time = Date.now() / 1000;

  // For this approach, we will store "energy" values and then distribute accordingly.
  const energy = [];
  for (let i = 0; i < 100; i += 1) {
    energy[i] = map(sin(i * 0.1 + time), -1, 1, 0.01, 1.0); // all positive!
  }

  // Now, calculate the total energy.
  let total = 0;
  for (let i = 0; i < 100; i += 1) {
    total = total + energy[i];
  }

  // Now each energy cell can be a pct, ie energy[0] / total.
  let w = 500;
  let h = 500;

  translate(100, 100);
  let x = 0;
  for (let i = 0; i < 100; i += 1) {
    let widthMe = 500 * (energy[i] / total);

    for (let j = 0; j < 100; j += 1) {
      const y = map(j, 0, 100, 0, 500);
      if ((i + j) % 2 === 0) fill(0);
      else fill(255);
      rect(x, y, widthMe, 5);
    }

    x += widthMe;
  }
}
