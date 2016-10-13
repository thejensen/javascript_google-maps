var OurMap = require('./../js/map.js').ourMapModule;
var Weather = require('./../js/weather.js').weatherModule;
var Sun = require('./../js/sun.js').sunModule;
var Timezone = require('./../js/timezone.js').timezoneModule;


$(document).ready(function() {
  var currentMapObject = new OurMap();
  var currentWeatherObject = new Weather();
  var currentSunObject = new Sun();
  var currentTimeZoneObject = new Timezone();

  $('#map-address').submit(function(event){
    event.preventDefault();
    var lat = parseFloat($('#lat').val());
    var long = parseFloat($('#long').val());
    currentMapObject.initMap(lat, long);
    $('#map').append(map);
    currentSunObject.getSun(lat, long);
    currentWeatherObject.getWeather(lat, long);
    currentTimeZoneObject.getOffset(lat, long);
    currentTimeZoneObject.convertTime();
  });
});
