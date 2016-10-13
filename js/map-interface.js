var OurMap = require('./../js/map.js').ourMapModule;

$(document).ready(function() {
  var currentMapObject = new OurMap();

  $('#map-address').submit(function(event){
    event.preventDefault();
    var lat = parseFloat($('#lat').val());
    var long = parseFloat($('#long').val());
    currentMapObject.initMap(lat, long);
    $('#map').append(map);
  });
});
