var loadingText;
var titleText;
var creditsText;
// var nestedFrame;
var canvas;
var flowers = new Array(60);
var backgroundColor = 8;
var bgFlowerColor = 96;


function setup() {
  loadingText= createDiv('<font style="color: #cfffff; font-family: sans-serif">loading...</font>');
  //nestedFrame=createElement("iframe");
  //nestedFrame.hide();
  titleText=
    createDiv('<font style="font-size: 100px; color: #ffffff; font-family: serif">Seeds of Life</font>');
  titleText.hide();
  creditsText=
    createDiv("<font style=\"font-size: 20px; color: #ffffff; font-family: serif\">by Nicholas Alcus<br><a href=\"mailto:nalcus@gmail.com\">nalcus@gmail.com</a><br><a href=\"http://github.com/nalcus\">github/nalcus</a><br><a href=\"http://linkedin.com/in/nicholasalcus\">linked/in/nicholasalcus</a></font>");
  creditsText.hide();
  canvas = createCanvas(windowWidth,windowHeight);
  // smooth();
  frameRate(30);
  smooth();
  background(16);
  cacheTrig();
}

var flowersCached=false;
var didLoadFrame=false;


function draw() {
  background(backgroundColor);
  // check if the flowers are cached
  if (flowersCached==false)
  {
    // did we draw our loading screen
    if (didLoadFrame==false)
    {
      // draw load frame first
      background(16);
      stroke (127);
      drawFlower3(this,width/2,height/2,50,0,1.0);
      loadingText.position(width/2-100, height/2+125);
      didLoadFrame=true;
    } else {
      // generate flower images
      cacheFlowers();
      // hide loading text
      loadingText.remove();
      // show iframe
      /*
      nestedFrame.show();
      nestedFrame.position(200,100);
      nestedFrame.size(width-400,height-200);
      nestedFrame.attribute("src","frame.html");
      nestedFrame.attribute("frameborder","0");
      */
    }}
  else {doFrame()}
}

function doFrame() {
  stroke(255);
  noFill();
  strokeWeight(1);
  var transFloor = 156;
  var transCeiling = 255 - transFloor;
  var rowDistance = 120;
  var colDistance = 110;
  var size = 20;
  var mill=millis();
  var m=int(mill*0.0625)%colDistance;
  var n=mill*0.125;
  var o=mill*0.015625;
  var p=int(n%60);
  var q=int(2*n%60);
  var r=int(0.5*n%60);


  for (var y=-size;y<height+size;y+=2*rowDistance)
  {
    // odd row
    for (var x=-colDistance;x<width+colDistance;x+=colDistance)
    {
     //tint(p,sat,100);
     image(flowers[p],x+m,y);
    }
    // even row
    for (var x=-colDistance;x<width+colDistance;x+=colDistance)
    {
     //tint((p+180)%360,sat,100);
     image(flowers[p],x-m,y+rowDistance);
    }
  }
  // draw darker box
  fill(0,196);
  stroke(255,96);
  strokeWeight(4);
  rect(-5,-5,width+5,150);

  //put the text in the box
  titleText.show();
  titleText.position(32,8);
  creditsText.show();
  creditsText.position(700,16);

  // add one more flower in the title box
  colorMode(HSB,360,50,100,255);
  stroke(n%360,100,100,192);
  noFill();
  drawFlower3(this,width-75,75,75,p,1.0);
  stroke(0,0,100,192);
  drawFlower3(this,width-75,75,30,q,1.0);

  // size our frame
  //nestedFrame.size(width-400,height-200);
  //image(flowers[0],200,200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawFlower3(parent,x,y,r,o,bloom)
{
  noFill();
  // a^2 + b^2 = c^2
  var d=r*2;
  // upper left circle
  // center circle
  parent.ellipse (x,y,d,d);
  for (var i=0;i<6;i++) {
  var cX = x+fastSin(o+60*i)*r*bloom;
  var cY = y+fastCos(o+60*i)*r*bloom;
  parent.ellipse (cX,cY,d,d);
  }
}

function cacheFlowers()
{
  for (var i=0;i<60;i++)
  {
    flowers[i] = createGraphics(95, 95);
    flowers[i].background(0,0);
    flowers[i].noFill();
    flowers[i].stroke(bgFlowerColor,128);
    flowers[i].strokeWeight(3);
    //drawFlower3(flowers[i],50,50,20,i,1);
    //flowers[i].filter(BLUR,3);
    drawFlower3(flowers[i],50,50,20,i,1);
 }
 flowersCached=true;
}

var cacheSin = new Array(360);
var cacheCos = new Array(360);

function cacheTrig()
{
  for (var i=0;i<360;i++) {
    cacheSin[i]=sin(radians(i));
    cacheCos[i]=cos(radians(i));
  }
}

function fastSin(delta)
{
    var index=int(delta)%360;
    if (index < 0)
    {index+=360;}
    return cacheSin[index];
}

function fastCos(delta)
{
    var index=int(delta)%360;
    if (index < 0)
    {index+=360;}
    return cacheCos[index];
}
