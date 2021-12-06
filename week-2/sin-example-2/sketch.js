let radio;

function setup() {
  createCanvas(800, 800);
  radio = createRadio();
  radio.option("amplitude");
  radio.option("frequency");
  radio.option("phase");
  radio.selected("amplitude");
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  switch (radio.value()) {
    case "amplitude":
      for (let i = 0; i <= 80; i += 1) {
        const amount = map(i, 0, 80, 0, 400);
        const x = 400 + map(sin(time), -1, 1, -amount, amount);
        circle(x, i * 10, 10);
      }
      break;
    case "frequency":
      for (let i = 0; i <= 80; i += 1) {
        const scale = map(i, 0, 80, 0, 10);
        const x = map(sin(time * scale), -1, 1, 0, width);
        circle(x, i * 10, 10);
      }
      break;
    case "phase":
      for (let i = 0; i <= 80; i += 1) {
        const x = map(sin(time + i * 0.01), -1, 1, 0, width);
        circle(x, i * 10, 10);
      }
      break;
  }
}
