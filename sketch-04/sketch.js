let circles = [];
let maxRadius = 50;
let growthSpeed = 0.5;

let baseHue;
let harmonyOffsets = [0, 30, 60];

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100, 100);
  background(20);

  baseHue = random(360);
}

function draw() {
  background(20);

  let attempts = 0;
  let maxAttempts = 500;
  while (attempts < maxAttempts) {
    let newCircle = createCircle();
    if (newCircle) {
      circles.push(newCircle);
      break;
    } else {
      attempts++;
    }
  }

  for (let c of circles) {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false;
      } else {
        for (let other of circles) {
          if (c !== other) {
            let d = dist(c.x, c.y, other.x, other.y);
            if (d - 1 < c.r + other.r) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }
    c.grow(growthSpeed);
    c.show();
  }


  noStroke();
  fill(255);
  textSize(14);
}

function createCircle() {
  let x = random(width);
  let y = random(height);
  for (let c of circles) {
    let d = dist(x, y, c.x, c.y);
    if (d < c.r + 2) {
      return null;
    }
  }
  let hueIndex = circles.length % harmonyOffsets.length;
  let hue = (baseHue + harmonyOffsets[hueIndex]) % 360;
  return new Circle(x, y, hue);
}

class Circle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
    this.hue = hue;
  }

  grow(speed) {
    if (this.growing && this.r < maxRadius) {
      this.r += speed;
    }
  }

  edges() {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    );
  }

  show() {
    noStroke();
    fill(this.hue, 80, 90, 80);
    circle(this.x, this.y, this.r * 2);
  }
}
