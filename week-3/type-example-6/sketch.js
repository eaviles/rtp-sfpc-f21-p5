let font;
let letters = [];

function preload() {
  font = loadFont("/assets/fonts/framd.ttf");
}

function setup() {
  createCanvas(800, 800);
  textFont(font);
  textSize(220);
  noStroke();
  fill(255);

  const str = "hello";
  let offset = 180;
  for (let i = 0; i < str.length; i += 1) {
    letters.push(
      font.textToPoints(str[i], offset, 450, undefined, {
        sampleFactor: 1
      })
    );
    offset += textWidth(str[i]) * 0.9;
  }
}

function draw() {
  background(60);
  randomSeed(mouseY);
  for (let i = 0; i < letters.length; i += 1) {
    beginShape();
    letters[i].forEach(({ x, y }) =>
      vertex(
        x + random(-mouseX / 3, mouseX / 3),
        y + random(-mouseX / 3, mouseX / 3)
      )
    );
    endShape();
  }
}
