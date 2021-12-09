let font;
let fontData;
let paths = [];

function preload() {
  fontData = loadBytes("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  debugMode(AXES, 400, 0, 0, 0);
  noFill();
  font = opentype.parse(fontData.bytes.buffer);
  paths.push(font.getPath("hello", 0, 0, 120));
  paths.push(font.getPath("world", 0, 0, 120));
  strokeWeight(2);
}

function drawText({ commands }) {
  for (let i = 0; i < commands.length; i += 1) {
    const { type, x, y, x1, y1, x2, y2 } = commands[i];
    switch (type) {
      case "M":
        beginShape();
        vertex(x, y);
        break;
      case "L":
        vertex(x, y);
        break;
      case "C":
        bezierVertex(x1, y1, x2, y2, x, y);
        break;
      case "Q":
        quadraticVertex(x1, y1, x, y);
        break;
      case "Z":
        endShape();
        break;
    }
  }
}

function draw() {
  background(60);
  orbitControl();
  stroke(255, 0, 0);
  drawText(paths[0]);
  rotateY(PI / 2);
  stroke(0, 255, 0);
  drawText(paths[1]);
}
