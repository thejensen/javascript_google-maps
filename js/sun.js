Sun = function(){
};

Sun.prototype.getSun = function(lat, long) {
  $.get('http://api.sunrise-sunset.org/json?lat='+ lat + '&lng=' + long + '&date=today').then(function(response) {
    $('#sunrise').text("The sun will rise at " + response.results.sunrise + " UTC");
    $('#sunset').text("The sun will set at " + response.results.sunset + " UTC");
  }).fail(function(error) {
    $('#sun').text(error.responseJSON.message);
  });
}

exports.sunModule = Sun;
