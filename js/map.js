var weatherApiKey = require('./../.env').weatherApiKey;

OurMap = function() {
};

OurMap.prototype.initMap = function(lat, long) {
  if (lat > 90 || lat < -90 || long > 180 || long < -180) {
    $('#map').text("Please enter a latitude between -90 and 90, or a longitude between -90 and 90. See science for more information about latitudes and longitudes.");
  } else {
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

// grabbing open weather json data
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + weatherApiKey).then(function(response){
        $('#weather').text("The humidity in this location is " + response.main.humidity + "%");
      }).fail(function(error) {
        $('#weather').text(error.responseJSON.message);
      });
// Sunrise and sunset info
    $.get('http://api.sunrise-sunset.org/json?lat='+ lat + '&lng=' + long + '&date=today').then(function(response) {
      $('#sunrise').text("The sun will rise at " + response.results.sunrise + " UTC")
      $('#sunset').text("The sun will set at " + response.results.sunset + " UTC")
    }).fail(function(error) {
      $('#sun').text(error.responseJSON.message);
    });
  }
}

exports.ourMapModule = OurMap;
