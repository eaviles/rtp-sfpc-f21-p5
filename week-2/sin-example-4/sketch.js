let radio;
let trail = [];

function setup() {
  createCanvas(800, 800);
  radio = createRadio();
  radio.option("circles");
  radio.option("trail");
  radio.selected("circles");
}

function draw() {
  background(0);
  const time = Date.now() / 1000;
  switch (radio.value()) {
    case "circles":
      {
        noStroke();
        fill(255);
        for (let i = 0; i < 10; i += 1) {
          const xorig = 400;
          const yorig = 400;
          const radius = 100 + i * 20;
          const angle = time * map(i, 0, 10, 1, 10);
          const x = xorig + radius * cos(angle);
          const y = yorig + radius * sin(angle);
          circle(x, y, 40);
        }
      }
      break;
    case "trail":
      {
        noFill();
        stroke(255);
        const xorig = 400 + 200 * sin(time * 0.4);
        const yorig = 400;
        const radius = 100 + 100 * sin(time * 3.0);
        const x = xorig + radius * cos(time);
        const y = yorig + radius * sin(time);
        trail.push([x, y]);
        if (trail.length > 200) {
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
      break;
  }
}
