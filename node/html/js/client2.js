
function createIcon(line, color) {
  switch(line.length){
    case 1:
      var width = 10;
      break;
    case 2:
      var width = 16;
      break;
    case 3:
      var width = 22;
      break;
    default:
      var width = 10;
  }
  return {
    path: "M-14 -8, l " + width + " 0, l 0 14, l -" + width + " 0, l 0 -14",
    fillColor: color,
    fillOpacity: 0.2
  }
};

var icon = {
	path: "M-14 -8, l 22 0, l 0 14, l -22 0, l 0 -14",
	fillColor: "#0000FF",
	fillOpacity: 0.2
}

var myLatLng = {lat: 60.445, lng: 22.321};
var kupittaaLatLng = {lat: 60.445, lng: 22.291};

// test lat and long is at turku and will be 

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: kupittaaLatLng
});

var marker = new MarkerWithLabel({
  position: myLatLng,
  map: map,
  labelContent: "220", // label will have to be generated using javascript
  labelAnchor: new google.maps.Point(12,8),
  title: 'Hello World!',
  icon: icon
});

function createMarker(latitude, longitude, text){
  var latLng = {lat: latitude, lng: longitude};
  return new MarkerWithLabel({
    position: latLng,
    map: map,
    labelContent: text,
    labelAnchor: new google.maps.Point(12,8),
    title: 'asdf',
    icon: createIcon(text, "#00FF00")
  })
};

var marker2 = createMarker(60.445, 22.291, "1");
// set position is used to update the marker position when necessary
//marker2.setPosition(new google.maps.LatLng(60.345, 22.291));

var bussit = [
    {
        "direction": "1", 
        "nextstop": "Rieskal\u00e4hteentie", 
        "longitude": 22.254745, 
        "latitude": 60.464652, 
        "line": "6", 
        "bus_id": "200078"
    }, 
    {
        "direction": "1", 
        "nextstop": "Yrj\u00e4n\u00e4naukio", 
        "longitude": 22.267843, 
        "latitude": 60.459028, 
        "line": "20", 
        "bus_id": "110416"
    }, 
    {
        "direction": "2", 
        "nextstop": "Paasirinne", 
        "longitude": 22.250834, 
        "latitude": 60.456269, 
        "line": "20", 
        "bus_id": "110415"
    }
];


$.getJSON('http://localhost:3000/bussit', function(data){
  var markers = []
  $.each(data, function(i, bussi){
    markers.push(createMarker(bussi.latitude,bussi.longitude,bussi.line));
  })
});

//var markers = [];
//for (i = 0; i < bussit.length; i++) {
//  markers.push(createMarker(bussit[i].latitude, bussit[i].longitude, bussit[i].line));
  //console.log(bussit[i].latitude);
//};
//console.log(bussit[1].line);