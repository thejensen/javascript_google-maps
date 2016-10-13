var weatherApiKey = require('./../.env').weatherApiKey;

Weather = function(){
  sunriseTime = "";
  sunsetTime = "";
};

Weather.prototype.getWeather = function(lat, long) {
  $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + weatherApiKey).then(function(response){
    $('#weather').text("The humidity in " + response.name + " is " + response.main.humidity + "%");
    this.sunriseTime = response.sys.sunrise;
    this.sunsetTime = response.sys.sunset;
  }).fail(function(error) {
    $('#weather').text(error.responseJSON.message);
  });
};


exports.weatherModule = Weather;
