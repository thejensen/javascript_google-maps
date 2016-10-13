var OurMap = require('./../js/map.js').ourMapModule;
var Weather = require('./../js/weather.js').weatherModule;
var Timezone = require('./../js/timezone.js').timezoneModule;

$(document).ready(function() {
  var currentMapObject = new OurMap();
  var currentWeatherObject = new Weather();
  var currentTimeZoneObject = new Timezone();

  $('#map-address').submit(function(event){
    event.preventDefault();
    var lat = parseFloat($('#lat').val());
    var long = parseFloat($('#long').val());
    currentMapObject.initMap(lat, long);
    $('#map').append(map);
    currentWeatherObject.getWeather(lat, long, function(sunrise){
      console.log(sunrise);
      currentTimeZoneObject.getOffset(lat, long, sunrise);
    });
  });
});
