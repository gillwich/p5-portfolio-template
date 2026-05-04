function setup() {
  createCanvas(500, 500);
  noStroke();
  colorMode(HSB, 360, 100, 100, 255); 
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let radius = 200;
  let rows = 100;
  let cols = 100;
  let rot = millis() * 0.0005;

  for (let i = 0; i < rows; i++) {
    let theta = map(i, 0, rows, 0, PI); 

    for (let j = 0; j < cols; j++) {
      let phi = map(j, 0, cols, 0, TWO_PI); 

      let x3D = radius * sin(theta) * cos(phi);
      let y3D = radius * sin(theta) * sin(phi);
      let z3D = radius * cos(theta);

      let xRot = x3D * cos(rot) - z3D * sin(rot);
      let zRot = x3D * sin(rot) + z3D * cos(rot);

      let perspective = map(zRot, -radius, radius, 1.5, 0.3);
      let x2D = xRot * perspective;
      let y2D = y3D * perspective;

      let dotSize = map(zRot, -radius, radius, 0.5, 4);
      let alpha = map(zRot, -radius, radius, 30, 255);

      let hue = map(theta, 0, PI, 0, 360);
      fill(hue, 80, 100, alpha);
      ellipse(x2D, y2D, dotSize);
    }
  }
}
