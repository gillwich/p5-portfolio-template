let particles = [];

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(20, 25, 40, 50);

  for (let p of particles) {
    let mouse = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(mouse, p.pos);
    let distance = constrain(force.mag(), 5, 100);
    force.normalize();
    let strength = 100 / (distance * distance);
    force.mult(strength);

    p.applyForce(force);
    p.update();
    p.show();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
    this.mass = random(1, 3);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    fill(200, 200, 255, 180);
    ellipse(this.pos.x, this.pos.y, this.mass * 4);
  }
}
