var myLoc;
var myMap;
var canvas;
var destination;

var currentLat;
var currentLon;
var distance = 0;
var showPosition;

var mappa = new Mappa('MapboxGL', 'pk.eyJ1Ijoic2xvb3ZpcyIsImEiOiJjam95cmE5ODEwejg4M3FtdGdybGo3dnZ1In0.26V-ATtagaCZ14SKyE7ocg')

// var mappa = new Mappa('MapboxGL', 'pk.eyJ1Ijoic2xvb3ZpcyIsImEiOiJjam95cmE5ODEwejg4M3FtdGdybGo3dnZ1In0.26V-ATtagaCZ14SKyE7ocg')
var mappa = new Mappa('Mapbox', 'pk.eyJ1IjoibG9yZW56by1iYXJpbGxhIiwiYSI6ImNrMm1mamVrZDBmejEzaHg1azd6OHRkYmMifQ.q0zb18jXidR5Af6hHK-riw');

var options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  // style: 'mapbox://styles/sloovis/cjoyri21f5yrg2smcb4z17v2g',
  style: 'mapbox://styles/lorenzo-barilla/ck2x2f5ja1lrb1cpi3ihmn60b'


}

function preload() {
  myLoc = intervalCurrentPosition(showPosition, 10);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(windowWidth, windowHeight);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function draw() {
  destination = myMap.pixelToLatLng(mouseX, mouseY);
  distance = calcGeoDistance(currentLat, currentLon, destination.lat, destination.lng, 'km')
  //clear();
  push();
  fill("red");
  ellipse(mouseX, mouseY, 10);
  pop();

  push();
  textSize(32);

  text("Distanza = " + distance + " km", 100, 100);
  pop();


  line(showPosition.x, showPosition.y, mouseX, mouseY);
}

function showPosition(position) {
  console.log("checking position!");

  currentLat = position.latitude;
  currentLon = position.longitude;

  showPosition = myMap.latLngToPixel(currentLat, currentLon);

  //ellipse on gps position
  clear();
  ellipse(showPosition.x, showPosition.y, 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
