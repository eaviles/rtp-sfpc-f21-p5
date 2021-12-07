let img;
let radio1;
let radio2;

function preload() {
  img = loadImage("/assets/images/knowlton-ken.jpg");
}

function setup() {
  createCanvas(img.width * 2, img.height);
  angleMode(DEGREES);
  strokeWeight(2);
  stroke(255);
  noFill();

  radio1 = createRadio("radio1");
  radio1.option("lines");
  radio1.option("circles");
  radio1.selected("lines");

  radio2 = createRadio("radio2");
  radio2.option("mono");
  radio2.option("color");
  radio2.selected("mono");
}

function draw() {
  background(0);
  for (let i = 0; i < img.width; i += 10) {
    for (let j = 0; j < img.height; j += 10) {
      let c = img.get(i + 5, j + 5);
      let b = brightness(c);

      switch (radio1.value()) {
        case "lines":
          noFill();
          switch (radio2.value()) {
            case "mono":
              stroke(255);
              break;
            case "color":
              stroke(c);
              break;
          }

          push();
          translate(i + 5, j + 5);
          rotate(map(b, 0, 255, 0, mouseX));
          line(-5, 0, 5, 0);
          pop();
          break;

        case "circles":
          noStroke();
          switch (radio2.value()) {
            case "mono":
              fill(255);
              break;
            case "color":
              fill(c);
              break;
          }

          const maxRadius = map(mouseX, 0, img.width, 4, 12, true);
          const radius = map(b, 0, 255, 2, maxRadius);
          circle(i + 5, j + 5, radius * 2);
          break;
      }
    }
  }
  image(img, img.width, 0);
}
