function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  stroke(80, 50, 20);
}

function draw() {
  background(230, 240, 255);

  let angle = map(mouseX, 0, width, 10, 50);
  let shrink = map(mouseY, 0, height, 0.6, 0.85);

  translate(width / 2, height);
  drawBranch(120, angle, shrink);
}

function drawBranch(len, angle, shrink) {
  strokeWeight(map(len, 2, 120, 1, 8));
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 6) {
    push();
    rotate(angle);
    drawBranch(len * shrink, angle, shrink);
    pop();

    push();
    rotate(-angle);
    drawBranch(len * shrink, angle, shrink);
    pop();
  }
}
