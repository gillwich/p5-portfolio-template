function setup() {
  createCanvas(500,500);
  background(255);
  rectMode(CENTER);

  let cols = 12;
  let rows = 12;
  let squareW = width / cols;
  let squareH = height / rows;
  let squareSize = min(squareW, squareH); 

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let posX = x * squareW + squareW / 2;
      let posY = y * squareH + squareH / 2;

      let chaos = map(y, 0, rows - 1, 0, 1);
      let angle = randomGaussian() * chaos * 0.5;
      let offsetX = randomGaussian() * chaos * squareW * 0.3;
      let offsetY = randomGaussian() * chaos * squareH * 0.3;

      push();
      translate(posX + offsetX, posY + offsetY);
      rotate(angle);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}
