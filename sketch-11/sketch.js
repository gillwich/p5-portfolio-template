function setup() {
  createCanvas(500, 500);
  background(0);
  noStroke();
  fill(255);

  let rows = 100;
  let cols = 100;
  let radius = 250;

  translate(width / 2, height / 2);

  for (let i = 0; i < rows; i++) {
    let theta = map(i, 0, rows - 1, 0, PI);

    for (let j = 0; j < cols; j++) {
      let phi = map(j, 0, cols, 0, TWO_PI); 

      let x = radius * sin(theta) * cos(phi);
      let y = radius * sin(theta) * sin(phi);
      let z = radius * cos(theta);

      let brightness = map(z, -radius, radius, 50, 255);
      let size = map(z, -radius, radius, 0.5, 4);

      fill(brightness);
      ellipse(x, y, size, size);
    }
  }
}
