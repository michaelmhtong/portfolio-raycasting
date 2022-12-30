let walls = [];
let ray;
let particle;
let start;
let end;
let sliderFOV;

const sceneW = 400;
const sceneH = 400;

function setup() {
  // setup the space
  createCanvas(800, 400);
  // initialize empty array to store the lines
  walls = [];
  // set up the canvas to listen for mouse clicks
  canvas.addEventListener("mousedown", startLine);
  canvas.addEventListener("mouseup", endLine);
  // Boundary borders
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
  sliderFOV = createSlider(0, 360, 60);
  sliderFOV.input(changeFOV);
}


function startLine() {
  start = createVector(mouseX, mouseY);
}

function endLine() {
  end = createVector(mouseX, mouseY);
  // create a new boundary object based on the start and end positions
  walls.push(new Boundary(start.x, start.y, end.x, end.y));
  // reset start and end positions
  start = null;
  end = null;
}

function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.05);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.05);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(2);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-2);
  }

  background(0);

  // loop through the array "walls" and show it
  for (let wall of walls) {
    wall.show();
  }
  particle.show();

  if (start && end) {
    stroke(255);
    line(start.x, start.y, end.x, end.y);
  }

  const scene = particle.look(walls);
  const w = sceneW / scene.length; // width based on the length
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}
