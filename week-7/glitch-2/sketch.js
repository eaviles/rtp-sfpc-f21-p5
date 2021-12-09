let orgImg;
let glitchImg;

function preload() {
  orgImg = loadImage("/assets/images/glitch-test.jpg");
}

function glitchSuccess(loadedImg) {
  const { width: sw, height: sh } = loadedImg;
  glitchImg.copy(loadedImg, 0, 0, sw, sh, 0, 0, width, height);
  setTimeout(glitch, 0);
}

function glitchFailed() {
  setTimeout(glitch, 100);
}

function glitch() {
  // Convert the original image to bytes that can be manipulated.
  const urlData = orgImg.canvas.toDataURL("image/jpeg", 1);
  const headerSep = urlData.indexOf(",");
  const header = urlData.slice(0, headerSep);
  const data = atob(urlData.slice(headerSep + 1));
  const { length } = data;
  const bytes = [];
  for (let i = 0; i < length; i += 1) {
    bytes.push(data.charCodeAt(i));
  }

  // Manipulate the bytes.
  randomSeed(0);
  const whereToSkip = map(mouseX, 0, width, 0, length, true);
  const left = length - whereToSkip;
  const howMuchToSkip = map(mouseY, 0, height, 0, left * 0.5, true);
  const newBytes = [];
  for (let i = 0; i < bytes.length; i += 1) {
    if (i < whereToSkip || i > whereToSkip + howMuchToSkip) {
      newBytes.push(bytes[i]);
    } else {
      newBytes.push(random(0, 255));
    }
  }

  // Conver the bytes into an image.
  let binary = "";
  for (let i = 0; i < newBytes.length; i += 1) {
    binary += String.fromCharCode(newBytes[i]);
  }
  loadImage(`${header},${btoa(binary)}`, glitchSuccess, glitchFailed);
}

function setup() {
  createCanvas(800, 480);
  glitchImg = createImage(width, height);
  pixelDensity(1);
  setTimeout(glitch, 1000);
}

function draw() {
  image(glitchImg, 0, 0);
}
