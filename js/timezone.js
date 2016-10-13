var Weather = require('./../js/weather.js').weatherModule;

Timezone = function(){
  offset = "";
};

Timezone.prototype.getOffset = function(lat, long) {
  $.get('https://maps.googleapis.com/maps/api/timezone/json?location='+ lat + ',' + long + '&timestamp=1476363289').then(function(response){
    $('#timezone').text("Timezone is " + response.rawOffset);
  });
};

Timezone.prototype.convertTime = function() {
  var utcSunrise = Weather.sunriseTime;
  console.log(utcSunrise);
}

exports.timezoneModule = Timezone;
