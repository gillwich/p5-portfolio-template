let particles = [];

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(20);

  if (frameCount % 5 === 0) {
    particles.push(new Particle(random(width), 0));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.applyForce(createVector(0, 0.2));
    p.update();
    p.display();

    if (p.isOffScreen()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), 0);
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.color = color(random(100, 255), random(50, 150), random(200, 255), 200);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Bounce on bottom
    if (this.pos.y + this.size / 2 > height) {
      this.pos.y = height - this.size / 2;
      this.vel.y *= -0.6;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isOffScreen() {
    return this.pos.x < -this.size || this.pos.x > width + this.size;
  }
}
