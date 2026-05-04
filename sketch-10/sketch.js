let sun;
let planets = [];
let scaleFactor = 0.6;

function setup() {
  createCanvas(500, 500);

  sun = new CelestialBody(0, 0, 50 * scaleFactor, color(255, 204, 0), 0);

  planets.push(new Planet(120 * scaleFactor, 20 * scaleFactor, 0.01, 1));
  planets.push(new Planet(180 * scaleFactor, 30 * scaleFactor, 0.007, 2));
  planets.push(new Planet(250 * scaleFactor, 25 * scaleFactor, 0.005, 0));
  planets.push(new Planet(320 * scaleFactor, 35 * scaleFactor, 0.003, 3));
}

function draw() {
  background(10, 10, 30);
  translate(width / 2, height / 2);

  sun.display();

  for (let p of planets) {
    p.orbit();
    p.display();
  }
}

class CelestialBody {
  constructor(x, y, size, col, angle) {
    this.pos = createVector(x, y);
    this.size = size;
    this.col = col;
    this.angle = angle;
  }

  display() {
    push();
    noStroke();

    for (let i = 10; i > 0; i--) {
      fill(red(this.col), green(this.col), blue(this.col), 10);
      ellipse(this.pos.x, this.pos.y, this.size + i * 10 * scaleFactor);
    }

    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }
}

class Planet extends CelestialBody {
  constructor(distance, size, orbitSpeed, moonCount) {
    super(distance, 0, size, color(random(50, 255), random(50, 255), random(50, 255)), 0);
    this.distance = distance;
    this.orbitSpeed = orbitSpeed;
    this.moons = [];
    this.angle = random(TWO_PI);

    for (let i = 0; i < moonCount; i++) {
      let moonDistance = random(this.size + 10, this.size + 30) * scaleFactor;
      let moonSize = random(5, 10) * scaleFactor;
      let moonSpeed = random(0.01, 0.03);

      let moon = new CelestialBody(moonDistance, 0, moonSize, color(200), random(TWO_PI));
      moon.orbitSpeed = moonSpeed;
      moon.distance = moonDistance;

      this.moons.push(moon);
    }
  }

  orbit() {
    this.angle += this.orbitSpeed;
    this.pos.x = cos(this.angle) * this.distance;
    this.pos.y = sin(this.angle) * this.distance;

    for (let moon of this.moons) {
      moon.angle += moon.orbitSpeed;
      moon.pos.x = this.pos.x + cos(moon.angle) * moon.distance;
      moon.pos.y = this.pos.y + sin(moon.angle) * moon.distance;
    }
  }

  display() {
    super.display();

    for (let moon of this.moons) {
      push();
      noStroke();
      fill(moon.col);
      ellipse(moon.pos.x, moon.pos.y, moon.size);
      pop();
    }
  }
}