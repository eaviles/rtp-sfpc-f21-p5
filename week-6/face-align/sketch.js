let capture;
let model;
let predictions = [];
let leftEyeSmt = [0, 0];
let rightEyeSmt = [0, 0];
const SMOOTH = 0.8;

function predict() {
  if (model) {
    model
      .estimateFaces(capture.elt)
      .then(loadedPredictions => {
        predictions = loadedPredictions;
        setTimeout(predict, 0);
      })
      .catch(() => {
        setTimeout(predict, 0);
      });
  } else {
    setTimeout(predict, 1000);
  }
}

function setup() {
  createCanvas(640, 480);
  angleMode(DEGREES);
  capture = createCapture(VIDEO, () => {
    predict();
  });
  capture.size(640, 480);
  capture.hide();
  blazeface.load().then(loadedModel => {
    model = loadedModel;
  });
}

function draw() {
  const [prediction] = predictions;

  if (prediction) {
    const { landmarks } = prediction;
    const [rightEye, leftEye] = landmarks;
    leftEyeSmt[0] = leftEyeSmt[0] * SMOOTH + leftEye[0] * (1.0 - SMOOTH);
    leftEyeSmt[1] = leftEyeSmt[1] * SMOOTH + leftEye[1] * (1.0 - SMOOTH);
    rightEyeSmt[0] = rightEyeSmt[0] * SMOOTH + rightEye[0] * (1.0 - SMOOTH);
    rightEyeSmt[1] = rightEyeSmt[1] * SMOOTH + rightEye[1] * (1.0 - SMOOTH);
  }

  const d = dist(leftEyeSmt[0], leftEyeSmt[1], rightEyeSmt[0], rightEyeSmt[1]);
  const diffX = leftEyeSmt[0] - rightEyeSmt[0];
  const diffY = leftEyeSmt[1] - rightEyeSmt[1];
  const offsetX = (leftEyeSmt[0] + rightEyeSmt[0]) / 2;
  const offsetY = (leftEyeSmt[1] + rightEyeSmt[1]) / 2;
  const angle = atan2(diffY, diffX) * -1;
  const s = 120 / d;

  translate(width / 2, height / 2);
  rotate(angle);
  scale(s);
  image(capture, -offsetX, -offsetY, width, height);
}
