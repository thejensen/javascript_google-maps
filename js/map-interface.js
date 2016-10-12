var OurMap = require('./../js/map.js').ourMapModule;

$(document).ready(function() {
  var currentMapObject = new OurMap();

  $('#map-address').submit(function(event){
    event.preventDefault();
    var lat = $('#lat').val();
    var long = $('#long').val();
    currentMapObject.initMap(lat, long);
    $('#map').append(map);
  });
});
