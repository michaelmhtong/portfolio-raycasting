// Wall

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1); // point a
    this.b = createVector(x2, y2); // point b
  }
  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y); // draw a line with x-y coordinates in a & b
  }
}
