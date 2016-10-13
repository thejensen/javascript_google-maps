var apiKey = require('./../.env').apiKey;

OurMap = function() {
};

OurMap.prototype.initMap = function(lat, long) {
  var latLong = new google.maps.LatLng(lat, long);
  var options = {
    zoom : 10,
    center : latLong
  };
  var map = new google.maps.Map(document.getElementById('map'), options);
  console.log(map);

  new google.maps.Marker({
    map: map,
    position: latLong
  });
}

exports.ourMapModule = OurMap;
