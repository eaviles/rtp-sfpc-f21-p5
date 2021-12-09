let orgImg;
let img;
let glitchImg;
let counter = 0;
let copyOrg = true;

function preload() {
  orgImg = loadImage("/assets/images/glitch-test.jpg");
}

function glitch() {
  if (copyOrg) {
    img.copy(orgImg, 0, 0, width, height, 0, 0, width, height);
    copyOrg = false;
    counter = 0;
  }
  img.resize(
    int(img.width + random(-200, 200)),
    int(img.height + random(-200, 200))
  );
  img.resize(
    int(img.width + random(-200, 200)),
    int(img.height + random(-200, 200))
  );
  const data = img.canvas.toDataURL("image/jpeg", 1);
  loadImage(data, loadedImg => {
    const { width: iw, height: ih } = loadedImg;
    img.copy(loadedImg, 0, 0, iw, ih, 0, 0, iw, ih);
    img.resize(width, height);
    glitchImg.copy(img, 0, 0, width, height, 0, 0, width, height);
    counter += 1;
    setTimeout(glitch, 0);
  });
}

function setup() {
  createCanvas(800, 480);
  img = createImage(width, height);
  glitchImg = createImage(width, height);
  pixelDensity(1);
  noStroke();
  fill(255);
  textSize(18);
  glitch();
}

function draw() {
  image(glitchImg, 0, 0);
  text(counter, 20, 34);
}

function mousePressed() {
  copyOrg = true;
}
