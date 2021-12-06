let radio;

function setup() {
  createCanvas(800, 800);
  noStroke();
  radio = createRadio();
  radio.option("random");
  radio.option("signedNoise");
  radio.selected("random");
}

function draw() {
  background(0);
  switch (radio.value()) {
    case "random":
      randomSeed(mouseX);
      for (let i = 0; i < 800; i += 1) {
        circle(i, 400 + random(-100, 100), 4);
      }
      break;
    case "signedNoise":
      for (let i = 0; i < 800; i += 1) {
        const signedNoise = map(noise(i * 0.01 + mouseX * 0.1), 0, 1, -1, 1);
        circle(i, 400 + signedNoise * 100, 4);
      }
      break;
  }
}
