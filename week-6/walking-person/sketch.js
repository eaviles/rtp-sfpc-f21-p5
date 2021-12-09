const WIDTH = 640;
const HEIGHT = 320;

let video;
let playing = false;
let detector;
let poses = [];

function detect() {
  if (detector) {
    detector
      .estimatePoses(video.elt)
      .then(loadedPoses => {
        poses = loadedPoses;
        setTimeout(detect, 0);
      })
      .catch(() => {
        setTimeout(detect, 0);
      });
  } else {
    setTimeout(detect, 1000);
  }
}

function setupDetector() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    enableTracking: true,
    enableSmoothing: true,
    trackerType: poseDetection.TrackerType.BoundingBox
  };
  poseDetection
    .createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig)
    .then(loadedDetector => {
      detector = loadedDetector;
    });
  detect();
}

function setup() {
  createCanvas(WIDTH, HEIGHT * 2);
  video = createVideo("/assets/videos/pexels-7569650.mov", setupDetector);
  video.size(WIDTH, HEIGHT);
  video.hide();
  fill(255);
  noStroke();
}

function mousePressed() {
  if (playing) return;
  playing = true;
  video.loop();
}

function draw() {
  background(0);

  if (!playing) {
    text("click to play video", 10, 20);
    return;
  }

  for (let i = 0; i < poses.length; i += 1) {
    const { keypoints } = poses[i];
    for (let j = 0; j < keypoints.length; j += 1) {
      const { x, y } = keypoints[j];
      circle(x, y, 10);
    }
  }

  image(video, 0, HEIGHT, WIDTH, HEIGHT);
}
