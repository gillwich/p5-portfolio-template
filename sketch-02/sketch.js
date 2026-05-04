class Bouncy {
  
  constructor(size, posX, posY, vitX, vitY){
    this.size = size;
    this.posX = posX;
    this.posY = posY;
    this.vitX = vitX;
    this.vitY = vitY;
    
  }
  
  
  bouger (){
    this.posX = this.posX + this.vitX;
    this.posY += this.vitY; 
  }
  
  rebondir (){
    if( this.posX + this.size > width || this.posX < 0 ){
      this.vitX = this.vitX * -1;
    }
    if( this.posY + this.size > height || this.posY < 0 ){
      this.vitY *= -1;  
    }
  }
  
  afficher (){
    stroke(0);
    square(this.posX, this.posY, this.size);
    noStroke();
    text(this.name, this.posX, this.posY-4);
  }
  
  update (){
    this.bouger();
    this.rebondir();
    this.afficher();
  }

};

let mesBouncies = [];

mesBouncies[0] = new Bouncy (16, 100, 200, 1.2, 1.79);
mesBouncies[1] = new Bouncy (20, 150, 120, 1.4, 1.9);
mesBouncies[2] = new Bouncy (10, 58, 45, 1.5, 2);

function setup() {
  createCanvas(500, 500);
  frameRate(120);
  
  for (let i = 0; i < 1000; i++){
    mesBouncies[i] = new Bouncy(16, 200, 200, random(-2, 2), random(-2,     2));
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i < mesBouncies.length; i++){
    mesBouncies[i].update();
  }
  
}



 