
OurMap = function() {
};

OurMap.prototype.initMap = function(lat, long) {
  if (lat > 90 || lat < -90 || long > 180 || long < -180) {
    $('#map').text("Please enter a latitude between -90 and 90, or a longitude between -90 and 90. See science for more information about latitudes and longitudes.");
  } else {
    var latLng = new google.maps.LatLng(lat, long);
    var options = {
      zoom : 10,
      center : latLng
    };

    var map = new google.maps.Map(document.getElementById('map'), options);
    console.log(map);

    new google.maps.Marker({
      map: map,
      position: latLng
    });
  }
};

exports.ourMapModule = OurMap;
