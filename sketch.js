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

const gridSize = 20;
const gridWidth = sceneW / gridSize;
const gridHeight = sceneH / gridSize;

function startLine() {
  // Calculate the column and row of the grid based on the mouse position
  const col = floor(mouseX / gridSize);
  const row = floor(mouseY / gridSize);
  // Calculate the start position based on the grid column and row
  start = createVector(col * gridSize, row * gridSize);
}

function endLine() {
  // Calculate the column and row of the grid based on the mouse position
  const col = floor(mouseX / gridSize);
  const row = floor(mouseY / gridSize);
  // Calculate the end position based on the grid column and row
  end = createVector(col * gridSize, row * gridSize);
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

function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    // move the particle left
    particle.move(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    // move the particle right
    particle.move(1, 0);
  } else if (keyIsDown(UP_ARROW)) {
    // move the particle up
    particle.move(0, -1);
  } else if (keyIsDown(DOWN_ARROW)) {
    // move the particle down
    particle.move(0, 1);
  } else if (key === "q") {
    // Rotate the particle 90 degrees counterclockwise
    particle.rotate(-PI / 2);
  } else if (key === "e") {
    // Rotate the particle 90 degrees clockwise
    particle.rotate(PI / 2);
  }
}

function draw() {
  background(0);

  stroke(255);
  for (let x = 0; x < sceneW; x += gridSize) {
    line(x, 0, x, sceneH);
  }

  stroke(255);
  for (let y = 0; y < sceneH; y += gridSize) {
    line(0, y, sceneW, y);
  }

  // loop through the array "walls" and show it
  for (let wall of walls) {
    wall.show();
  }
  particle.show();

  // check if the user is currently drawing a line
  if (start) {
    // Calculate the column and row of the grid based on the mouse position
    const col = floor(mouseX / gridSize);
    const row = floor(mouseY / gridSize);
    // Calculate the end position based on the grid column and row
    end = createVector(col * gridSize, row * gridSize);
    // draw a line from the start position to the end position
    stroke(255);
    line(start.x, start.y, end.x, end.y);
  }

  if (start && end) {
    stroke(255);
    line(start.x, start.y, end.x, end.y);
  }

  // // Calculate the angle between the particle's position and the mouse position
  // const angle = atan2(mouseY - particle.pos.y, mouseX - particle.pos.x);
  // // Calculate the difference between the current heading and the target angle
  // const angleDiff = angle - particle.heading;
  // // Rotate the particle by the clamped angle
  // particle.rotate(angleDiff);

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
