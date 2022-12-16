let walls = [];
let ray;
let particle;

function setup() {
  // setup the space
  createCanvas(400, 400);

  // Boundary random lines
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  // Boundary borders
  walls.push(new Boundary(-1, -1, width, -1));
  walls.push(new Boundary(width, -1, width, height));
  walls.push(new Boundary(width, height, -1, height));
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
  particle.look(walls); // 2D raycasting with function "look"
}
