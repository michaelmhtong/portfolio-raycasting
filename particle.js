class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2); // original position (center)
    this.rays = [];
    this.heading = 0;
    for (let a = -30; a < 30; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a))); // make a ray every "a" radian
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -30; a < 30; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  move(amt) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    this.pos.add(vel);
  }

  look(walls) {
    const scene = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        // for every walls, find the intersection point
        const pt = ray.cast(wall);
        if (pt) {
          // d is distance, record is the shortest distance
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      // find the closest point if there are mulitple walls
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
