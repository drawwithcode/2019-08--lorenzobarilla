//variables
var myLoc;
var myMap;
var canvas;
var destination;

var currentLat;
var currentLon;
var distance = 0;
var showPosition;

var mappa = new Mappa('MapboxGL', 'pk.eyJ1Ijoic2xvb3ZpcyIsImEiOiJjam95cmE5ODEwejg4M3FtdGdybGo3dnZ1In0.26V-ATtagaCZ14SKyE7ocg')
//my own Mapbox style doesn't work
// var mappa = new Mappa('Mapbox', 'pk.eyJ1IjoibG9yZW56by1iYXJpbGxhIiwiYSI6ImNrMm1mamVrZDBmejEzaHg1azd6OHRkYmMifQ.q0zb18jXidR5Af6hHK-riw');

//map settings when loaded
var options = {
  lat: 42,
  lng: 12.5,
  zoom: 3.5,
  style: 'mapbox://styles/sloovis/cjoyri21f5yrg2smcb4z17v2g',
  // style: 'mapbox://styles/lorenzo-barilla/ck2x2f5ja1lrb1cpi3ihmn60b'
}

function preload() {
  //get current posiiton
  myLoc = intervalCurrentPosition(showPosition, 10);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(windowWidth, windowHeight);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function draw() {
  //mouse as destination point
  destination = myMap.pixelToLatLng(mouseX, mouseY);
  push();
  fill("red");
  ellipse(mouseX, mouseY, 10);
  pop();


  //calculate distance between position and destinatin
  distance = round(calcGeoDistance(currentLat, currentLon, destination.lat, destination.lng, 'km'))


  //Text: instructions
  push();
  textFont("Raleway");
  textSize(36);
  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Use the mouse to choose your destination", width/2, 100);
  pop();

  //Text: distance from destination
  push();
  textFont("Raleway");
  textSize(24);
  textAlign(LEFT);
  textStyle(ITALIC);
  text("Your destination is " + distance + "km from you!", mouseX, mouseY);
  pop();

  //connect position and destination
  line(showPosition.x, showPosition.y, mouseX, mouseY);
}


//callback when intervalCurrentPosition is executed
function showPosition(position) {
  currentLat = position.latitude;
  currentLon = position.longitude;

//convert latitude and longitude in x, y values
  showPosition = myMap.latLngToPixel(currentLat, currentLon);

  //ellipse on gps position
  push()
  clear();
  stroke("red");
  strokeWeight(5);
  fill("white");
  ellipse(showPosition.x, showPosition.y, 20);
  pop();
}
