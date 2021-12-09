let font;

function preload() {
  font = loadFont("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800);
  textFont(font);
  textSize(64);
  noStroke();
  noLoop();
}

function getStringBoundingBox(str, x, y) {
  const asc = textAscent();
  const desc = textDescent();
  const w = textWidth(str);
  return [x, y - asc, w, asc + desc];
}

function draw() {
  background(60);
  const x = 100;
  let y = 100;

  for (let i = 0; i <= 100; i += 1) {
    fill(map(i, 0, 100, 0, 255));
    text("hello", x + i, y + i);
  }

  y += 200;
  const str = "heljo";
  text(str, x, y);
  fill(255, 0, 0);
  circle(x, y, 8);
  noFill();
  stroke(255, 0, 0);
  line(x, y, x + 200, y);
  stroke(0, 255, 0);
  const box = font.textBounds(str, x, y);
  rect(box.x, box.y, box.w, box.h);
  stroke(255, 255, 0);
  rect(...getStringBoundingBox(str, x, y));
}
