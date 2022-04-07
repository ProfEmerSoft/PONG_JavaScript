// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Variáveis Velocidade X e Y
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete1
let xRaquete1 = 2;
let yRaquete1 = 160;
let TamanhoX = 5;
let TamanhoY = 80;

// Variáveis da Raquete2
let xRaquete2 = 593;
let yRaquete2 = 160;
let yVelocidRaquete2;
let Erro = 0;

// Variável Colisão
let colisao = false;

// Variáveis Placar
let Placar1 = 0;
let Placar2 = 0;

let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("Som do Jogo.wav");
  ponto = loadSound("Fundo.wav");
  raquetada = loadSound("Pong.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background("rgb(0,100,0)");
  LinhaCentral();
  Bolinha();
  Velocidade();
  VerificaColisaoBorda();
  Raquete(xRaquete1, yRaquete1);
  Raquete(xRaquete2, yRaquete2);
  MovimentoRaquete1();
  MovimentoRaquete2();
  //ColisaoRaquete();
  ColisaoRaqueteBiblioteca(xRaquete1, yRaquete1);
  ColisaoRaqueteBiblioteca(xRaquete2, yRaquete2);
  ContagemDePontos();
}

function LinhaCentral() {
  stroke(255);
  strokeWeight(1.5);
  line(300, 0, 300, 400);
}

function Bolinha() {
  fill("rgb(255, 255, 0)");
  circle(xBolinha, yBolinha, diametro);
}

function Velocidade() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function VerificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha < 0) {
    velocidadeXBolinha *= -1;
    ponto.play();
  }
  if (yBolinha + raio > height || yBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}

function Raquete(x, y) {
  fill("rgb(255, 0, 0)");
  rect(x, y, TamanhoX, TamanhoY);
}

function MovimentoRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 10;
  }
}

function MovimentoRaquete2() {
  if (keyIsDown(65)) {
    yRaquete2 -= 10;
  }
  if (keyIsDown(90)) {
    yRaquete2 += 10;
  }
}

//function MovimentoRaquete2() {
//  yVelocidRaquete2 = yBolinha - yRaquete2 - TamanhoY / 2 + Erro;
//  yRaquete2 += yVelocidRaquete2;
//  Erro -= random(-2, 2);
//  if (Erro > 100 || Erro < -100) {
//    Erro = 0;
//  }
//}

//function ColisaoRaquete1() {
//    if (xBolinha - raio < xRaquete1 + TamanhoX
//        && yBolinha - raio < yRaquete1 + TamanhoY
//        && yBolinha + raio > yRaquete1) {
//        velocidadeXBolinha *= -1;
//    }
//}

function ColisaoRaqueteBiblioteca(m, n) {
  colisao = collideRectCircle(
    m,
    n,
    TamanhoX,
    TamanhoY,
    xBolinha,
    yBolinha,
    diametro
  );
  if (colisao) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function PlacarDoJogo() {
  fill("rgb(250, 150, 70)");
  rect(235, 2, 55, 23, 15);
  rect(310, 2, 55, 23, 15);
  textSize(20);
  fill("rgb(255, 255, 255)");
  textAlign(CENTER);
  text(Placar1, 263, 20);
  text(Placar2, 340, 20);
}

function ContagemDePontos() {
  if (xBolinha > 590) {
    Placar1 += 1;
  }
  if (xBolinha < 0) {
    Placar2 += 1;
  }
  PlacarDoJogo();
  if (Placar1 === 7 || Placar2 === 7) {
    textSize(40);
    textAlign(CENTER);
    fill("rgb(255, 255, 255)");
    text("FIM DE JOGO!", 300, 200);
    trilha.pause();
    noLoop();
  }
}
