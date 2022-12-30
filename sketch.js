let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

function setup() {
  // setup the space
  createCanvas(800, 400);

  // Boundary random lines
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  // Boundary borders
  walls.push(new Boundary(-1, -1, sceneW, -1));
  walls.push(new Boundary(sceneW, -1, sceneW, sceneH));
  walls.push(new Boundary(sceneW, height, -1, sceneH));
  walls.push(new Boundary(-1, height, -1, -1));
  particle = new Particle();
}

function draw() {
  background(0);

  // loop through the array "walls" and show it
  for (let wall of walls) {
    wall.show();
  }

  particle.update(mouseX, mouseY); // particle update according the mouse position
  particle.show();

  const scene = particle.look(walls);
  const w = sceneW / scene.length; // width based on the length
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const b = map(scene[i], 0, sceneW, 255, 0);
    fill(b);
    rect(i * w, 0, w, height);
  }
  pop();
}
