function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 2
  });
}

function handleLocationError(isGeolocationSupported, center) {
  if(!isGeolocationSupported) // Geo unsupported
    alert("Geolocation is unsupported in your browser. Please visit this page with a recent browser that supports this feature.");
  else { // Geo rejected
    alert("WhatsWhere requires access to your location to perform location-based lookups. Please reload the page and approve this access.");
    //if(!alert('Alert For your User!')) {window.location.reload();}
  }
}

"use strict";

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
    let map;
    let service;
    let infowindow;
    var initLoc;
    var locations =[];
    function initMap(location) {
      var loc1 = new google.maps.LatLng(43.6532,-79.3832);
      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        center: loc1,
        zoom: 15
        
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          update();
        }, function() {
          handleLocationError(true, map.getCenter());
          
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
        update();
      }
      // google.maps.event.addListener(map, 'bounds_changed', function () {
      //     
      //     if(true)(
      //       update()
      //     )    
      // });

    }
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
          locations[i] = createMarker(results[i]);
          }
          updateCards(results);
      }
    }
    
    function createMarker(place) {
      var photos = place.photos;
      var marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
      (function (marker) {
              google.maps.event.addListener(marker, "click", function (e) {
                  //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                  console.log(place)
                  infowindow.setContent(`<img src="${photos[0].getUrl({maxWidth: 200, maxHeight: 300})}"> <br/> <br/> <h4> ${place.name} </h4> <p> ${place.vicinity} </p`);
                  //Insert HTML 
                  infowindow.open(map, marker);
              });
          })(marker);
      return marker;
      
    }
    //google.maps.event.addDomListener(window, 'load', update);
    function update(){
      const request = {
          location: map.getCenter(),
          radius: '10000',
          type: ['supermarket']
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }
    // function gay(){
    //   for(var i = 0; i<location.length; i++)
    //   {
    //       locations[i].addListener("click", () => {
    //       infowindow.setContent(place.name);
    //       infowindow.open(map);
    //     });
    //   }
    // }
    //google.maps.event.addDomListener(window, 'load', initMap);
    function updateCards(results){
      var html = ""
      for(var i=0;i<results.length;i++){
        var result = results[i];
        var photos = result.photos;
        html += `
        <div class="card shadow ml-3 mr-3 mb-4">
              <div class="d-flex">
                <div class="img-square-wrapper">
                  <img id="storecardimg"
                    src="${photos[0].getUrl()}"
                    style="height: 180px; width: 300px;">
                </div>
                <div class="card-body">
                  <h4 class="card-title" id="storecardname">`+results[i].name+`</h4>
                  <p class="card-text"><i class="fa fa-directions"></i> `+ results[i].vicinity+`</p>
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted promoted-footer">PROMOTED</small>
                <div class="text-right" style="float: right;">
                  <button type="button" class="btn btn-outline-primary btn-sm icon-sq-button"><i
                      class="fa fa-bookmark"></i></button>
                </div>
              </div>
            </div>
        `;
      }
      document.getElementById("cardlist").innerHTML = html;
    }