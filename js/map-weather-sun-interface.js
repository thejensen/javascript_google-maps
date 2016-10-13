var OurMap = require('./../js/map.js').ourMapModule;
var Weather = require('./../js/weather.js').weatherModule;
var Sun = require('./../js/sun.js').sunModule;

$(document).ready(function() {
  var currentMapObject = new OurMap();
  var currentWeatherObject = new Weather();
  var currentSunObject = new Sun();

  $('#map-address').submit(function(event){
    event.preventDefault();
    var lat = parseFloat($('#lat').val());
    var long = parseFloat($('#long').val());
    currentMapObject.initMap(lat, long);
    $('#map').append(map);
    currentWeatherObject.getWeather(lat, long);
    currentSunObject.getSun(lat, long);
  });
});
