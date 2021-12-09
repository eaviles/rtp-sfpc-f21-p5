let radio;
let addedTime = 0;

function setup() {
  createCanvas(800, 800);
  radio = createRadio();
  radio.option("additive");
  radio.option("amplitude");
  radio.option("frequency");
  radio.selected("additive");
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  let x;
  switch (radio.value()) {
    case "additive":
      x = map(sin(time) + sin(time * 4.72), -2, 2, 0, width);
      break;
    case "amplitude":
      const mod = map(sin(time), -1, 1, 0, 1);
      x = map(mod * sin(time * 5), -1, 1, 0, width);
      break;
    case "frequency":
      const adder = map(sin(time), -1, 1, 0.01, 0.15);
      addedTime += adder;
      x = map(sin(addedTime), -1, 1, 0, width);
      break;
  }
  circle(x, 400, 20);
}
