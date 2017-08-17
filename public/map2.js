function wget (url, cb) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      cb(null, xhr.response)
    } else {
      cb(status)
    }
  }
  xhr.send()
}

window.onload = function () {
  console.log('shwmae ffrindiau')
  var mymap = L.map('map').setView([52.4052, -4.0486], 13) // Aberystwyth
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGhlbm9scGh0aGFsZWluIiwiYSI6ImNqNXM1anprbjE2MHUzM3M2ZmhjNnR5dWIifQ.AJlqnuS80-PQ1y3VHITFPQ'
  }).addTo(mymap)

  var markers = []
  wget(window.location.href + '.json', function (err, data) {
    for (var i = 0; i < data.length; i++) {
      var curr = data[i]
      if (curr.coords) {
        var marker = L.marker(curr.coords.reverse())
        marker.bindPopup(curr.address)
        markers.push(marker)
      } else {
        console.log('Skipping marker ' + curr.id + ' (no coords)')
      }
    }

    // add stations to map
    var group = new L.featureGroup(markers)
    group.addTo(mymap)
    mymap.fitBounds(group.getBounds())

    // add districts to map
    if (window.council) {
      var url = 'https://wheredoivote.co.uk/api/beta/pollingdistricts/geo.json?council_id=' + council
      if (window.station) {
        url += '&district_id=' + station
      }
      wget(url, function (err, district) {
        if (err) throw err
        var districtLayer = L.geoJSON(district)
        districtLayer.addTo(mymap)
        //mymap.fitBounds(districtLayer.getBounds())
      })
    }

    mymap.locate()

    function onLocationFound (e) {
      var radius = e.accuracy / 2

      /* var marker = L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      markers.push(marker)
      var group = new L.featureGroup(markers)
      mymap.fitBounds(group.getBounds()) */
      L.circle(e.latlng, radius).addTo(mymap)
    }

    mymap.on('locationfound', onLocationFound)
  })
}
