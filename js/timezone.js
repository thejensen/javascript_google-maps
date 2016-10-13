var Weather = require('./../js/weather.js').weatherModule;

Timezone = function(){
};

Timezone.prototype.getOffset = function(lat, long, sunrise) {
  $.get('https://maps.googleapis.com/maps/api/timezone/json?location='+ lat + ',' + long + '&timestamp=' + sunrise).then(function(response){
    var timeZoned = sunrise + response.rawOffset;
    console.log(timeZoned);
    console.log(sunrise);
    console.log(response.rawOffset);
    $('#sunrise').text("The sun will rise at " + new Date(sunrise));
  });
};


exports.timezoneModule = Timezone;
