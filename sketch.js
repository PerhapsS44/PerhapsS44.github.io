var p = [];
var plength = 3;
var l = 100;
var birds = [];
var tempb = [];
var end = false;
var speed = 5;

function setup() {
  createCanvas(600, 400);
  for (var i=0; i<plength; i++) {
    p[i] = new Pillar();
    if (i > 0) {
      p[i].x += (i)* 300;
    }
  }
  for (var i=0; i<l; i++)
    birds[i] = new Bird();
  tempb = birds;
}

function draw() {
    for (var i=0; i<p.length; i++) {
      p[i].update();
      if (p[i].remove) {
        removePillar();
      }
    }
    for (var i=0; i<birds.length; i++) {
      birds[i].Collision(p);
      birds[i].update();
      var I = 0;
      if (p[0].x + p[0].w < birds[i].x)
        I = 1;

      var inputs = [];
      inputs[0] = birds[i].speed;
      inputs[1] = birds[i].y;
      inputs[2] = p[I].x-birds[i].x;
      inputs[3] = p[I].y1 - birds[i].y;
      inputs[4] = birds[i].y - p[I].y2;
      if (birds[i].n.estimate(inputs)[0] > 0.5) {
        if (birds[i].speed > 0)
          birds[i].speed = -4;
      }
      if (birds[i].endCondition()){ // TODO: delete the bird
        var t = removeBird(i);
        birds = t;
      }
    }
    if (birds.length == 0){
      NextGen();
    }


    background(0);
    for (var i=0; i<p.length; i++) {
      p[i].show();
    }
    for (var i=0; i<birds.length; i++)
      birds[i].show();

}


function removePillar() {
  for (var i=1; i<p.length; i++) {
    p[i-1] = p[i];
  }
  p[p.length-1] = new Pillar();
}

function removeBird(I) {
  var t = [];
  for(var i=0;i<I;i++)
    t[i] = birds[i];
  for (var i = I; i < birds.length - 1; i++) {
    t[i] = birds[i+1];
  }
  return t;
}

function NextGen(){
  //////////////////////New Birds/////////////////////

  birds = [];
  for (var i=0; i<l; i++)
    birds[i] = new Bird();
  for (var i=0; i<plength; i++) {
    p[i] = new Pillar();
    if (i > 0) {
      p[i].x += (i)* 300;
    }
  }
  reproduce();
  mutate();
  for (var i=0; i<l; i++)
    birds[i].n = brains[i];

  tempb = birds;

}

var brains = [];

function reproduce(){
  var sum = 0;
  for (b of tempb){
    sum+=b.score;
  }
  for (b of tempb){
    b.fitness = b.score / sum;
  }
  //=============Daca vrei sa te folosesti de ei sortati, folosesti asta
  // tempb.sort(function(a,b){
  //   return a.fitness - b.fitness;
  // });
  //====================================================================
  //console.log(tempb);



  for (var i=0; i< l; i++){
    brains[i] = tempb[i].n;
  }

  for (var i=0;i<l;i++){
    var a = chooseBird();
    var b = chooseBird();
    for (var x=0;x<tempb[0].n.m1.r;x++){
      for (var y=0;y<tempb[0].n.m1.c;y++){
        brains[i].m1.data[x][y] =
        (tempb[a].n.m1.data[x][y] +
          tempb[b].n.m1.data[x][y])/2;
      }
    }
    for (var x=0;x<tempb[0].n.m2.r;x++){
      for (var y=0;y<tempb[0].n.m2.c;y++){
        brains[i].m2.data[x][y] = (tempb[a].n.m2.data[x][y] + tempb[b].n.m2.data[x][y])/2;
      }
    }
    for (var x=0;x<tempb[0].n.bh.r;x++){
      for (var y=0;y<tempb[0].n.bh.c;y++){
        brains[i].bh.data[x][y] = (tempb[a].n.bh.data[x][y] + tempb[b].n.bh.data[x][y])/2;
      }
    }
    for (var x=0;x<tempb[0].n.bo.r;x++){
      for (var y=0;y<tempb[0].n.bo.c;y++){
        brains[i].bo.data[x][y] = (tempb[a].n.bo.data[x][y] + tempb[b].n.bo.data[x][y])/2;
      }
    }
  }
}


function chooseBird(){
  var r = random(0,1);
  var sum = 0;
  var j;
  for (j=0;j<l && sum < r;j++){
    sum+=tempb[j].fitness;
  }
  return j-1;
}

function mutate(){
  for (var i=0;i<l;i++){
    if (random(0,1) < 0.1){
      for (var x=0;x<tempb[0].n.m1.r;x++){
        for (var y=0;y<tempb[0].n.m1.c;y++){
          if (random(0,1) < 0.3)
          brains[i].m1.data[x][y] += random(-0.5,0.5);
        }
      }
      for (var x=0;x<tempb[0].n.m2.r;x++){
        for (var y=0;y<tempb[0].n.m2.c;y++){
          if (random(0,1) < 0.3)
          brains[i].m2.data[x][y] += random(-0.5,0.5);
        }
      }
      for (var x=0;x<tempb[0].n.bh.r;x++){
        for (var y=0;y<tempb[0].n.bh.c;y++){
          if (random(0,1) < 0.3)
          brains[i].bh.data[x][y] += random(-0.5,0.5);
        }
      }
      for (var x=0;x<tempb[0].n.bo.r;x++){
        for (var y=0;y<tempb[0].n.bo.c;y++){
          if (random(0,1) < 0.3)
          brains[i].bo.data[x][y] += random(-0.5,0.5);
        }
      }
    }
  }
}


class Bird {

  constructor() {
    this.x = 100;
    this.y = height/2;
    this.speed = 0;
    this.gravity = 0.2;
    this.limit = 5;
    this.score = 0;
    this.fitness = 0;
    this.end = false;
    this.n = new NeuralNetwork(5,4,1);
  }

  update() {
    this.speed += this.gravity;
    if (this.speed > this.limit)
      this.speed = this.limit;
    this.y += this.speed;
    this.score+=0.01;
  }

  show() {
    fill(255,255,255,100);
    ellipse(this.x, this.y, 32);
  }

  Collision(p) {
    for (var i=0; i<p.length; i++) {
      if ((this.x >= p[i].x && this.x <= (p[i].x+p[i].w)) && (this.y >= p[i].y2 || this.y <= p[i].y1)) {
        this.end = true;
      }
    }
    if (this.y > height || this.y < 0)
      this.end = true;
  }

  endCondition() {
    if (this.end){
      return true;
    }
    return false;
  }
}

class Pillar {

  constructor() {
    this.x = 900;
    this.w = 50;
    this.gap = 75;
    this.y1 = random(this.gap, height-2*this.gap);
    this.y2 = this.y1+this.gap;
    this.speed = 2;
    this. remove = false;
  }

  update(){
    this.x -= this.speed;
    if (this.x < -this.w){
      this.remove = true;
    }
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.y1);
    rect(this.x,this.y2,this.w,height-this.y2);
  }
}
