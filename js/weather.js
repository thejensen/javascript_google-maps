var weatherApiKey = require('./../.env').weatherApiKey;

Weather = function(){
};

Weather.prototype.getWeather = function(lat, long) {
  $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + weatherApiKey).then(function(response){
    $('#weather').text("The humidity in this location is " + response.main.humidity + "%");
  }).fail(function(error) {
    $('#weather').text(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;
