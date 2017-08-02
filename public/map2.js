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
  var mymap = L.map('map').setView([52.4052, -4.0486], 13)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGhlbm9scGh0aGFsZWluIiwiYSI6ImNqNXM1anprbjE2MHUzM3M2ZmhjNnR5dWIifQ.AJlqnuS80-PQ1y3VHITFPQ'
  }).addTo(mymap)

  wget(window.location.href + '.json', function (err, data) {
    var markers = []
    for (var i = 0; i < data.length; i++) {
      var curr = data[i]
      if (curr.coords) {
        var marker = L.marker(curr.coords.reverse())
        marker.bindPopup(curr.address + JSON.stringify(curr.coords))
        markers.push(marker)
      } else {
        console.log('Skipping marker ' + curr.id + ' (no coords)')
      }
    }
    var group = new L.featureGroup(markers)
    group.addTo(mymap)

    mymap.fitBounds(group.getBounds())
  })
}
